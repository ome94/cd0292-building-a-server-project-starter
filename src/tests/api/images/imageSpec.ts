import supertest from 'supertest';
import { promises as fs } from 'fs';

import app from '../../../index';
import { thumbsDir } from '../../../api/utilities/resize';

const request = supertest(app);

describe('Test /api/images route', () => {
  const filename = 'fjord.jpg';
  describe('Test valid requests', () => {
    const width = 500;
    const height = 350;
    const url = `/api/images?filename=${filename}&width=${width}&height=${height}`;
    it(`Expects GET ${url} to be 200`, async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
    });

    it(`Expects GET ${url} image/jpeg response`, async () => {
      const response = await request.get(url);
      expect(response.type).toBe('image/jpeg');
    });
  });

  describe('Test invalid requests', () => {
    it('Expects GET /api/images to be 400', async () => {
      const response = await request.get('/api/images');
      expect(response.status).toBe(400);
    });

    it(`Expects GET /api/images?filename=${filename} to be 200`, async () => {
      const response = await request.get(`/api/images?filename=${filename}`);
      expect(response.status).toBe(400);
    });

    it(`Expects GET /api/images?filename=${filename} image response`, async () => {
      const hint = 'Please use a number greater than 0 for width and height.';
      const response = await request.get(`/api/images?filename=${filename}`);
      expect(response.text).toContain(hint);
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

    beforeAll(async () => {
      const maxRequest = 40;
      for (let i = 0, width = 100, height = 1200; i <= maxRequest; i++) {
        await request.get(
          `/api/images?filename=${filename}&width=${width}&height=${height}`
        );
        if (i < maxRequest / 2) {
          width += 50;
          height -= 50;
        } else {
          width -= 50;
          height += 50;
        }
      }

      cacheSize = (await fs.readdir(thumbsDir)).length;
    });

    it(`Expects cache size to be less than or equal to CACHE_LIMIT(${CACHE_LIMIT})`, () => {
      expect(cacheSize).toBeLessThanOrEqual(CACHE_LIMIT);
    });
  });
});
