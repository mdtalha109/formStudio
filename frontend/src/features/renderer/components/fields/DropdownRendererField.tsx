import { Controller } from 'react-hook-form';
import { Select } from '@shared/components/ui';
import type { FieldNode } from '@core/domain/entities/SchemaNode';
import type { RendererFieldProps } from '../../types';
import { getErrorMessage } from '../../types';

type DropdownNode = Extract<FieldNode, { fieldType: 'dropdown' }>;

export function DropdownRendererField({ node, control, errors }: RendererFieldProps) {
  const { config } = node as DropdownNode;
  const errorMessage = getErrorMessage(errors, node.id);

  return (
    <Controller
      name={node.id}
      control={control}
      render={({ field }) => (
        <Select
          ref={field.ref}
          name={field.name}
          id={node.id}
          label={config.label}
          required={config.required}
          placeholder={config.placeholder}
          options={config.options}
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
