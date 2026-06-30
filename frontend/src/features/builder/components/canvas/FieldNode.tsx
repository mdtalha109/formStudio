import { GripVertical, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBuilderStore } from '@adapters/store/builderStore';
import { useBuilderNode } from '@features/builder/hooks/useBuilderNode';
import { useSelection } from '@features/builder/hooks/useSelection';
import type { NodeId } from '@core/domain/entities/SchemaNode';
import { componentRegistry } from '@features/builder/registry/componentRegistry';
import type { FieldDragData } from '@features/builder/dnd/dndTypes';
import { cn } from '@shared/utils/cn';

interface FieldNodeProps {
  nodeId: NodeId;
}

function FieldNode({ nodeId }: FieldNodeProps) {
  const node = useBuilderNode(nodeId);
  const { selectedNodeId, selectNode } = useSelection();
  const removeNode = useBuilderStore((state) => state.removeNode);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: nodeId,
    data: { kind: 'field', nodeId } satisfies FieldDragData,
  });

  if (!node || node.type !== 'field') return null;
  const { Preview } = componentRegistry[node.fieldType];
  const isSelected = selectedNodeId === nodeId;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        'group relative border-l-[3px] py-1 pl-4 transition-colors duration-150',
        isSelected ? 'border-primary' : 'border-transparent hover:border-border',
        isDragging && 'opacity-40',
      )}
    >
      <button
        type="button"
        aria-label={`Select ${node.config.label}`}
        onClick={() => selectNode(nodeId)}
        className="absolute inset-0 z-10 cursor-pointer"
      />
      <button
        type="button"
        aria-label="Drag to reorder field"
        {...attributes}
        {...listeners}
        className="text-subtle-foreground absolute top-1/2 left-0.5 z-20 -translate-y-1/2 touch-none cursor-grab rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <GripVertical className="size-3.5" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label={`Delete ${node.config.label}`}
        onClick={() => removeNode(nodeId)}
        className="text-subtle-foreground hover:text-danger absolute top-1/2 right-1 z-20 -translate-y-1/2 rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <Trash2 className="size-3.5" strokeWidth={1.75} />
      </button>
      <Preview node={node} />
    </div>
  );
}

export default FieldNode;
