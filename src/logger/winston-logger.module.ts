import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transports: [
          new winston.transports.DailyRotateFile({
            filename: `${configService.get<string>('npm_package_name')}-%DATE%`,
            extension: '.log',
            dirname: 'logs',
            maxFiles: '15d',
            maxSize: configService.get<string>('LOG_MAX_SIZE_FILE', '100m'),
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} ${level}: ${JSON.stringify(message)}`;
              }),
            ),
          }),
        ],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class WinstonLoggerModule {}
