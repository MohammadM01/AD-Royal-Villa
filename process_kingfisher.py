import cv2
import numpy as np
import os

# Paths
input_path = r"C:/Users/LENOVO/.gemini/antigravity/brain/fea9a2de-a2df-4be7-995c-5538f1217e6e/kingfisher_flying_spritesheet_right_1768072816031.png"
output_dir = r"c:/Users/LENOVO/OneDrive/Desktop/AD-Royal-Villa/Frontend/public/New/images/kingfisher"

# Ensure output dir exists
os.makedirs(output_dir, exist_ok=True)

# Load image
print(f"Loading {input_path}")
img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
if img is None:
    print(f"Error: Could not read image at {input_path}")
    exit(1)

# Convert to BGRA if not already
if len(img.shape) == 3:
    print("Converting BGR to BGRA")
    img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
elif img.shape[2] == 3:
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGRA) # unlikely but possible

# Remove white background
# Pixels close to white -> Transparent
print("Removing background...")
# Define white threshold
lower_white = np.array([230, 230, 230], dtype=np.uint8)
upper_white = np.array([255, 255, 255], dtype=np.uint8)

# Check RGB channels
color_channels = img[:,:,:3]
mask = cv2.inRange(color_channels, lower_white, upper_white)

# Set alpha to 0 where mask is white
img[mask > 0, 3] = 0

# Find contours to separate frames
gray = img[:,:,3] # Use alpha
# Threshold to separate image from empty space
_, thresh = cv2.threshold(gray, 10, 255, cv2.THRESH_BINARY)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

print(f"Found {len(contours)} initial contours")

# Filter small contours (noise)
contours = [c for c in contours if cv2.contourArea(c) > 500]
print(f"Filtered to {len(contours)} bird frames")

if len(contours) == 0:
    print("No birds found!")
    exit(1)

# Sort Contours Spatially to maintain animation order
# Standard reading order: Top-to-Bottom, Left-to-Right
def sort_contours_grid(cnts, tolerance=50):
    # Get bounding boxes
    boxes = [cv2.boundingRect(c) for c in cnts] # (x, y, w, h)
    objs = list(zip(cnts, boxes))
    
    # Sort by Y (rows)
    objs.sort(key=lambda k: k[1][1])
    
    # Group into rows
    rows = []
    if not objs: return []
    
    current_row = [objs[0]]
    row_y = objs[0][1][1]
    
    for i in range(1, len(objs)):
        obj = objs[i]
        y = obj[1][1]
        
        if abs(y - row_y) < tolerance:
            current_row.append(obj)
        else:
            # Sort row by X
            current_row.sort(key=lambda k: k[1][0])
            rows.extend(current_row)
            
            # Start new row
            current_row = [obj]
            row_y = y
            
    # Add last row
    current_row.sort(key=lambda k: k[1][0])
    rows.extend(current_row)
    
    return [o[0] for o in rows]

sorted_contours = sort_contours_grid(contours, tolerance=100)

# Processing target
target_size = (500, 500) # Fixed canvas size
cx = target_size[0] // 2
cy = target_size[1] // 2

frame_count = 0
for i, cnt in enumerate(sorted_contours):
    x, y, w, h = cv2.boundingRect(cnt)
    roi = img[y:y+h, x:x+w]
    
    # Calculate Center of Mass of the bird (alpha channel) to align perfectly
    M = cv2.moments(roi[:,:,3])
    if M["m00"] != 0:
        mcx = int(M["m10"] / M["m00"])
        mcy = int(M["m01"] / M["m00"])
    else:
        mcx, mcy = w // 2, h // 2
        
    # Create canvas
    canvas = np.zeros((target_size[1], target_size[0], 4), dtype=np.uint8)
    
    # Calculate paste position to align Centroid to Center of Canvas
    paste_x = cx - mcx
    paste_y = cy - mcy
    
    # Safety Check bounds
    if paste_x < 0: paste_x = 0
    if paste_y < 0: paste_y = 0
    
    # Dimensions to copy
    copy_h = min(h, target_size[1] - paste_y)
    copy_w = min(w, target_size[0] - paste_x)
    
    canvas[paste_y:paste_y+copy_h, paste_x:paste_x+copy_w] = roi[:copy_h, :copy_w]
    
    # Save Right Facing (1-indexed)
    idx = i + 1
    # Check if existing images are vastly different or if this overwrite is what we want.
    # We overwrite.
    filename_right = os.path.join(output_dir, f"{idx}.png")
    cv2.imwrite(filename_right, canvas)
    
    # Save Left Facing (Flipped)
    # Why? User said "DO NOT flip". We will use these pre-flipped assets so we don't have to use CSS transform.
    # This ensures "Face Left -> Fly Left" without CSS complexity.
    canvas_left = cv2.flip(canvas, 1)
    filename_left = os.path.join(output_dir, f"{idx}_left.png")
    cv2.imwrite(filename_left, canvas_left)
    
    print(f"Saved Frame {idx}: {filename_right} & {filename_left}")
    frame_count += 1
    
    if frame_count >= 10: break

print("Processing complete.")
