import type { FieldConfigPatch, NodeId, NormalizedSchema, SchemaNode } from '@core/domain/entities/SchemaNode';

export function updateNodeConfig(
  schema: NormalizedSchema,
  nodeId: NodeId,
  configPatch: FieldConfigPatch,
): NormalizedSchema {
  const node = schema.nodes[nodeId];
  if (!node) {
    throw new Error(`updateNodeConfig: node "${nodeId}" does not exist`);
  }

  const updatedNode = { ...node, config: { ...node.config, ...configPatch } } as SchemaNode;

  return {
    ...schema,
    nodes: { ...schema.nodes, [nodeId]: updatedNode },
  };
}
