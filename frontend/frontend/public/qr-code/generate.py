import qrcode
from PIL import Image
from datetime import datetime
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import *

img = qr.make_image(
    image_factory=StyledPilImage,
    module_drawer=GappedSquareModuleDrawer()
)

data = "https://app.formbricks.com/s/cmovsnq53aggvws01xeuf1v9c"

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
file_name = "qrcode.png"
# file_name = f"qrcode_{timestamp}.png"

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=6,
    border=2
)

qr.add_data(data)
qr.make(fit=True)

img = qr.make_image(
    fill_color="black",
    back_color="white",
    image_factory=StyledPilImage,
    # module_drawer=RoundedModuleDrawer()
    module_drawer=GappedSquareModuleDrawer()
).convert("RGB")

# abre logo
logo = Image.open("logo_roig.jpg")

# redimensiona
qr_width, qr_height = img.size
logo_size = qr_width // 5

logo = logo.resize((logo_size, logo_size))

# posição central
pos = (
    (qr_width - logo_size) // 2,
    (qr_height - logo_size) // 2
)

# cola a logo
draw.ellipse
img.paste(logo, pos)

img.save(file_name)

print(f"QR Code gerado: {file_name}")