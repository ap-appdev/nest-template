import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  validateSync,
  ValidationError,
  IsOptional,
  IsString,
} from 'class-validator';
import { Environment } from '../../common/enums/environment';

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsString()
  @IsOptional()
  LOG_MAX_SIZE_FILE: string;

  @IsNumber()
  PORT: number;

  @IsString()
  @IsOptional()
  UTC_OFFSET: string;
}

export function validate(config: Record<string, any>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors: ValidationError[] = validateSync(validatedConfig, {});

  if (errors.length > 0) {
    const message =
      'Произошла ошибка при инициализации environment переменных сервиса\n' +
      ' - Проверьте файл .env в корне проекта или docker-compose.yaml если используете docker\n\n' +
      `${errors.toString()}`;
    throw new Error(message);
  }
  return validatedConfig;
}
