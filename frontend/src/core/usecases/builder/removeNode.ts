import type { NodeId, NormalizedSchema } from '@core/domain/entities/SchemaNode';

function collectDescendantIds(schema: NormalizedSchema, nodeId: NodeId): NodeId[] {
  const node = schema.nodes[nodeId];
  if (!node) return [];

  return node.childIds.reduce<NodeId[]>(
    (acc, childId) => [...acc, childId, ...collectDescendantIds(schema, childId)],
    [],
  );
}

export function removeNode(schema: NormalizedSchema, nodeId: NodeId): NormalizedSchema {
  const node = schema.nodes[nodeId];
  if (!node) {
    throw new Error(`removeNode: node "${nodeId}" does not exist`);
  }
  if (node.parentId === null) {
    throw new Error(`removeNode: root node "${nodeId}" cannot be removed`);
  }

  const idsToRemove = [nodeId, ...collectDescendantIds(schema, nodeId)];
  const nextNodes = { ...schema.nodes };
  for (const id of idsToRemove) {
    delete nextNodes[id];
  }

  const parent = nextNodes[node.parentId];
  if (parent) {
    nextNodes[node.parentId] = {
      ...parent,
      childIds: parent.childIds.filter((id) => id !== nodeId),
    };
  }

  return { ...schema, nodes: nextNodes };
}
