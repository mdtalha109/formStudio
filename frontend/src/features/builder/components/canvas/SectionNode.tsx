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
    <section className="border-border bg-card rounded-lg border p-4">
      <h2 className="text-foreground mb-4 text-sm font-semibold">
        {node.config.title ?? 'Untitled section'}
      </h2>
      <div className="flex flex-col gap-4">
        {childIds.map((rowId) => (
          <RowNode key={rowId} nodeId={rowId} />
        ))}
      </div>
    </section>
  );
}

export default SectionNode;
