from PIL import Image
import numpy as np
import os

source_path = r"C:\Users\LENOVO\OneDrive\Desktop\AD-Royal-Villa\Frontend\public\New\images\kingfisher_spritesheet.png"
output_dir = r"C:\Users\LENOVO\OneDrive\Desktop\AD-Royal-Villa\Frontend\public\New\images\kingfisher"

# Ensure output dir exists
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

img = Image.open(source_path).convert("RGBA")
data = np.array(img)

# 1. Turn White to Transparent
# Simple threshold: if R,G,B > 240 -> Transparent
r, g, b, a = data.T
white_areas = (r > 230) & (g > 230) & (b > 230)
data[..., 3][white_areas.T] = 0
img_clean = Image.fromarray(data)

# 2. Slice the image into 7 roughly equal parts
# The prompt asked for 7 distinct frames in a horizontal row.
w, h = img_clean.size
frame_count = 7
frame_width = w // frame_count

print(f"Image Size: {w}x{h}, Frame Count: {frame_count}, Frame Width: {frame_width}")

for i in range(frame_count):
    left = i * frame_width
    right = (i + 1) * frame_width
    
    # Crop the strip
    frame = img_clean.crop((left, 0, right, h))
    
    # 3. Auto-Trim (Find bounding box of non-transparent pixels)
    bbox = frame.getbbox()
    if bbox:
        frame_trimmed = frame.crop(bbox)
        
        # 4. Center in a square canvas for easy animation alignment
        # Make a 500x500 canvas
        canvas_size = 500
        new_im = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
        
        # Paste centered
        trim_w, trim_h = frame_trimmed.size
        offset_x = (canvas_size - trim_w) // 2
        offset_y = (canvas_size - trim_h) // 2
        new_im.paste(frame_trimmed, (offset_x, offset_y))
        
        # Save as 1.png, 2.png, etc.
        save_path = os.path.join(output_dir, f"{i + 1}.png")
        new_im.save(save_path)
        print(f"Saved frame {i+1} to {save_path}")
    else:
        print(f"Frame {i+1} was empty, skipping.")

print("Done processing sprites.")
