import chalk from 'chalk';
import './config/env';
import { logger } from './config/winston';
import makeApp from './app';

const port: number = +(process.env.PORT || 3000);
const { MONGO_URI, SESSION_SECRET } = process.env;

const run = async () => {
  const app = await makeApp(MONGO_URI as string, SESSION_SECRET as string);
  await app.listen(port);
  logger.info(`Express server has started listening on port ${chalk.red(port)}.`);
};

run().then(() => {});
