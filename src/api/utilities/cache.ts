import { Request } from 'express';
import { promises as fs } from 'fs';

import { thumbsDir, resize } from './resize';

const CACHE_LIMIT = 30;
const imgMap = new Map();

const fetchImgPath = async (req: Request): Promise<string | undefined> => {
  const filename = req.query.filename;
  const width = parseInt((<unknown>req.query.width) as string) || undefined;
  const height = parseInt((<unknown>req.query.height) as string) || undefined;
  try {
    const imgPath =
      imgMap.get(req.url) || (await resize(<string>filename, width, height));

    if (!imgMap.has(req.url)) imgMap.set(req.url, imgPath);

    return imgPath;
  } catch (err) {
    console.log(err);
  }
};

const cleanCache = async (): Promise<void> => {
  let cacheSize: number = (await fs.readdir(thumbsDir)).length;

  for (const [imgUrl, imgPath] of imgMap) {
    if (cacheSize <= CACHE_LIMIT) break;

    await fs.unlink(imgPath);
    imgMap.delete(imgUrl);
    cacheSize = (await fs.readdir(thumbsDir)).length;
  }
};

export { fetchImgPath, cleanCache };
