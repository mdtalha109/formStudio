import { authHandlers } from './handlers/authHandlers';
import { formHandlers } from './handlers/formHandlers';
import { formSchemaHandlers } from './handlers/formSchemaHandlers';
import { publicFormHandlers } from './handlers/publicFormHandlers';

export const handlers = [...authHandlers, ...formHandlers, ...formSchemaHandlers, ...publicFormHandlers];
