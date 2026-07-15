import type { Operator } from '@core/domain/entities/Condition';
import type { FieldType } from '@core/domain/entities/SchemaNode';

export interface OperatorOption {
  value: Operator;
  label: string;
  hasValue: boolean;
}

type LogicConfig = Partial<Record<FieldType, OperatorOption[]>>;

const textOperators: OperatorOption[] = [
  { value: 'eq', label: 'is', hasValue: true },
  { value: 'neq', label: 'is not', hasValue: true },
  { value: 'contains', label: 'contains', hasValue: true },
  { value: 'is_empty', label: 'is empty', hasValue: false },
  { value: 'is_not_empty', label: 'is not empty', hasValue: false },
];

const numericOperators: OperatorOption[] = [
  { value: 'eq', label: 'equals', hasValue: true },
  { value: 'neq', label: 'does not equal', hasValue: true },
  { value: 'gt', label: 'is greater than', hasValue: true },
  { value: 'lt', label: 'is less than', hasValue: true },
  { value: 'is_empty', label: 'is empty', hasValue: false },
  { value: 'is_not_empty', label: 'is not empty', hasValue: false },
];

const choiceOperators: OperatorOption[] = [
  { value: 'eq', label: 'is', hasValue: true },
  { value: 'neq', label: 'is not', hasValue: true },
  { value: 'is_empty', label: 'is empty', hasValue: false },
  { value: 'is_not_empty', label: 'is not empty', hasValue: false },
];

// Checkbox uses is_not_empty / is_empty because evaluateCondition treats
// false as empty, so "is checked" = is_not_empty and "not checked" = is_empty.
const checkboxOperators: OperatorOption[] = [
  { value: 'is_not_empty', label: 'is checked', hasValue: false },
  { value: 'is_empty', label: 'is not checked', hasValue: false },
];

export const logicConfig: LogicConfig = {
  text: textOperators,
  email: textOperators,
  phone: textOperators,
  textarea: textOperators,
  number: numericOperators,
  rating: numericOperators,
  date: numericOperators,
  dropdown: choiceOperators,
  radio: choiceOperators,
  checkbox: checkboxOperators,
};
