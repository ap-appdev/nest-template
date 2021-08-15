import { ValidationError } from 'class-validator';

export function russifyValidationErrors(
  validationErrors: ValidationError[],
): string {
  return validationErrors
    .map((error: ValidationError): string => {
      const constraints = [];
      for (const constraintName in error.constraints) {
        const errorMessage = error.constraints[constraintName]
          ? `(Детали проверки: ${error.constraints[constraintName]})`
          : '';

        const constraint = `${constraintName}${errorMessage},`;
        constraints.push(constraint);
      }
      return `Свойство ${error.property} не прошло проверку на [${constraints}]. Свойство задано как <${error.value}>.`;
    })
    .toString();
}
