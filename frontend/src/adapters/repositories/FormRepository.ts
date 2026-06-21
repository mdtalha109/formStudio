import type { IFormRepository } from '@core/domain/ports/IFormRepository';
import type { Form } from '@core/domain/entities/Form';
import { httpClient } from '@adapters/api/httpClient';

export class FormRepository implements IFormRepository {
  async listForms(): Promise<Form[]> {
    return httpClient.get<Form[]>('/api/forms');
  }

  async createForm(title: string): Promise<Form> {
    return httpClient.post<Form>('/api/forms', { title });
  }

  async renameForm(formId: string, title: string): Promise<Form> {
    return httpClient.patch<Form>(`/api/forms/${formId}`, { title });
  }

  async deleteForm(formId: string): Promise<void> {
    await httpClient.delete<void>(`/api/forms/${formId}`);
  }

  async duplicateForm(formId: string): Promise<Form> {
    return httpClient.post<Form>(`/api/forms/${formId}/duplicate`);
  }

  async publishForm(formId: string): Promise<Form> {
    return httpClient.post<Form>(`/api/forms/${formId}/publish`);
  }

  async unpublishForm(formId: string): Promise<Form> {
    return httpClient.post<Form>(`/api/forms/${formId}/unpublish`);
  }
}

export const formRepository = new FormRepository();
