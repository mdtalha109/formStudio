  import { useState } from 'react';
  import type { ChangeEvent } from 'react';
  import { Trash2 } from 'lucide-react';
  import { useBuilderStore } from '@adapters/store/builderStore';
  import { useBuilderNode } from '@features/builder/hooks/useBuilderNode';
  import { useSelection } from '@features/builder/hooks/useSelection';
  import { componentRegistry } from '@features/builder/registry/componentRegistry';
  import { Button, Checkbox, Input, Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/components/ui';

  const DISABLED_TABS = ['Validation', 'Logic'] as const;

  function PropertiesPanel() {
    const { selectedNodeId } = useSelection();
    const node = useBuilderNode(selectedNodeId ?? '');
    const updateNodeConfig = useBuilderStore((state) => state.updateNodeConfig);
    const removeNode = useBuilderStore((state) => state.removeNode);

    const [label, setLabel] = useState(node?.type === 'field' ? node.config.label : '');
    const [placeholder, setPlaceholder] = useState(
      node?.type === 'field' && 'placeholder' in node.config ? node.config.placeholder ?? '' : '',
    );

    if (!node || node.type !== 'field') {
      return (
        <aside className="border-border bg-card flex w-72 shrink-0 flex-col border-l">
          <div className="border-border border-b px-4 py-4">
            <p className="text-subtle-foreground text-[11px] font-semibold tracking-wider uppercase">
              Properties
            </p>
          </div>
          <p className="text-muted-foreground px-4 py-6 text-sm">Select a field to edit its properties.</p>
        </aside>
      );
    }

    const handleRequiredChange = (event: ChangeEvent<HTMLInputElement>) => {
      updateNodeConfig(node.id, { required: event.target.checked });
    };

    return (
      <aside className="border-border bg-card flex w-72 shrink-0 flex-col border-l">
        <div className="border-border flex items-start justify-between border-b px-4 py-4">
          <div>
            <p className="text-subtle-foreground text-[11px] font-semibold tracking-wider uppercase">
              Properties
            </p>
            <p className="text-primary mt-1 text-sm font-medium">
              {componentRegistry[node.fieldType].displayName}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hover:text-danger"
            aria-label={`Delete ${node.config.label}`}
            onClick={() => removeNode(node.id)}
          >
            <Trash2 className="size-4" strokeWidth={1.75} />
          </Button>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            {DISABLED_TABS.map((tab) => (
              <TabsTrigger key={tab} value={tab.toLowerCase()} disabled title="Coming soon">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="general" className="flex flex-col gap-4 p-4">
            <Input
              id="field-label"
              label="Field Label"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              onBlur={() => updateNodeConfig(node.id, { label })}
            />
            <Input
              id="field-placeholder"
              label="Placeholder Text"
              value={placeholder}
              onChange={(event) => setPlaceholder(event.target.value)}
              onBlur={() => updateNodeConfig(node.id, { placeholder })}
            />
            <Checkbox
              id="field-required"
              label="Required field"
              checked={node.config.required}
              onChange={handleRequiredChange}
            />
          </TabsContent>
        </Tabs>
      </aside>
    );
  }

  export default PropertiesPanel;
