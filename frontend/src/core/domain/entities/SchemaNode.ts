export type NodeId = string;

export type NodeType = 'section' | 'row' | 'column' | 'field';

export type FieldType = 'text' | 'textarea' | 'checkbox';

export interface SectionConfig {
  title?: string;
}

export type RowConfig = Record<string, never>;

export interface ColumnConfig {
  width?: number;
}

export interface FieldConfig {
  label: string;
  placeholder?: string;
  required: boolean;
}

export type NodeConfig = SectionConfig | RowConfig | ColumnConfig | FieldConfig;

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

export interface FieldNode extends BaseSchemaNode {
  type: 'field';
  fieldType: FieldType;
  config: FieldConfig;
}

export type SchemaNode = SectionNode | RowNode | ColumnNode | FieldNode;

export interface NormalizedSchema {
  rootId: NodeId;
  nodes: Record<NodeId, SchemaNode>;
}
