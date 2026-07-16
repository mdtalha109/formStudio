import type { NormalizedSchema } from '@core/domain/entities/SchemaNode';
import { httpClient } from './httpClient';

export interface PublicFormData {
  slug: string;
  title: string;
  schema: NormalizedSchema;
}

export interface SubmissionResult {
  submissionId: string;
  submittedAt: string;
}

export function getPublicForm(slug: string): Promise<PublicFormData> {
  return httpClient.get<PublicFormData>(`/api/public/forms/${slug}`);
}

export function submitForm(
  slug: string,
  values: Record<string, unknown>,
): Promise<SubmissionResult> {
  return httpClient.post<SubmissionResult>(`/api/public/forms/${slug}/submit`, values);
}
