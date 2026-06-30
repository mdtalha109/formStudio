import { useState } from 'react';
import type { ReactNode } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useBuilderStore } from '@adapters/store/builderStore';
import type { NodeId } from '@core/domain/entities/SchemaNode';
import { componentRegistry } from '@features/builder/registry/componentRegistry';
import { useBuilderSensors } from './sensors';
import type { BuilderDragData, BuilderDropData } from './dndTypes';

interface BuilderDndProviderProps {
  children: ReactNode;
}

function BuilderDndProvider({ children }: BuilderDndProviderProps) {
  const sensors = useBuilderSensors();
  const schema = useBuilderStore((state) => state.schema);
  const addNode = useBuilderStore((state) => state.addNode);
  const moveNode = useBuilderStore((state) => state.moveNode);
  const [activeDragData, setActiveDragData] = useState<BuilderDragData | null>(null);

  function resolveColumnId(data: BuilderDropData | undefined): NodeId | undefined {
    if (!data) return undefined;
    if (data.kind === 'column') return data.columnId;
    return schema.nodes[data.nodeId]?.parentId ?? undefined;
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveDragData((event.active.data.current as BuilderDragData | undefined) ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveDragData(null);
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current as BuilderDragData | undefined;
    const overData = over.data.current as BuilderDropData | undefined;
    if (!activeData) return;

    const targetColumnId = resolveColumnId(overData);
    if (!targetColumnId) return;

    if (activeData.kind === 'palette') {
      addNode(targetColumnId, 'field', activeData.fieldType);
      return;
    }

    if (active.id === over.id) return;

    const activeNode = schema.nodes[activeData.nodeId];
    if (!activeNode || activeNode.parentId !== targetColumnId) return;

    const column = schema.nodes[targetColumnId];
    const overIndex = overData?.kind === 'field' ? column.childIds.indexOf(overData.nodeId) : column.childIds.length;
    moveNode(activeNode.id, targetColumnId, overIndex);
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {children}
      <DragOverlay>
        {activeDragData?.kind === 'palette' ? (
          <div className="bg-card border-border flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium shadow-md">
            {componentRegistry[activeDragData.fieldType].displayName}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default BuilderDndProvider;
