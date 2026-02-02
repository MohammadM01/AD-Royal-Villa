from PIL import Image, ImageDraw, ImageFont
import os

# Create output directory if it doesn't exist
output_dir = r"Z:\Project 4\AD-Royal-Villa\Frontend\public"
os.makedirs(output_dir, exist_ok=True)

# Brand colors
bg_color = (71, 49, 45)  # #47312D
gold_color = (212, 175, 55)  # #D4AF37

def create_favicon(size, filename):
    """Create a favicon with AD initials"""
    # Create image with gradient-like background
    img = Image.new('RGB', (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Add rounded corners effect by drawing a slightly lighter border
    border_color = (107, 78, 71)  # Lighter brown
    
    # Draw text "AD"
    try:
        # Try to use a nice font, fallback to default if not available
        font_size = int(size * 0.5)
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()
    
    text = "AD"
    
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center the text
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - int(size * 0.05)  # Slight adjustment
    
    # Draw text
    draw.text((x, y), text, fill=gold_color, font=font)
    
    # Save
    filepath = os.path.join(output_dir, filename)
    img.save(filepath, 'PNG')
    print(f"Created: {filename}")

# Create all required sizes
create_favicon(16, "favicon-16x16.png")
create_favicon(32, "favicon-32x32.png")
create_favicon(180, "apple-touch-icon.png")
create_favicon(192, "android-chrome-192x192.png")
create_favicon(512, "android-chrome-512x512.png")

# Create ICO file (multi-size)
try:
    img16 = Image.open(os.path.join(output_dir, "favicon-16x16.png"))
    img32 = Image.open(os.path.join(output_dir, "favicon-32x32.png"))
    img16.save(
        os.path.join(output_dir, "favicon.ico"),
        format='ICO',
        sizes=[(16, 16), (32, 32)]
    )
    print("Created: favicon.ico")
except Exception as e:
    print(f"Note: Could not create .ico file: {e}")

print("\nAll favicon files created successfully!")
