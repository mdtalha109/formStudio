import type { NodeId, NormalizedSchema } from '@core/domain/entities/SchemaNode';

export function moveNode(
  schema: NormalizedSchema,
  nodeId: NodeId,
  targetParentId: NodeId,
  targetIndex: number,
): NormalizedSchema {
  const node = schema.nodes[nodeId];
  if (!node) {
    throw new Error(`moveNode: node "${nodeId}" does not exist`);
  }

  const targetParent = schema.nodes[targetParentId];
  if (!targetParent) {
    throw new Error(`moveNode: target parent "${targetParentId}" does not exist`);
  }

  const sourceParentId = node.parentId;
  if (sourceParentId === null) {
    throw new Error(`moveNode: node "${nodeId}" has no parent and cannot be moved`);
  }

  const sourceParent = schema.nodes[sourceParentId];
  if (!sourceParent) {
    throw new Error(`moveNode: source parent "${sourceParentId}" does not exist`);
  }

  const nextNodes = { ...schema.nodes };

  if (sourceParentId === targetParentId) {
    const childIds = sourceParent.childIds.filter((id) => id !== nodeId);
    const insertAt = Math.min(targetIndex, childIds.length);
    childIds.splice(insertAt, 0, nodeId);
    nextNodes[sourceParentId] = { ...sourceParent, childIds };
  } else {
    nextNodes[sourceParentId] = {
      ...sourceParent,
      childIds: sourceParent.childIds.filter((id) => id !== nodeId),
    };

    const targetChildIds = [...targetParent.childIds];
    const insertAt = Math.min(targetIndex, targetChildIds.length);
    targetChildIds.splice(insertAt, 0, nodeId);
    nextNodes[targetParentId] = { ...targetParent, childIds: targetChildIds };

    nextNodes[nodeId] = { ...node, parentId: targetParentId };
  }

  return { ...schema, nodes: nextNodes };
}
