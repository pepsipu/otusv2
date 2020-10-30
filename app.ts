import express from 'express';
import chalk from 'chalk';
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

const app: express.Application = express();
const port: number = +(process.env.PORT || 3000);
const { MONGO_URI, SESSION_SECRET } = process.env;

app.use(cors({
  origin,
}));
app.use(helmet());
app.use(express.json());

mongoose.connect(MONGO_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}, (err) => {
  if (err) {
    logger.error(`Mongoose error while connecting to MongoDB: ${err}`);
    throw err;
  }
  app.use(session({
    secret: SESSION_SECRET || '',
    resave: false,
    saveUninitialized: true,
    store: new (MongoStore(session))({
      mongooseConnection: mongoose.connection,
    }),
  }));
  app.use(expressLogger);
  app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', '');
    return next();
  });
  app.use(express.static(path.join(__dirname, 'client')));
  app.use('', router);
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
  });
  app.listen(port, () => {
    logger.info(`Express server has started listening on port ${chalk.red(port)}.`);
  });
});
