import type {
  ColumnConfig,
  FieldConfig,
  FieldType,
  NodeId,
  NormalizedSchema,
  RowConfig,
  SchemaNode,
  SectionConfig,
} from '@core/domain/entities/SchemaNode';

function createNode(
  id: NodeId,
  parentId: NodeId,
  nodeType: 'section' | 'row' | 'column',
): SchemaNode;
function createNode(
  id: NodeId,
  parentId: NodeId,
  nodeType: 'field',
  fieldType: FieldType,
): SchemaNode;
function createNode(
  id: NodeId,
  parentId: NodeId,
  nodeType: SchemaNode['type'],
  fieldType?: FieldType,
): SchemaNode {
  if (nodeType === 'section') {
    const config: SectionConfig = {};
    return { id, parentId, childIds: [], type: 'section', config };
  }
  if (nodeType === 'row') {
    const config: RowConfig = {};
    return { id, parentId, childIds: [], type: 'row', config };
  }
  if (nodeType === 'column') {
    const config: ColumnConfig = {};
    return { id, parentId, childIds: [], type: 'column', config };
  }

  const config: FieldConfig = { label: 'Untitled field', required: false };
  return { id, parentId, childIds: [], type: 'field', fieldType: fieldType!, config };
}

export function addNode(
  schema: NormalizedSchema,
  parentId: NodeId,
  nodeType: SchemaNode['type'],
  fieldType?: FieldType,
  index?: number,
): NormalizedSchema {
  const parent = schema.nodes[parentId];
  if (!parent) {
    throw new Error(`addNode: parent node "${parentId}" does not exist`);
  }

  const newNodeId = crypto.randomUUID();
  const newNode =
    nodeType === 'field'
      ? createNode(newNodeId, parentId, 'field', fieldType ?? 'text')
      : createNode(newNodeId, parentId, nodeType);

  const childIds = [...parent.childIds];
  const insertAt = index === undefined ? childIds.length : index;
  childIds.splice(insertAt, 0, newNodeId);

  return {
    ...schema,
    nodes: {
      ...schema.nodes,
      [parentId]: { ...parent, childIds },
      [newNodeId]: newNode,
    },
  };
}
