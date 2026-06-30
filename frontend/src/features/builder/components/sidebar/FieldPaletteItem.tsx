import type { LucideIcon } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import type { FieldType } from '@core/domain/entities/SchemaNode';
import type { PaletteDragData } from '@features/builder/dnd/dndTypes';
import { cn } from '@shared/utils/cn';

interface FieldPaletteItemProps {
  displayName: string;
  icon: LucideIcon;
  fieldType: FieldType;
  onClick: () => void;
}

function FieldPaletteItem({ displayName, icon: Icon, fieldType, onClick }: FieldPaletteItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette:${fieldType}`,
    data: { kind: 'palette', fieldType } satisfies PaletteDragData,
  });

  return (
    <button
      type="button"
      ref={setNodeRef}
      onClick={onClick}
      {...listeners}
      {...attributes}
      className={cn(
        'text-foreground hover:bg-background group flex w-full cursor-grab touch-none items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors',
        isDragging && 'opacity-40',
      )}
    >
      <Icon className="text-muted-foreground group-hover:text-foreground size-4 shrink-0" strokeWidth={1.75} />
      <span className="truncate font-medium">{displayName}</span>
    </button>
  );
}

export default FieldPaletteItem;
