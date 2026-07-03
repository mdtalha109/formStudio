import { useBuilderStore } from '@adapters/store/builderStore';
import type { FieldType } from '@core/domain/entities/SchemaNode';
import { componentRegistry } from '@features/builder/registry/componentRegistry';
import type { FieldGroup } from '@features/builder/registry/componentRegistry';
import FieldPaletteItem from './FieldPaletteItem';

const GROUP_LABELS: Record<FieldGroup, string> = {
  input: 'Input Fields',
  selection: 'Selection Fields',
  other: 'Other',
};

const GROUP_ORDER: FieldGroup[] = ['input', 'selection', 'other'];

type RegistryEntry = [FieldType, (typeof componentRegistry)[FieldType]];

const grouped = GROUP_ORDER.reduce<Record<FieldGroup, RegistryEntry[]>>(
  (acc, group) => ({ ...acc, [group]: [] }),
  {} as Record<FieldGroup, RegistryEntry[]>,
);

for (const [fieldType, entry] of Object.entries(componentRegistry) as RegistryEntry[]) {
  grouped[entry.group].push([fieldType, entry]);
}

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

      <div className="mt-3 flex flex-col gap-4">
        {GROUP_ORDER.map((group) => (
          <div key={group}>
            <p className="text-subtle-foreground px-2.5 pb-1 text-[11px] font-semibold tracking-wider uppercase">
              {GROUP_LABELS[group]}
            </p>
            <nav className="flex flex-col gap-0.5">
              {grouped[group].map(([fieldType, entry]) => (
                <FieldPaletteItem
                  key={fieldType}
                  displayName={entry.displayName}
                  icon={entry.icon}
                  fieldType={fieldType}
                  onClick={() => handleAddField(fieldType)}
                />
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default FieldSidebar;
