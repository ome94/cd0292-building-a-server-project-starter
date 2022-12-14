import { Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const checkParams = async (
  req: Request,
  res: Response,
  next: (req?: Request, res?: Response) => void
): Promise<void> => {
  const usrImg = req.query.filename;
  const imgDir = path.resolve('./assets/images/full');
  try {
    const imageNames = await fs.readdir(imgDir);

    // Check filename if supplied is valid/available
    if (!(req.query && usrImg && imageNames.includes(<string>usrImg))) {
      if (!usrImg) {
        res
          .status(400)
          .send('Please include a valid image file name to resize');
      } else {
        res.status(404).send('Image not found');
      }
    } else if (imageNames.includes(<string>usrImg)) {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export { checkParams };
