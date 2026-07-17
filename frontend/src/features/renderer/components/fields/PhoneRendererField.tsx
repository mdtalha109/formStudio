import { Controller } from 'react-hook-form';
import { Input } from '@shared/components/ui';
import type { FieldNode } from '@core/domain/entities/SchemaNode';
import type { RendererFieldProps } from '../../types';
import { getErrorMessage } from '../../types';

type PhoneNode = Extract<FieldNode, { fieldType: 'phone' }>;

export function PhoneRendererField({ node, control, errors }: RendererFieldProps) {
  const { config } = node as PhoneNode;
  const errorMessage = getErrorMessage(errors, node.id);

  return (
    <Controller
      name={node.id}
      control={control}
      render={({ field }) => (
        <Input
          ref={field.ref}
          name={field.name}
          value={typeof field.value === 'string' ? field.value : ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          id={node.id}
          label={config.label}
          required={config.required}
          placeholder={config.placeholder}
          type="tel"
          error={errorMessage}
          aria-invalid={!!errorMessage}
        />
      )}
    />
  );
}
