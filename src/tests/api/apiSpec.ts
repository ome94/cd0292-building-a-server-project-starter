import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Test api route', () => {
  describe('Test GET /api route', () => {
    it('Expects GET /api to be 400', async () => {
      const response = await request.get('/api');
      expect(response.status).toBe(400);
    });

    it('Expect /api to return suggestive text.', async () => {
      const hint = `please include an image with /api/imgages?filename=<imagename.jpg>`;
      const response = await request.get('/api');
      expect(response.text).toContain(hint);
    });
  });
});
