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
);
