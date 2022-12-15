import { Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const checkParams = async (
  req: Request,
  res: Response,
  next: (req?: Request, res?: Response) => void
): Promise<void> => {
  const filename = <string | undefined>req.query.filename;
  const { width, height } = req.query;
  const parsedWidth = parseInt(<string>width) || undefined;
  const parsedHeight = parseInt(<string>height) || undefined;
  const imgDir = path.resolve('./assets/images/full');
  try {
    const imageNames = await fs.readdir(imgDir);
    const imgPresent = imageNames.includes(<string>filename);

    // Check filename if supplied is valid/available
    if (!(filename && imgPresent)) {
      if (!filename) {
        res
          .status(400)
          .send('Please include a valid image file name to resize');
      } else {
        res.status(404).send(`Image(${filename}) not found`);
      }
    } else if (
      !(parsedWidth && parsedWidth > 0) ||
      !(parsedHeight && parsedHeight > 0)
    ) {
      res
        .status(400)
        .send(
          `Invalid aspect ratio: (${width})x(${height}). Please use a number greater than 0 for width and height.`
        );
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export { checkParams };
