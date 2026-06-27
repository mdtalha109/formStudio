import { useBuilderNode } from '@features/builder/hooks/useBuilderNode';
import { useSelection } from '@features/builder/hooks/useSelection';
import type { NodeId } from '@core/domain/entities/SchemaNode';
import { componentRegistry } from '@features/builder/registry/componentRegistry';
import { cn } from '@shared/utils/cn';

interface FieldNodeProps {
  nodeId: NodeId;
}

function FieldNode({ nodeId }: FieldNodeProps) {
  const node = useBuilderNode(nodeId);
  const { selectedNodeId, selectNode } = useSelection();

  if (!node || node.type !== 'field') return null;
  const { Preview } = componentRegistry[node.fieldType];
  const isSelected = selectedNodeId === nodeId;

  return (
    <div
      className={cn(
        'relative rounded-md border-l-2 p-2 transition-colors',
        isSelected ? 'border-primary bg-primary-light' : 'border-transparent hover:bg-muted',
      )}
    >
      <button
        type="button"
        aria-label={`Select ${node.config.label}`}
        onClick={() => selectNode(nodeId)}
        className="absolute inset-0 z-10 cursor-pointer"
      />
      <Preview node={node} />
    </div>
  );
}

export default FieldNode;
