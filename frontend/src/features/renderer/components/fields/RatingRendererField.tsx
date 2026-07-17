import { Controller } from 'react-hook-form';
import { Star } from 'lucide-react';
import type { FieldNode } from '@core/domain/entities/SchemaNode';
import type { RendererFieldProps } from '../../types';
import { getErrorMessage } from '../../types';

type RatingNode = Extract<FieldNode, { fieldType: 'rating' }>;

export function RatingRendererField({ node, control, errors }: RendererFieldProps) {
  const { config } = node as RatingNode;
  const errorMessage = getErrorMessage(errors, node.id);

  return (
    <Controller
      name={node.id}
      control={control}
      render={({ field }) => {
        const currentRating = typeof field.value === 'number' ? field.value : 0;
        return (
          <fieldset>
            <legend className="text-foreground mb-1.5 text-sm font-medium">
              {config.label}
              {config.required && (
                <span className="text-danger ml-0.5" aria-hidden="true">
                  *
                </span>
              )}
            </legend>
            <div className="flex gap-1">
              {Array.from({ length: config.maxStars }, (_, i) => i + 1).map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`Rate ${star} out of ${config.maxStars}`}
                  aria-pressed={currentRating >= star}
                  onClick={() => field.onChange(currentRating === star ? 0 : star)}
                  onBlur={field.onBlur}
                  className="rounded text-muted-foreground transition-colors hover:text-amber-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <Star
                    size={24}
                    strokeWidth={1.5}
                    className={currentRating >= star ? 'fill-amber-400 text-amber-400' : ''}
                  />
                </button>
              ))}
            </div>
            {errorMessage && <p className="text-danger mt-1 text-sm">{errorMessage}</p>}
          </fieldset>
        );
      }}
    />
  );
}
