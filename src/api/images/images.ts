import express from 'express';

import { checkParams } from '../utilities/parameters';
import resize from '../utilities/resize';

const images = express.Router();

images.get('/', checkParams, async (req, res) => {
  const filename = req.query.filename;
  const width = parseInt((<unknown>req.query.width) as string) || undefined;
  const height = parseInt((<unknown>req.query.height) as string) || undefined;
  try {
    const newImagePath = await resize(<string>filename, width, height);
    res.sendFile(newImagePath);
  } catch (err) {
    console.log(err);
    res.send('Resize failed');
  }
});

export default images;
