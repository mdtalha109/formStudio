import type { NormalizedSchema } from '@core/domain/entities/SchemaNode';
import { httpClient } from './httpClient';

export function getFormSchema(formId: string): Promise<NormalizedSchema> {
  return httpClient.get<NormalizedSchema>(`/api/forms/${formId}/schema`);
}

export function saveFormSchema(formId: string, schema: NormalizedSchema): Promise<NormalizedSchema> {
  return httpClient.patch<NormalizedSchema>(`/api/forms/${formId}/schema`, schema);
}
