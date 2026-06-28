import { PlusCircle } from 'lucide-react';
import { useNodeChildren } from '@features/builder/hooks/useNodeChildren';
import type { NodeId } from '@core/domain/entities/SchemaNode';
import FieldNode from './FieldNode';

interface ColumnNodeProps {
  nodeId: NodeId;
}

function ColumnNode({ nodeId }: ColumnNodeProps) {
  const childIds = useNodeChildren(nodeId);

  return (
    <div className="flex flex-1 flex-col gap-1">
      {childIds.length === 0 ? (
        <div className="border-border text-subtle-foreground flex flex-col items-center justify-center gap-1.5 rounded-md border border-dashed py-8">
          <PlusCircle className="size-4" strokeWidth={1.75} />
          <p className="text-xs font-medium tracking-wide uppercase">Drop field here</p>
        </div>
      ) : (
        childIds.map((fieldId) => <FieldNode key={fieldId} nodeId={fieldId} />)
      )}
    </div>
  );
}

export default ColumnNode;
