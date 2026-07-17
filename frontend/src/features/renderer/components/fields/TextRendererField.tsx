import { Controller } from 'react-hook-form';
import { Input } from '@shared/components/ui';
import type { FieldNode } from '@core/domain/entities/SchemaNode';
import type { RendererFieldProps } from '../../types';
import { getErrorMessage } from '../../types';

type TextNode = Extract<FieldNode, { fieldType: 'text' }>;

export function TextRendererField({ node, control, errors }: RendererFieldProps) {
  const { config } = node as TextNode;
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
          type="text"
          error={errorMessage}
          aria-invalid={!!errorMessage}
        />
      )}
    />
  );
}
