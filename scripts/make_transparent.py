from PIL import Image
import os

image_path = "/home/aman/.gemini/antigravity-ide/brain/57ff1b8b-4e15-4f94-a4db-028dbb88850a/signal_loop_logo_1781971755501.png"
output_path = "/home/aman/PROJECTS/Portfolio_web/public/assets/logo.png"

if not os.path.exists(image_path):
    print(f"Error: source image not found at {image_path}")
    exit(1)

img = Image.open(image_path).convert("RGBA")
datas = img.getdata()

newData = []
for item in datas:
    r, g, b, a = item
    brightness = max(r, g, b)
    if brightness < 18:
        # Make very dark background pixels completely transparent
        newData.append((0, 0, 0, 0))
    else:
        # Map alpha based on brightness to smoothly blend the glow
        alpha = min(255, int(brightness * 1.8))
        newData.append((r, g, b, alpha))

img.putdata(newData)

os.makedirs(os.path.dirname(output_path), exist_ok=True)
img.save(output_path, "PNG")
print("Successfully generated transparent PNG at:", output_path)
