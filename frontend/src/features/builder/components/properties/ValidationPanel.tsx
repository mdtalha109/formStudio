import { useState } from 'react';
import { useBuilderStore } from '@adapters/store/builderStore';
import type { FieldConfigPatch, FieldNode } from '@core/domain/entities/SchemaNode';
import { Input } from '@shared/components/ui';
import { validationConfig } from './validationConfig';

interface ValidationPanelProps {
  node: FieldNode;
}

function ValidationPanel({ node }: ValidationPanelProps) {
  const updateNodeConfig = useBuilderStore((state) => state.updateNodeConfig);
  const fields = validationConfig[node.fieldType] ?? [];

  const [values, setValues] = useState<Record<string, string>>(() => {
    const config = node.config as unknown as Record<string, unknown>;
    return Object.fromEntries(
      fields.map((f) => [f.key, config[f.key] != null ? String(config[f.key]) : '']),
    );
  });

  if (fields.length === 0) {
    return (
      <p className="text-muted-foreground px-4 py-6 text-sm">
        No validation rules are available for this field type.
      </p>
    );
  }

  const handleBlur = (key: string, inputType: 'number' | 'text') => {
    const raw = values[key];
    // Empty string → clear the config key (set to undefined)
    const value = raw === '' ? undefined : inputType === 'number' ? Number(raw) : raw;
    updateNodeConfig(node.id, { [key]: value } as FieldConfigPatch);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {fields.map((field) => (
        <Input
          key={field.key}
          id={`validation-${field.key}`}
          label={field.label}
          type={field.inputType}
          placeholder={field.placeholder}
          value={values[field.key]}
          onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
          onBlur={() => handleBlur(field.key, field.inputType)}
        />
      ))}
    </div>
  );
}

export default ValidationPanel;
