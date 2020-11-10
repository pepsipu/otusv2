import chalk from 'chalk';
import { logger } from './config/winston';
import makeApp from './app';

const port: number = +(process.env.PORT || 3000);

const run = async () => {
  const app = await makeApp();
  await app.listen(port);
  logger.info(`Express server has started listening on port ${chalk.red(port)}.`);
};

run().then(() => {});
