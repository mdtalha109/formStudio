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
    <aside className="bg-muted border-border flex w-60 shrink-0 flex-col overflow-y-auto border-r px-3 py-4">
      <p className="text-subtle-foreground px-2.5 text-[11px] font-semibold tracking-wider uppercase">
        Components
      </p>

      <div className="mt-3">
        <p className="text-subtle-foreground px-2.5 pb-1 text-[11px] font-semibold tracking-wider uppercase">
          Basic Fields
        </p>
        <nav className="flex flex-col gap-0.5">
          {Object.entries(componentRegistry).map(([fieldType, entry]) => (
            <FieldPaletteItem
              key={fieldType}
              displayName={entry.displayName}
              icon={entry.icon}
              fieldType={fieldType as FieldType}
              onClick={() => handleAddField(fieldType as FieldType)}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default FieldSidebar;
