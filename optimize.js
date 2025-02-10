import { glob } from 'fast-glob';
import sharp from 'sharp';

await Promise.all(
  // product list images
  (
    await glob('./public/images/products/**/*.jpg')
  ).map(async (path) => {
    await sharp(path)
      .resize({
        fit: 'cover',
        height: 126,
        width: 224,
      })
      .webp({ quality: 75 })
      .toFile(path.replace('.jpg', '-224x126.webp'));
  }),
  // product hero images
  (
    await glob('./public/images/products/**/*.jpg')
  ).map(async (path) => {
    await sharp(path)
      .resize({
        fit: 'cover',
        height: 576,
        width: 1024,
      })
      .webp({ quality: 75 })
      .toFile(path.replace('.jpg', '-1024x576.webp'));
  }),
);
