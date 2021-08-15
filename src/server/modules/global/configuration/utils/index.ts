import { readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import { NODE_ENV } from '../../../../../common/consts/configuration';
import { validate } from './validate';

const YAML_CONFIG_FILENAME = 'configuration.yml';

export function getConfiguration() {
  if (process.env.NODE_ENV !== NODE_ENV.production) {
    const configuration = load(
      readFileSync(
        join(__dirname, '../../../../../../', YAML_CONFIG_FILENAME),
        'utf8',
      ),
    ) as Record<string, any>;

    validate(configuration);

    return configuration;
  } else {
    validate(process.env);
  }
}
