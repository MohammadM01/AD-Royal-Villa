import cv2
import numpy as np
import os

# Paths
input_path = r"C:/Users/LENOVO/.gemini/antigravity/brain/fea9a2de-a2df-4be7-995c-5538f1217e6e/kingfisher_sitting_consistent_1768073408169.png"
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

# Remove white background
print("Removing background...")
lower_white = np.array([230, 230, 230], dtype=np.uint8)
upper_white = np.array([255, 255, 255], dtype=np.uint8)
color_channels = img[:,:,:3]
mask = cv2.inRange(color_channels, lower_white, upper_white)
img[mask > 0, 3] = 0

# Find contours for the bird
gray = img[:,:,3]
_, thresh = cv2.threshold(gray, 10, 255, cv2.THRESH_BINARY)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

if not contours:
    print("No bird found!")
    exit(1)

# Pick the largest contour
cnt = max(contours, key=cv2.contourArea)
x, y, w, h = cv2.boundingRect(cnt)
roi = img[y:y+h, x:x+w]

# --- RESIZE LOGIC ---
# User says the sitting bird is "short" / "small" compared to the flying one.
# We will scale it UP by specific factor to match the visual body size.
SCALE_FACTOR = 1.4 # Increased size by 40%
new_w = int(w * SCALE_FACTOR)
new_h = int(h * SCALE_FACTOR)
roi = cv2.resize(roi, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)

# Update dims
h, w = roi.shape[:2]

# Processing target - align to same center as flying
target_size = (500, 500) 
cx = target_size[0] // 2
cy = target_size[1] // 2

# Calculate Center of Mass of resized bird
M = cv2.moments(roi[:,:,3])
if M["m00"] != 0:
    mcx = int(M["m10"] / M["m00"])
    mcy = int(M["m01"] / M["m00"])
else:
    mcx, mcy = w // 2, h // 2

# Create canvas
canvas = np.zeros((target_size[1], target_size[0], 4), dtype=np.uint8)

# Center align
paste_x = cx - mcx
paste_y = cy - mcy

if paste_x < 0: paste_x = 0
if paste_y < 0: paste_y = 0

copy_h = min(h, target_size[1] - paste_y)
copy_w = min(w, target_size[0] - paste_x)

canvas[paste_y:paste_y+copy_h, paste_x:paste_x+copy_w] = roi[:copy_h, :copy_w]

# Save Sitting Right
filename_right = os.path.join(output_dir, "sitting.png")
cv2.imwrite(filename_right, canvas)

# Save Sitting Left
canvas_left = cv2.flip(canvas, 1)
filename_left = os.path.join(output_dir, "sitting_left.png")
cv2.imwrite(filename_left, canvas_left)

print(f"Saved larger {filename_right} and {filename_left}")
