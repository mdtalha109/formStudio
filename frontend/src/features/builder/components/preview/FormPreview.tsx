import { useState } from 'react';
import { useBuilderStore } from '@adapters/store/builderStore';
import type { FieldNode, NodeId } from '@core/domain/entities/SchemaNode';
import { resolveVisibility } from '@core/usecases/conditions/resolveVisibility';
import PreviewField from './PreviewField';

function FormPreview() {
  const schema = useBuilderStore((state) => state.schema);
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});

  function handleChange(fieldId: string, value: unknown) {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  }

  function isVisible(node: FieldNode): boolean {
    if (!node.config.visibilityRule) return true;
    return resolveVisibility(node.config.visibilityRule, formValues);
  }

  function renderField(fieldId: NodeId) {
    const node = schema.nodes[fieldId];
    if (!node || node.type !== 'field') return null;
    if (!isVisible(node)) return null;
    return (
      <PreviewField
        key={node.id}
        node={node}
        value={formValues[node.id]}
        onChange={(value) => handleChange(node.id, value)}
      />
    );
  }

  function renderColumn(columnId: NodeId) {
    const column = schema.nodes[columnId];
    if (!column || column.type !== 'column') return null;
    return (
      <div key={column.id} className="flex flex-1 flex-col gap-5">
        {column.childIds.map(renderField)}
      </div>
    );
  }

  function renderRow(rowId: NodeId) {
    const row = schema.nodes[rowId];
    if (!row || row.type !== 'row') return null;
    return (
      <div key={row.id} className="flex gap-6">
        {row.childIds.map(renderColumn)}
      </div>
    );
  }

  const section = schema.nodes[schema.rootId];
  if (!section || section.type !== 'section') return null;

  return (
    <div className="flex flex-1 flex-col items-center overflow-auto px-6 py-10">
      <div className="w-full max-w-2xl">
        <div className="border-border bg-card rounded-lg border shadow-sm">
          <div className="border-border border-b px-6 py-5">
            <h1 className="text-foreground text-lg font-semibold">
              {section.config.title ?? 'Untitled form'}
            </h1>
          </div>
          <div className="flex flex-col gap-6 p-6">
            {section.childIds.map(renderRow)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormPreview;
