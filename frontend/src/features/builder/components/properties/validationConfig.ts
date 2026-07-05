import type { FieldType } from '@core/domain/entities/SchemaNode';

export type ValidationInputType = 'number' | 'text';

export interface ValidationField {
  key: string;
  label: string;
  inputType: ValidationInputType;
  placeholder?: string;
}

type ValidationConfig = Partial<Record<FieldType, ValidationField[]>>;

export const validationConfig: ValidationConfig = {
  text: [
    { key: 'minLength', label: 'Min length', inputType: 'number', placeholder: 'e.g. 2' },
    { key: 'maxLength', label: 'Max length', inputType: 'number', placeholder: 'e.g. 100' },
    { key: 'pattern', label: 'Pattern (regex)', inputType: 'text', placeholder: 'e.g. ^[A-Za-z]+$' },
  ],
  number: [
    { key: 'min', label: 'Minimum value', inputType: 'number', placeholder: 'e.g. 0' },
    { key: 'max', label: 'Maximum value', inputType: 'number', placeholder: 'e.g. 100' },
    { key: 'step', label: 'Step', inputType: 'number', placeholder: 'e.g. 1' },
  ],
  phone: [
    { key: 'minLength', label: 'Min length', inputType: 'number', placeholder: 'e.g. 7' },
    { key: 'maxLength', label: 'Max length', inputType: 'number', placeholder: 'e.g. 15' },
  ],
  textarea: [
    { key: 'minLength', label: 'Min length', inputType: 'number', placeholder: 'e.g. 10' },
    { key: 'maxLength', label: 'Max length', inputType: 'number', placeholder: 'e.g. 500' },
  ],
};
