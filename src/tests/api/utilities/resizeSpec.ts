import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';

import resize from '../../../api/utilities/resize';

describe('Test function resize()', () => {
  const fullImgDir = path.join(__dirname, '../../../../assets/images/full');
  let filename: string;
  let image: sharp.Sharp;
  let resizedImg: sharp.Sharp;
  let originalWidth: number | undefined;
  let resizedWidth: number | undefined;
  let originalHeight: number | undefined;
  let resizedHeight: number | undefined;

  
  // user supplied width and height
  const width: number | undefined = 300; 
  const height: number | undefined = 150;

  beforeAll (async () => {
    filename = (await fs.readdir(fullImgDir))[0];
    image = sharp(path.join(fullImgDir, filename));
    originalWidth = (await image.metadata()).width;
    originalHeight = (await image.metadata()).height;
  });

  describe('Test for undefined aspect ratios', () => {
    beforeAll(async () => {
      resizedImg = sharp(await resize(filename));
      resizedWidth = (await resizedImg.metadata()).width;
      resizedHeight = (await resizedImg.metadata()).height;
    });
    
    it('Expects resized image width to equal original image width', async () => {
      expect(resizedWidth).toEqual(originalWidth);
    });

    it('Expects resized image height to equal original image height', async () => {
      expect(resizedHeight).toEqual(originalHeight);
    });
  });

  describe(`Test resize('valid-file.jpg', ${width}, ${height})`,  () => {
    beforeAll(async () => {
      resizedImg = sharp(await resize(filename, width, height));
      resizedWidth = (await resizedImg.metadata()).width;
      resizedHeight = (await resizedImg.metadata()).height;
    });
    
    it(`Expects height to equal ${width}`, async () => {
      expect(resizedHeight).toEqual(height);
    });

    it(`Expects width to equal ${height}`, async () => {
      expect(resizedWidth).toEqual(width);
    });
  });
});
