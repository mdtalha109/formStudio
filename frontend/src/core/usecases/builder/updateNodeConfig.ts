import type { NodeId, NormalizedSchema, SchemaNode } from '@core/domain/entities/SchemaNode';

export function updateNodeConfig<T extends SchemaNode>(
  schema: NormalizedSchema,
  nodeId: NodeId,
  configPatch: Partial<T['config']>,
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
