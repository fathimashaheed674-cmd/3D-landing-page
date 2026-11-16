import cv2
import numpy as np
import os

def process_frames(video_path, output_dir, target_count=120):
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Total video frames: {total_frames}, target frames: {target_count}")
    
    # Linear sampling of target_count frames
    indices = np.linspace(0, total_frames - 1, target_count, dtype=int)
    
    # We want seamless blending with #050505 (RGB: [5, 5, 5])
    # The video background in the corners is around [8, 8, 8] to [20, 20, 25] with ambient floor
    # We will create an edge vignette / feather mask that gently fades the outermost 5-8% borders to pure #050505
    # Let's inspect the mask dimensions
    ret, test_frame = cap.read()
    h, w = test_frame.shape[:2]
    
    # Create soft elliptical/rectangular border feather mask
    # 1.0 inside center, tapering to 0.0 at outer 40 pixels on borders
    margin_x = int(w * 0.06)
    margin_y = int(h * 0.08)
    
    mask_x = np.ones(w, dtype=np.float32)
    mask_x[:margin_x] = np.linspace(0.0, 1.0, margin_x) ** 1.5
    mask_x[-margin_x:] = np.linspace(1.0, 0.0, margin_x) ** 1.5
    
    mask_y = np.ones(h, dtype=np.float32)
    mask_y[:margin_y] = np.linspace(0.0, 1.0, margin_y) ** 1.5
    mask_y[-margin_y:] = np.linspace(1.0, 0.0, margin_y) ** 1.5
    
    feather = np.outer(mask_y, mask_x)[:, :, np.newaxis]
    target_bg = np.array([5, 5, 5], dtype=np.float32) # #050505 in BGR/RGB
    
    saved_count = 0
    for i, frame_idx in enumerate(indices):
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret:
            print(f"Failed to read frame at index {frame_idx}")
            continue
            
        frame_float = frame.astype(np.float32)
        # Apply smooth edge fade to #050505
        blended = (frame_float * feather + target_bg * (1.0 - feather)).clip(0, 255).astype(np.uint8)
        
        # Save as webp with 92% quality for sharp, high-res 8K-like detail while keeping file sizes small (<35kb/frame)
        out_name = f"frame_{i:03d}.webp"
        out_path = os.path.join(output_dir, out_name)
        cv2.imwrite(out_path, blended, [cv2.IMWRITE_WEBP_QUALITY, 92])
        saved_count += 1
        
    cap.release()
    print(f"Successfully processed and saved {saved_count} frames to {output_dir}")

if __name__ == "__main__":
    process_frames("WhatsApp Video 2026-11-16 at 3.35.55 PM.mp4", "public/sequence", target_count=120)
