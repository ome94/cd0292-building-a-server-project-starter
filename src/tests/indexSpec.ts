import { response } from 'express';
import supertest from 'supertest';

import app from '../index';


describe('Server Tests.', () => {
  const request = supertest(app);

  it('Expects GET / to be 200 OK ', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('Expects /error-url to be 404', async () => {
    const response = await request.get('/error-url');
    expect(response.status).toBe(404);
  });
});