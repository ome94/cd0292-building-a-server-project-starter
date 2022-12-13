import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const fullImgDir = path.join(__dirname, '../../../assets/images/full');
const thumbsDir = path.join(__dirname, '../../../assets/images/thumbs');

const resize = async (
  filename: string,
  width?: number | undefined,
  height?: number | undefined
): Promise<string> => {
  const image = sharp(path.join(fullImgDir, filename));
  // use image original aspect ratio if no aspect ratio is supplied from user
  // only if both dimensions(width and height) are not supplied
  // other wise preserve the aspect ratio if at least one of the dimensions are supplied
  if(!(width || height)){
    width = (await image.metadata()).width;
    height = (await image.metadata()).height;
  }

  fs.exists(thumbsDir, (exists) => {
    if (!exists) fs.promises.mkdir(thumbsDir);
  });

  let tmpName = `${thumbsDir}/tmp.jpg`;
  const newImage = await image.resize(width, height).toFile(tmpName);
  width = width || newImage.width;
  height = height || newImage.height;
  const [newImageName, ext] = filename.split('.');
  const newPath = `${thumbsDir}/${newImageName}${width}x${height}.${ext}`;
  await fs.promises.rename(tmpName, newPath);

  return newPath;
};

export default resize;
