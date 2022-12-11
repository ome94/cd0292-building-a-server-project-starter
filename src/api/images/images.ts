import express from 'express';
import path from 'path';
import { checkParams } from '../utilities/parameters';

const images = express.Router();

images.get('/', checkParams, (req: express.Request, res: express.Response) => {
  res.sendFile(
    path.join(__dirname, `../../../assets/images/full/${req.query.filename}`)
  );
});

export default images;
