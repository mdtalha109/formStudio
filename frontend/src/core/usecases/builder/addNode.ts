import type {
  ColumnConfig,
  FieldConfig,
  FieldConfigPatch,
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
  config?: FieldConfigPatch,
): SchemaNode;
function createNode(
  id: NodeId,
  parentId: NodeId,
  nodeType: SchemaNode['type'],
  fieldType?: FieldType,
  config?: FieldConfigPatch,
): SchemaNode {
  if (nodeType === 'section') {
    const cfg: SectionConfig = {};
    return { id, parentId, childIds: [], type: 'section', config: cfg };
  }
  if (nodeType === 'row') {
    const cfg: RowConfig = {};
    return { id, parentId, childIds: [], type: 'row', config: cfg };
  }
  if (nodeType === 'column') {
    const cfg: ColumnConfig = {};
    return { id, parentId, childIds: [], type: 'column', config: cfg };
  }

  // Merge the caller-supplied config (from the registry default) over a safe
  // base. The cast is intentional: the store always passes the registry's typed
  // defaultConfig, so the merged object satisfies the discriminated union.
  const fieldConfig = { label: 'Untitled field', required: false, ...config } as FieldConfig;
  // TypeScript can't correlate a union FieldType value with its paired config at
  // runtime — the store always passes the registry default, so the cast is safe.
  return { id, parentId, childIds: [], type: 'field', fieldType: fieldType!, config: fieldConfig } as SchemaNode;
}

export function addNode(
  schema: NormalizedSchema,
  parentId: NodeId,
  nodeType: SchemaNode['type'],
  fieldType?: FieldType,
  index?: number,
  config?: FieldConfigPatch,
): NormalizedSchema {
  const parent = schema.nodes[parentId];
  if (!parent) {
    throw new Error(`addNode: parent node "${parentId}" does not exist`);
  }

  const newNodeId = crypto.randomUUID();
  const newNode =
    nodeType === 'field'
      ? createNode(newNodeId, parentId, 'field', fieldType ?? 'text', config)
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
