import { useBuilderStore } from '@adapters/store/builderStore';
import type { NodeId, SchemaNode } from '@core/domain/entities/SchemaNode';

export function useBuilderNode(nodeId: NodeId): SchemaNode | undefined {
  return useBuilderStore((state) => state.schema.nodes[nodeId]);
}
