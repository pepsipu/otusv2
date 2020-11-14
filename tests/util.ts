import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import { v4 as uuid } from 'uuid';
import makeApp from '../app';

const testApp = (): [() => Promise<void>, () => Promise<void>, () => express.Application] => {
  let mongoServer: MongoMemoryServer;
  // app will never be in use before a beforeAll call
  let app = undefined as unknown as express.Application;
  return [
    async () => {
      mongoServer = new MongoMemoryServer();
      app = await makeApp(await mongoServer.getUri(), uuid());
    },
    async () => {
      await mongoose.disconnect();
      await mongoServer.stop();
    },
    () => app,
  ];
};

const genUser = () => ({
  username: uuid(),
  email: `${uuid()}@otus.net`,
  password: uuid(),
});

// eslint-disable-next-line import/prefer-default-export
export { genUser, testApp };
