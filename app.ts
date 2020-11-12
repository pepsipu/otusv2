import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { origin } from './config/config.json';

import './config/env';
import { expressLogger, logger } from './config/winston';
import router from './routes/router';

export default async (): Promise<express.Application> => {
  const { MONGO_URI, SESSION_SECRET } = process.env;
  const app: express.Application = express();
  app.use(cors({
    origin,
  }));
  app.use(helmet());
  app.use(express.json());

  await mongoose.connect(MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }).catch((err) => {
    logger.error(`Mongoose error while connecting to MongoDB: ${err}`);
    process.abort();
  });
  app.use(session({
    secret: SESSION_SECRET || '',
    resave: false,
    saveUninitialized: true,
    store: new (MongoStore(session))({
      mongooseConnection: mongoose.connection,
    }),
  }));
  app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', '');
    return next();
  });
  app.use(expressLogger);
  app.use(express.static(path.join(__dirname, 'client')));
  app.use('/api', router);
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
  });
  return app;
};
