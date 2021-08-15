import { LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export function getWinstonLogger(): LoggerService {
  const { npm_package_name } = process.env;

  return WinstonModule.createLogger({
    transports: [
      new winston.transports.DailyRotateFile({
        filename: `${npm_package_name}-%DATE%`,
        extension: '.log',
        dirname: 'logs',
        maxFiles: '15d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${JSON.stringify(message)}`;
          }),
        ),
      }),
    ],
  });
}
