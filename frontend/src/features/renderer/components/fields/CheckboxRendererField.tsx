import { Controller } from 'react-hook-form';
import { Checkbox } from '@shared/components/ui';
import type { FieldNode } from '@core/domain/entities/SchemaNode';
import type { RendererFieldProps } from '../../types';
import { getErrorMessage } from '../../types';

type CheckboxNode = Extract<FieldNode, { fieldType: 'checkbox' }>;

export function CheckboxRendererField({ node, control, errors }: RendererFieldProps) {
  const { config } = node as CheckboxNode;
  const errorMessage = getErrorMessage(errors, node.id);

  return (
    <Controller
      name={node.id}
      control={control}
      render={({ field }) => (
        <div>
          <Checkbox
            ref={field.ref}
            name={field.name}
            id={node.id}
            label={config.label}
            required={config.required}
            checked={Boolean(field.value)}
            onChange={(e) => field.onChange(e.target.checked)}
            onBlur={field.onBlur}
            aria-invalid={!!errorMessage}
          />
          {errorMessage && <p className="text-danger mt-1 text-sm">{errorMessage}</p>}
        </div>
      )}
    />
  );
}
