import { useBuilderNode } from '@features/builder/hooks/useBuilderNode';
import { useNodeChildren } from '@features/builder/hooks/useNodeChildren';
import type { NodeId } from '@core/domain/entities/SchemaNode';
import RowNode from './RowNode';

interface SectionNodeProps {
  nodeId: NodeId;
}

function SectionNode({ nodeId }: SectionNodeProps) {
  const node = useBuilderNode(nodeId);
  const childIds = useNodeChildren(nodeId);

  if (!node || node.type !== 'section') return null;

  return (
    <section className="border-border bg-card  max-w-3xl rounded-lg border shadow-sm">
      <header className="border-border border-b px-6 py-4">
        <h2 className="text-foreground text-base font-semibold">
          {node.config.title ?? 'Untitled section'}
        </h2>
      </header>
      <div className="flex flex-col gap-5 p-6">
        {childIds.map((rowId) => (
          <RowNode key={rowId} nodeId={rowId} />
        ))}
      </div>
    </section>
  );
}

export default SectionNode;
