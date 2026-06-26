import { useBuilderNode } from '@features/builder/hooks/useBuilderNode';
import type { NodeId } from '@core/domain/entities/SchemaNode';
import { componentRegistry } from '@features/builder/registry/componentRegistry';

interface FieldNodeProps {
  nodeId: NodeId;
}

function FieldNode({ nodeId }: FieldNodeProps) {
  const node = useBuilderNode(nodeId);

  if (!node || node.type !== 'field') return null;
  const { Preview } = componentRegistry[node.fieldType];

  return (
    <div className="rounded-md p-2">
      <Preview node={node} />
    </div>
  );
}

export default FieldNode;
