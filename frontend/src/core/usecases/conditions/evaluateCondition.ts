import type { Condition } from '@core/domain/entities/Condition';

export function evaluateCondition(
  condition: Condition,
  formValues: Record<string, unknown>,
): boolean {
  const { sourceFieldId, operator, value } = condition;
  const fieldValue = formValues[sourceFieldId];

  switch (operator) {
    case 'eq':
      return fieldValue === value;
    case 'neq':
      return fieldValue !== value;
    case 'gt':
      return Number(fieldValue) > Number(value);
    case 'lt':
      return Number(fieldValue) < Number(value);
    case 'contains':
      return typeof fieldValue === 'string' && fieldValue.includes(String(value));
    case 'is_empty':
      return fieldValue === null || fieldValue === undefined || fieldValue === '' || fieldValue === false;
    case 'is_not_empty':
      return fieldValue !== null && fieldValue !== undefined && fieldValue !== '' && fieldValue !== false;
    default: {
      const _exhaustive: never = operator;
      return _exhaustive;
    }
  }
}
