import { useBuilderStore } from '@adapters/store/builderStore';
import type { FieldType } from '@core/domain/entities/SchemaNode';
import { componentRegistry } from '@features/builder/registry/componentRegistry';
import FieldPaletteItem from './FieldPaletteItem';

function FieldSidebar() {
  const schema = useBuilderStore((state) => state.schema);
  const addNode = useBuilderStore((state) => state.addNode);

  function handleAddField(fieldType: FieldType) {
    const firstColumn = Object.values(schema.nodes).find((node) => node.type === 'column');
    if (!firstColumn) return;
    addNode(firstColumn.id, 'field', fieldType);
  }

  return (
    <aside className="bg-muted border-border flex w-56 shrink-0 flex-col border-r px-3 py-4">
      <p className="text-subtle-foreground px-2 text-xs font-semibold tracking-wide uppercase">
        Components
      </p>
      <nav className="mt-2 flex flex-col gap-1">
        {Object.entries(componentRegistry).map(([fieldType, entry]) => (
          <FieldPaletteItem
            key={fieldType}
            displayName={entry.displayName}
            icon={entry.icon}
            onClick={() => handleAddField(fieldType as FieldType)}
          />
        ))}
      </nav>
    </aside>
  );
}

export default FieldSidebar;
