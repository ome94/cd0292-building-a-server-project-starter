import supertest from 'supertest';

import app from '../index';

describe('Server Tests.', () => {
  const request = supertest(app);

  describe('Tests for index GET / route', () => {
    it('Expects GET / to be 200 OK ', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });

    it('Expects GET / to have a "Hello!" body', async () => {
      const response = await request.get('/');
      expect(response.text).toEqual('Hello!');
    });
  });

  describe('Tests for error endpoints', () => {
    it('Expects /error-url to be 404', async () => {
      const response = await request.get('/error-url');
      expect(response.status).toBe(404);
    });
  });
});
