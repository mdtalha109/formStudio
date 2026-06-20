import type { Form } from '../entities/Form';

export interface IFormRepository {
  listForms(): Promise<Form[]>;
  createForm(title: string): Promise<Form>;
  renameForm(formId: string, title: string): Promise<Form>;
  deleteForm(formId: string): Promise<void>;
  duplicateForm(formId: string): Promise<Form>;
  publishForm(formId: string): Promise<Form>;
  unpublishForm(formId: string): Promise<Form>;
}
