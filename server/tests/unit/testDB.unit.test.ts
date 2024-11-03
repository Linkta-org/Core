import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import { db } from '@/tests/integration/setup/testDB';

// Tests to verify the connection and disconnection of the in-memory MongoDB server
describe('In-Memory MongoDB Server Connection', () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it('should connect to the in-memory MongoDB server', () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 means connected
  });

  it('should disconnect from the in-memory MongoDB server', async () => {
    await db.disconnect();
    expect(mongoose.connection.readyState).toBe(0); // 0 means disconnected
  });
});
