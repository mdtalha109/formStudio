import { useRef, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useNodeChildren } from '@features/builder/hooks/useNodeChildren';
import type { NodeId } from '@core/domain/entities/SchemaNode';
import type { BuilderDragData, ColumnDropData } from '@features/builder/dnd/dndTypes';
import { cn } from '@shared/utils/cn';
import FieldNode from './FieldNode';

interface ColumnNodeProps {
  nodeId: NodeId;
}

function ColumnNode({ nodeId }: ColumnNodeProps) {
  const childIds = useNodeChildren(nodeId);

  // Keep a ref so useDndMonitor callbacks always read the latest childIds
  // without needing to re-subscribe on every render.
  const childIdsRef = useRef(childIds);
  childIdsRef.current = childIds;

  const { setNodeRef } = useDroppable({
    id: `column:${nodeId}`,
    data: { kind: 'column', columnId: nodeId } satisfies ColumnDropData,
  });

  const [isPaletteDragActive, setIsPaletteDragActive] = useState(false);
  const [isColumnOver, setIsColumnOver] = useState(false);

  useDndMonitor({
    onDragStart: (event) => {
      const data = event.active.data.current as BuilderDragData | undefined;
      setIsPaletteDragActive(data?.kind === 'palette');
    },
    onDragOver: (event) => {
      const overId = String(event.over?.id ?? '');
      // Column is "over" when hovering its own droppable zone OR any child field.
      // useDroppable's isOver misses the child-field case since collision detection
      // resolves to the field's id, not the column's, when hovering over a field row.
      setIsColumnOver(
        overId === `column:${nodeId}` || childIdsRef.current.includes(overId),
      );
    },
    onDragEnd: () => { setIsPaletteDragActive(false); setIsColumnOver(false); },
    onDragCancel: () => { setIsPaletteDragActive(false); setIsColumnOver(false); },
  });

  return (
    <div ref={setNodeRef} className="flex flex-1 flex-col gap-1">
      {childIds.length === 0 ? (
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-1.5 rounded-md border border-dashed py-8 transition-colors duration-150',
            !isPaletteDragActive && 'border-border text-subtle-foreground',
            isPaletteDragActive && !isColumnOver && 'border-primary/50 bg-primary-light/20 text-primary/60',
            isPaletteDragActive && isColumnOver && 'border-primary bg-primary-light/30 text-primary',
          )}
        >
          <PlusCircle className="size-4" strokeWidth={1.75} />
          <p className="text-xs font-medium tracking-wide uppercase">Drop field here</p>
        </div>
      ) : (
        <>
          <SortableContext items={childIds} strategy={verticalListSortingStrategy}>
            {childIds.map((fieldId) => (
              <FieldNode key={fieldId} nodeId={fieldId} />
            ))}
          </SortableContext>

          {isPaletteDragActive && (
            <div
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-md border border-dashed py-2.5 transition-colors duration-150',
                isColumnOver
                  ? 'border-primary bg-primary-light/30 text-primary'
                  : 'border-primary/40 bg-primary-light/15 text-primary/50',
              )}
            >
              <PlusCircle className="size-3.5" strokeWidth={1.75} />
              <span className="text-xs font-medium tracking-wide uppercase">Drop field here</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ColumnNode;
