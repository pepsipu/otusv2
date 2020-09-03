import express from 'express';
import chalk from 'chalk';
import mongoose from 'mongoose';

import './config/env';
import { expressLogger, logger } from './config/winston';
import router from './routes/router';

const app: express.Application = express();
const port: number = +(process.env.PORT || 3000);
const { MONGO_URI } = process.env;

app.use(express.json());
app.use('/api', router);
app.use(expressLogger);

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
  app.listen(port, () => {
    logger.info(`Express server has started listening on port ${chalk.red(port)}.`);
  });
});
