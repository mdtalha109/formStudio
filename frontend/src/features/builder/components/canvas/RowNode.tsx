import { Plus, Trash2 } from 'lucide-react';
import { useBuilderStore } from '@adapters/store/builderStore';
import { useNodeChildren } from '@features/builder/hooks/useNodeChildren';
import type { NodeId } from '@core/domain/entities/SchemaNode';
import { Button } from '@shared/components/ui';
import ColumnNode from './ColumnNode';

interface RowNodeProps {
  nodeId: NodeId;
}

function RowNode({ nodeId }: RowNodeProps) {
  const childIds = useNodeChildren(nodeId);
  const addNode = useBuilderStore((state) => state.addNode);
  const removeNode = useBuilderStore((state) => state.removeNode);

  // Row can only be removed when all its columns are empty (no silent field deletion).
  const allColumnsEmpty = useBuilderStore((state) =>
    childIds.every((colId) => (state.schema.nodes[colId]?.childIds.length ?? 0) === 0),
  );

  return (
    <div className="group/row flex items-start gap-4">
      {childIds.map((columnId) => (
        <ColumnNode key={columnId} nodeId={columnId} isRemovable={childIds.length > 1} />
      ))}
      <div className="flex shrink-0 flex-col gap-1 opacity-0 transition-opacity duration-150 group-hover/row:opacity-100">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Add column"
          onClick={() => addNode(nodeId, 'column')}
        >
          <Plus className="size-4" strokeWidth={1.75} />
        </Button>
        {allColumnsEmpty && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Remove row"
            onClick={() => removeNode(nodeId)}
          >
            <Trash2 className="size-4" strokeWidth={1.75} />
          </Button>
        )}
      </div>
    </div>
  );
}

export default RowNode;
