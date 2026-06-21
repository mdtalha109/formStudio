import { authHandlers } from './handlers/authHandlers';
import { formHandlers } from './handlers/formHandlers';

export const handlers = [...authHandlers, ...formHandlers];
