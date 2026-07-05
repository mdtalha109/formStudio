import { authHandlers } from './handlers/authHandlers';
import { formHandlers } from './handlers/formHandlers';
import { formSchemaHandlers } from './handlers/formSchemaHandlers';

export const handlers = [...authHandlers, ...formHandlers, ...formSchemaHandlers];
