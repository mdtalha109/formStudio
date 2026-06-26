import { useBuilderStore } from '@adapters/store/builderStore';
import type { NodeId } from '@core/domain/entities/SchemaNode';

export function useNodeChildren(nodeId: NodeId): NodeId[] {
  return useBuilderStore((state) => state.schema.nodes[nodeId]?.childIds ?? []);
}
