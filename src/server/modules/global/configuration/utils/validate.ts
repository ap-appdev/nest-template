import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  validateSync,
  ValidationError,
  IsOptional,
  IsString,
} from 'class-validator';
import { NODE_ENV } from '../../../../../common/consts/configuration';
import { russifyValidationErrors } from '../../../../common/utils/errors/validationError';

class ConfigurationtVariables {
  @IsEnum(NODE_ENV, {
    message: `свойство должно иметь одно из перечисленных значений: [${Object.values(
      NODE_ENV,
    )}]`,
  })
  @IsOptional()
  NODE_ENV?: NODE_ENV;

  @IsNumber()
  PORT: number;

  @IsString()
  @IsOptional()
  UTC_OFFSET: string;
}

export function validate(config: Record<string, any>): void {
  const whereConfig =
    'Проверьте файл configuration.yml в корне проекта если вы разработчик, или docker-compose.yaml если сервис развёрнут через docker.';

  if (!config) {
    throw new Error(`Приложение не сконфигурировано. ${whereConfig}`);
  }

  const validatedConfig: ConfigurationtVariables = plainToClass(
    ConfigurationtVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors: ValidationError[] = validateSync(validatedConfig, {
    dismissDefaultMessages: true,
    validationError: {
      target: false,
    },
  });

  if (errors.length > 0) {
    throw new Error(
      `Ошибка при инициализации enviroment переменных сервиса. ${whereConfig} ${russifyValidationErrors(
        errors,
      )}`,
    );
  }
}
