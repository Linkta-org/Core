import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

export const db = {
  // Connect to test database
  connect: async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  },

  // Disconnect and cleanup
  disconnect: async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  },

  // Clear all test data
  clear: async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  },
};
