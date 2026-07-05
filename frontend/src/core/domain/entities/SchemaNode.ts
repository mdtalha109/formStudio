export type NodeId = string;
export type NodeType = 'section' | 'row' | 'column' | 'field';

export type FieldType =
  | 'text'
  | 'email'
  | 'number'
  | 'phone'
  | 'textarea'
  | 'checkbox'
  | 'dropdown'
  | 'radio'
  | 'date'
  | 'rating';

// ─── Container node configs ───────────────────────────────────────────────────

export interface SectionConfig {
  title?: string;
}

export type RowConfig = Record<string, never>;

export interface ColumnConfig {
  width?: number;
}

// ─── Field configs (one per FieldType) ───────────────────────────────────────

export interface BaseFieldConfig {
  label: string;
  required: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface TextFieldConfig extends BaseFieldConfig {
  placeholder?: string;
}

export interface EmailFieldConfig extends BaseFieldConfig {
  placeholder?: string;
}

export interface NumberFieldConfig extends BaseFieldConfig {
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface PhoneFieldConfig extends BaseFieldConfig {
  placeholder?: string;
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  placeholder?: string;
}

export type CheckboxFieldConfig = BaseFieldConfig;

export interface DropdownFieldConfig extends BaseFieldConfig {
  placeholder?: string;
  options: SelectOption[];
}

export interface RadioFieldConfig extends BaseFieldConfig {
  options: SelectOption[];
  layout?: 'vertical' | 'horizontal';
}

export interface DateFieldConfig extends BaseFieldConfig {
  placeholder?: string;
}

export interface RatingFieldConfig extends BaseFieldConfig {
  maxStars: number;
}

// ─── Map: FieldType → its config (drives the discriminated union below) ───────

export type FieldConfigMap = {
  text: TextFieldConfig;
  email: EmailFieldConfig;
  number: NumberFieldConfig;
  phone: PhoneFieldConfig;
  textarea: TextareaFieldConfig;
  checkbox: CheckboxFieldConfig;
  dropdown: DropdownFieldConfig;
  radio: RadioFieldConfig;
  date: DateFieldConfig;
  rating: RatingFieldConfig;
};

// Convenience union — use when the specific FieldType doesn't matter.
export type FieldConfig = FieldConfigMap[FieldType];

// Patch type for updateNodeConfig: a partial of every possible config key.
// UnionToIntersection collapses the FieldConfig union into an intersection so
// Partial picks up ALL keys — and automatically stays in sync when new field
// types are added to FieldConfigMap.
type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends (x: infer I) => void ? I : never;
export type FieldConfigPatch = Partial<UnionToIntersection<FieldConfig>>;

// ─── Schema nodes ─────────────────────────────────────────────────────────────

interface BaseSchemaNode {
  id: NodeId;
  parentId: NodeId | null;
  childIds: NodeId[];
}

export interface SectionNode extends BaseSchemaNode {
  type: 'section';
  config: SectionConfig;
}

export interface RowNode extends BaseSchemaNode {
  type: 'row';
  config: RowConfig;
}

export interface ColumnNode extends BaseSchemaNode {
  type: 'column';
  config: ColumnConfig;
}

// Distributive mapped type → FieldNode is a proper discriminated union on both
// `fieldType` and `config`. Narrowing `node.fieldType === 'dropdown'` gives
// TypeScript full knowledge that `node.config` is `DropdownFieldConfig`.
type FieldNodeMap = {
  [T in FieldType]: BaseSchemaNode & { type: 'field'; fieldType: T; config: FieldConfigMap[T] };
};
export type FieldNode = FieldNodeMap[FieldType];

export type SchemaNode = SectionNode | RowNode | ColumnNode | FieldNode;

export interface NormalizedSchema {
  rootId: NodeId;
  nodes: Record<NodeId, SchemaNode>;
}
