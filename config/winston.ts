import winston from 'winston';
import chalk from 'chalk';
import { TransformableInfo } from 'logform';
import { Request, Response } from 'express';

const formatInfo = (info: TransformableInfo) => `[${info.level}: ${chalk.yellow(info.timestamp)}] ${info.message}`;
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  request: 3,
  verbose: 4,
  debug: 5,
};

winston.addColors({
  request: 'cyan',
});

export const logger: winston.Logger = winston.createLogger({
  levels,
  level: 'request',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(formatInfo),
  ),
  transports: [
    new winston.transports.File({
      format: winston.format.uncolorize(),
      filename: 'logs/log.log',
    }),
  ],
});

if (process.env.NODE_ENV === 'debug') {
  logger.add(new winston.transports.Console());
}

export function expressLogger(req: Request, res: Response, next: any): void {
  logger.log({
    message: `${chalk.blue(req.method)} ${chalk.green(req.url)} from ${chalk.magenta(req.connection.remoteAddress)}:${chalk.red(req.connection.remotePort)}`,
    level: 'request',
  });
  next();
}
