import { Request, Response, Router } from 'express';

import { checkParams } from '../utilities/parameters';
import { fetchImgPath, cleanCache } from '../utilities/cache';

const images = Router();

images.get(
  '/',
  checkParams,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const imgPath = await fetchImgPath(req);
      res.sendFile((<unknown>imgPath) as string);
      await cleanCache();
    } catch (err) {
      console.log(err);
      res.send('Resize failed');
    }
  }
);

export default images;
