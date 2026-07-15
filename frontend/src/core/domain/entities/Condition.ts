import type { NodeId } from './SchemaNode';

export type Operator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'lt'
  | 'contains'
  | 'is_empty'
  | 'is_not_empty';

export interface Condition {
  sourceFieldId: NodeId;
  operator: Operator;
  value: string | number | boolean;
}

export interface VisibilityRule {
  matchAll: boolean;
  conditions: Condition[];
}
