import supertest from 'supertest';
import { promises as fs } from 'fs';

import app from '../../../index';
import { thumbsDir } from '../../../api/utilities/resize';

const request = supertest(app);

describe('Test /api/images route', () => {
  describe('Test valid requests', () => {
    const filename = 'fjord.jpg';

    it(`Expects GET /api/images?filename=${filename} to be 200`, async () => {
      const response = await request.get(`/api/images?filename=${filename}`);
      expect(response.status).toBe(200);
    });

    it(`Expects GET /api/images?filename=${filename} image response`, async () => {
      const response = await request.get(`/api/images?filename=${filename}`);
      expect(response.type).toEqual('image/jpeg');
    });
  });

  describe('Test invalid requests', () => {
    it('Expects GET /api/images to be 400', async () => {
      const response = await request.get('/api/images');
      expect(response.status).toBe(400);
    });

    it(`Expects GET /api/images?filename=invalid.jpg to be 404`, async () => {
      const response = await request.get(
        '/api/images?filename=invalid.jpg&width=400&height=200'
      );

      expect(response.status).toBe(404);
    });
  });

  describe('Tests for Caching', () => {
    let cacheSize: number;
    const CACHE_LIMIT = 30;
    const filename = 'fjord.jpg';
    
    beforeAll(async () => {
      const maxRequest = 40
      for(let i = 0, width = 100; i <= maxRequest; i++){
        if (i < maxRequest/2){
          await request.get(`/api/images?filename=${filename}&width=${width}`);
          width += 50;
        }else{
          await request.get(`/api/images?filename=${filename}&height=${width}`);
          width -= 50;
        }
      }
      
      cacheSize = (await fs.readdir(thumbsDir)).length;
    })

    it('Expects cache size to be less than or equal to CACHE_LIMIT', () => {
      expect(cacheSize).toBeLessThanOrEqual(CACHE_LIMIT)
    });
  });
});
