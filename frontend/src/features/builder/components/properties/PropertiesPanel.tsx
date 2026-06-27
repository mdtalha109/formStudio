import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useBuilderStore } from '@adapters/store/builderStore';
import { useBuilderNode } from '@features/builder/hooks/useBuilderNode';
import { useSelection } from '@features/builder/hooks/useSelection';
import type { FieldNode } from '@core/domain/entities/SchemaNode';
import { Checkbox, Input } from '@shared/components/ui';

function PropertiesPanel() {
  const { selectedNodeId } = useSelection();
  const node = useBuilderNode(selectedNodeId ?? '');
  const updateNodeConfig = useBuilderStore((state) => state.updateNodeConfig);

  const [label, setLabel] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    if (node?.type === 'field') {
      setLabel(node.config.label);
      setPlaceholder(node.config.placeholder ?? '');
    }
  }, [node]);

  if (!node || node.type !== 'field') {
    return (
      <aside className="border-border bg-card w-72 shrink-0 border-l p-4">
        <p className="text-subtle-foreground text-xs font-semibold tracking-wide uppercase">
          Properties
        </p>
        <p className="text-muted-foreground mt-4 text-sm">Select a field to edit its properties.</p>
      </aside>
    );
  }

  const handleRequiredChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateNodeConfig<FieldNode>(node.id, { required: event.target.checked });
  };

  return (
    <aside className="border-border bg-card w-72 shrink-0 border-l p-4">
      <p className="text-subtle-foreground text-xs font-semibold tracking-wide uppercase">
        Properties
      </p>
      <div className="mt-4 flex flex-col gap-4">
        <Input
          id="field-label"
          label="Field Label"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          onBlur={() => updateNodeConfig<FieldNode>(node.id, { label })}
        />
        <Input
          id="field-placeholder"
          label="Placeholder Text"
          value={placeholder}
          onChange={(event) => setPlaceholder(event.target.value)}
          onBlur={() => updateNodeConfig<FieldNode>(node.id, { placeholder })}
        />
        <Checkbox
          id="field-required"
          label="Required field"
          checked={node.config.required}
          onChange={handleRequiredChange}
        />
      </div>
    </aside>
  );
}

export default PropertiesPanel;
