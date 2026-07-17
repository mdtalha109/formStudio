import type { Control, FieldErrors } from 'react-hook-form';
import type { FieldNode } from '@core/domain/entities/SchemaNode';

export type FormValues = Record<string, unknown>;

export interface RendererFieldProps {
  node: FieldNode;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

export function getErrorMessage(errors: FieldErrors<FormValues>, fieldId: string): string | undefined {
  const error = errors[fieldId];
  if (!error || Array.isArray(error)) return undefined;
  const message = (error as { message?: unknown }).message;
  return typeof message === 'string' ? message : undefined;
}
