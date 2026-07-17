import { Controller } from 'react-hook-form';
import { Textarea } from '@shared/components/ui';
import type { FieldNode } from '@core/domain/entities/SchemaNode';
import type { RendererFieldProps } from '../../types';
import { getErrorMessage } from '../../types';

type TextareaNode = Extract<FieldNode, { fieldType: 'textarea' }>;

export function TextareaRendererField({ node, control, errors }: RendererFieldProps) {
  const { config } = node as TextareaNode;
  const errorMessage = getErrorMessage(errors, node.id);

  return (
    <Controller
      name={node.id}
      control={control}
      render={({ field }) => (
        <Textarea
          ref={field.ref}
          name={field.name}
          value={typeof field.value === 'string' ? field.value : ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          id={node.id}
          label={config.label}
          required={config.required}
          placeholder={config.placeholder}
          error={errorMessage}
          aria-invalid={!!errorMessage}
        />
      )}
    />
  );
}
