import type { ComponentType } from 'react';
import type { FieldType } from '@core/domain/entities/SchemaNode';
import type { RendererFieldProps } from '../types';
import { TextRendererField } from '../components/fields/TextRendererField';
import { EmailRendererField } from '../components/fields/EmailRendererField';
import { NumberRendererField } from '../components/fields/NumberRendererField';
import { PhoneRendererField } from '../components/fields/PhoneRendererField';
import { DateRendererField } from '../components/fields/DateRendererField';
import { TextareaRendererField } from '../components/fields/TextareaRendererField';
import { CheckboxRendererField } from '../components/fields/CheckboxRendererField';
import { DropdownRendererField } from '../components/fields/DropdownRendererField';
import { RadioRendererField } from '../components/fields/RadioRendererField';
import { RatingRendererField } from '../components/fields/RatingRendererField';

export type RendererRegistry = Record<FieldType, ComponentType<RendererFieldProps>>;

export const rendererRegistry: RendererRegistry = {
  text: TextRendererField,
  email: EmailRendererField,
  number: NumberRendererField,
  phone: PhoneRendererField,
  date: DateRendererField,
  textarea: TextareaRendererField,
  checkbox: CheckboxRendererField,
  dropdown: DropdownRendererField,
  radio: RadioRendererField,
  rating: RatingRendererField,
};
