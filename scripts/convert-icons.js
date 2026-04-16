const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgs = [
  'imgs/logo.svg',
];

const outDir = path.join(__dirname, '..', 'imgs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  try {
    const svgPath = path.join(__dirname, '..', 'imgs', 'logo.svg');
    if (!fs.existsSync(svgPath)) {
      console.error('logo.svg not found in imgs/. Place the SVG at imgs/logo.svg');
      process.exit(1);
    }

    // generate 192x192 and 512x512 PNG and WebP from logo.svg
    await sharp(svgPath)
      .resize(192, 192, { fit: 'contain', background: { r: 5, g: 8, b: 20, alpha: 0 } })
      .png({ quality: 90 })
      .toFile(path.join(outDir, 'icon-192.png'));

    await sharp(svgPath)
      .resize(512, 512, { fit: 'contain', background: { r: 5, g: 8, b: 20, alpha: 0 } })
      .png({ quality: 92 })
      .toFile(path.join(outDir, 'icon-512.png'));

    await sharp(svgPath)
      .resize(192, 192, { fit: 'contain', background: { r: 5, g: 8, b: 20, alpha: 0 } })
      .webp({ quality: 88 })
      .toFile(path.join(outDir, 'icon-192.webp'));

    await sharp(svgPath)
      .resize(512, 512, { fit: 'contain', background: { r: 5, g: 8, b: 20, alpha: 0 } })
      .webp({ quality: 88 })
      .toFile(path.join(outDir, 'icon-512.webp'));

    console.log('Icons generated in imgs/: icon-192.png, icon-512.png, icon-192.webp, icon-512.webp');
  } catch (err) {
    console.error('Error generating icons:', err);
    process.exit(1);
  }
})();
