import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '@/server';

describe('Server Integration', () => {
  it('should return a 200 status code and a hello message on root route', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Hello from the Server!');
  });
});
