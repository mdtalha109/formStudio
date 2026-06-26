import { useNodeChildren } from '@features/builder/hooks/useNodeChildren';
import type { NodeId } from '@core/domain/entities/SchemaNode';
import FieldNode from './FieldNode';

interface ColumnNodeProps {
  nodeId: NodeId;
}

function ColumnNode({ nodeId }: ColumnNodeProps) {
  const childIds = useNodeChildren(nodeId);

  return (
    <div className="border-border flex flex-1 flex-col gap-3 rounded-md border border-dashed p-3">
      {childIds.length === 0 ? (
        <p className="text-muted-foreground text-sm">Drop fields here</p>
      ) : (
        childIds.map((fieldId) => <FieldNode key={fieldId} nodeId={fieldId} />)
      )}
    </div>
  );
}

export default ColumnNode;
