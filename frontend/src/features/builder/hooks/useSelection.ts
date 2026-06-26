import { useBuilderStore } from '@adapters/store/builderStore';
import type { NodeId } from '@core/domain/entities/SchemaNode';

interface UseSelectionResult {
  selectedNodeId: NodeId | null;
  selectNode: (nodeId: NodeId | null) => void;
}

export function useSelection(): UseSelectionResult {
  const selectedNodeId = useBuilderStore((state) => state.selectedNodeId);
  const selectNode = useBuilderStore((state) => state.selectNode);
  return { selectedNodeId, selectNode };
}
