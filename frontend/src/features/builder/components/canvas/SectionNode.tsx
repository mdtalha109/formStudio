import { Plus } from 'lucide-react';
import { useBuilderStore } from '@adapters/store/builderStore';
import { useBuilderNode } from '@features/builder/hooks/useBuilderNode';
import { useNodeChildren } from '@features/builder/hooks/useNodeChildren';
import type { NodeId } from '@core/domain/entities/SchemaNode';
import { Button } from '@shared/components/ui';
import RowNode from './RowNode';

interface SectionNodeProps {
  nodeId: NodeId;
}

function SectionNode({ nodeId }: SectionNodeProps) {
  const node = useBuilderNode(nodeId);
  const childIds = useNodeChildren(nodeId);
  const addRow = useBuilderStore((state) => state.addRow);

  if (!node || node.type !== 'section') return null;

  return (
    <section className="group/section border-border bg-card max-w-3xl rounded-lg border shadow-sm">
      <header className="border-border border-b px-6 py-4">
        <h2 className="text-foreground text-base font-semibold">
          {node.config.title ?? 'Untitled section'}
        </h2>
      </header>
      <div className="flex flex-col gap-5 p-6">
        {childIds.map((rowId) => (
          <RowNode key={rowId} nodeId={rowId} />
        ))}
        <div className="opacity-0 transition-opacity duration-150 group-hover/section:opacity-100">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Add row"
            leftIcon={<Plus className="size-3.5" strokeWidth={1.75} />}
            onClick={() => addRow(nodeId)}
          >
            Add row
          </Button>
        </div>
      </div>
    </section>
  );
}

export default SectionNode;
