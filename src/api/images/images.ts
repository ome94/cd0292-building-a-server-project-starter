import express from 'express';

import { checkParams } from '../utilities/parameters';
import { fetchImgPath, cleanCache } from '../utilities/cache';

const images = express.Router();

images.get('/', checkParams, async (req, res) => {
  try {
    const imgPath = await fetchImgPath(req);
    res.sendFile((<unknown>imgPath) as string);
    await cleanCache();
  } catch (err) {
    res.send('Resize failed');
  }
});

export default images;
