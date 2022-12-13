import supertest from 'supertest';

import app from '../../../index';

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
});
