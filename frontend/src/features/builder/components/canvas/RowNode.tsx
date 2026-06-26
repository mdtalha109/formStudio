import { useNodeChildren } from '@features/builder/hooks/useNodeChildren';
import type { NodeId } from '@core/domain/entities/SchemaNode';
import ColumnNode from './ColumnNode';

interface RowNodeProps {
  nodeId: NodeId;
}

function RowNode({ nodeId }: RowNodeProps) {
  const childIds = useNodeChildren(nodeId);

  return (
    <div className="flex gap-4">
      {childIds.map((columnId) => (
        <ColumnNode key={columnId} nodeId={columnId} />
      ))}
    </div>
  );
}

export default RowNode;
