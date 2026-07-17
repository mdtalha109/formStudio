import { Controller } from 'react-hook-form';
import { RadioGroup } from '@shared/components/ui';
import type { FieldNode } from '@core/domain/entities/SchemaNode';
import type { RendererFieldProps } from '../../types';
import { getErrorMessage } from '../../types';

type RadioNode = Extract<FieldNode, { fieldType: 'radio' }>;

export function RadioRendererField({ node, control, errors }: RendererFieldProps) {
  const { config } = node as RadioNode;
  const errorMessage = getErrorMessage(errors, node.id);

  return (
    <Controller
      name={node.id}
      control={control}
      render={({ field }) => (
        <RadioGroup
          name={field.name}
          legend={config.label}
          required={config.required}
          options={config.options}
          layout={config.layout}
          value={typeof field.value === 'string' ? field.value : ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={errorMessage}
          aria-invalid={!!errorMessage}
        />
      )}
    />
  );
}
