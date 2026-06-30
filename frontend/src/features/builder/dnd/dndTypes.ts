import type { FieldType, NodeId } from '@core/domain/entities/SchemaNode';

export interface PaletteDragData {
  kind: 'palette';
  fieldType: FieldType;
}

export interface FieldDragData {
  kind: 'field';
  nodeId: NodeId;
}

export interface ColumnDropData {
  kind: 'column';
  columnId: NodeId;
}

export type BuilderDragData = PaletteDragData | FieldDragData;
export type BuilderDropData = ColumnDropData | FieldDragData;
