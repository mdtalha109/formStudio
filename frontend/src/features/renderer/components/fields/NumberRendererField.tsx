import { Controller } from 'react-hook-form';
import { Input } from '@shared/components/ui';
import type { FieldNode } from '@core/domain/entities/SchemaNode';
import type { RendererFieldProps } from '../../types';
import { getErrorMessage } from '../../types';

type NumberNode = Extract<FieldNode, { fieldType: 'number' }>;

export function NumberRendererField({ node, control, errors }: RendererFieldProps) {
  const { config } = node as NumberNode;
  const errorMessage = getErrorMessage(errors, node.id);

  return (
    <Controller
      name={node.id}
      control={control}
      render={({ field }) => (
        <Input
          ref={field.ref}
          name={field.name}
          value={typeof field.value === 'number' || typeof field.value === 'string' ? field.value : ''}
          onChange={(e) => {
            const parsed = e.target.valueAsNumber;
            field.onChange(Number.isNaN(parsed) ? '' : parsed);
          }}
          onBlur={field.onBlur}
          id={node.id}
          label={config.label}
          required={config.required}
          placeholder={config.placeholder}
          type="number"
          min={config.min}
          max={config.max}
          step={config.step}
          error={errorMessage}
          aria-invalid={!!errorMessage}
        />
      )}
    />
  );
}
