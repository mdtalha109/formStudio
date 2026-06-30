import { PlusCircle } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useNodeChildren } from '@features/builder/hooks/useNodeChildren';
import type { NodeId } from '@core/domain/entities/SchemaNode';
import type { ColumnDropData } from '@features/builder/dnd/dndTypes';
import { cn } from '@shared/utils/cn';
import FieldNode from './FieldNode';

interface ColumnNodeProps {
  nodeId: NodeId;
}

function ColumnNode({ nodeId }: ColumnNodeProps) {
  const childIds = useNodeChildren(nodeId);
  const { setNodeRef, isOver } = useDroppable({
    id: `column:${nodeId}`,
    data: { kind: 'column', columnId: nodeId } satisfies ColumnDropData,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn('flex flex-1 flex-col gap-1 rounded-md transition-colors', isOver && 'bg-primary-light/40')}
    >
      {childIds.length === 0 ? (
        <div className="border-border text-subtle-foreground flex flex-col items-center justify-center gap-1.5 rounded-md border border-dashed py-8">
          <PlusCircle className="size-4" strokeWidth={1.75} />
          <p className="text-xs font-medium tracking-wide uppercase">Drop field here</p>
        </div>
      ) : (
        <SortableContext items={childIds} strategy={verticalListSortingStrategy}>
          {childIds.map((fieldId) => (
            <FieldNode key={fieldId} nodeId={fieldId} />
          ))}
        </SortableContext>
      )}
    </div>
  );
}

export default ColumnNode;
