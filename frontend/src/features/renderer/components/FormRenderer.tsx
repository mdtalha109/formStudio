import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { buildZodSchema } from '@core/usecases/renderer/buildZodSchema';
import { resolveVisibility } from '@core/usecases/conditions/resolveVisibility';
import { submitForm } from '@adapters/api/publicFormApi';
import { rendererRegistry } from '../registry/rendererRegistry';
import { Button } from '@shared/components/ui';
import type { PublicFormData } from '@adapters/api/publicFormApi';
import type { FieldNode, NormalizedSchema } from '@core/domain/entities/SchemaNode';
import type { FormValues } from '../types';

interface FormRendererProps {
  data: PublicFormData;
}

function buildDefaultValues(schema: NormalizedSchema): FormValues {
  const defaults: FormValues = {};
  for (const node of Object.values(schema.nodes)) {
    if (node.type !== 'field') continue;
    switch (node.fieldType) {
      case 'checkbox':
        defaults[node.id] = false;
        break;
      case 'rating':
        defaults[node.id] = 0;
        break;
      default:
        defaults[node.id] = '';
    }
  }
  return defaults;
}

export function FormRenderer({ data }: FormRendererProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const zodSchema = useMemo(() => buildZodSchema(data.schema), [data.schema]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(zodSchema),
    defaultValues: buildDefaultValues(data.schema),
  });

  const watchedValues = watch();

  function isFieldVisible(node: FieldNode): boolean {
    const rule = node.config.visibilityRule;
    if (!rule) return true;
    return resolveVisibility(rule, watchedValues);
  }

  function rowHasVisibleFields(rowId: string): boolean {
    const row = data.schema.nodes[rowId];
    if (!row || row.type !== 'row') return false;
    return row.childIds.some((colId) => {
      const col = data.schema.nodes[colId];
      if (!col || col.type !== 'column') return false;
      return col.childIds.some((fieldId) => {
        const field = data.schema.nodes[fieldId];
        return field?.type === 'field' && isFieldVisible(field as FieldNode);
      });
    });
  }

  async function onSubmit(values: FormValues): Promise<void> {
    setSubmitError(null);
    try {
      await submitForm(data.slug, values);
      setIsSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    }
  }

  if (isSubmitted) {
    return (
      <div className="border-border bg-card rounded-lg border shadow-sm">
        <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
          <CheckCircle2 className="size-12 text-green-500" strokeWidth={1.5} />
          <div>
            <p className="text-foreground font-semibold">Response submitted</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Thank you for completing this form.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const root = data.schema.nodes[data.schema.rootId];
  if (!root || root.type !== 'section') return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-6">
        <div className="border-border bg-card rounded-lg border shadow-sm">
          {root.config.title && (
            <div className="border-border border-b px-6 py-4">
              <h2 className="text-foreground text-base font-semibold">{root.config.title}</h2>
            </div>
          )}
          <div className="flex flex-col gap-5 p-6">
            {root.childIds.map((rowId) => {
              if (!rowHasVisibleFields(rowId)) return null;
              const row = data.schema.nodes[rowId];
              if (!row || row.type !== 'row') return null;

              return (
                <div key={rowId} className="flex gap-4">
                  {row.childIds.map((columnId) => {
                    const column = data.schema.nodes[columnId];
                    if (!column || column.type !== 'column') return null;

                    const visibleFields = column.childIds
                      .map((id) => data.schema.nodes[id])
                      .filter((n): n is FieldNode => !!n && n.type === 'field' && isFieldVisible(n));

                    if (visibleFields.length === 0) return null;

                    return (
                      <div key={columnId} className="flex flex-1 flex-col gap-4">
                        {visibleFields.map((field) => {
                          const FieldComponent = rendererRegistry[field.fieldType];
                          return (
                            <FieldComponent
                              key={field.id}
                              node={field}
                              control={control}
                              errors={errors}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {submitError && <p className="text-danger text-sm">{submitError}</p>}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            leftIcon={isSubmitting ? <Loader2 className="size-4 animate-spin" /> : undefined}
          >
            {isSubmitting ? 'Submitting…' : 'Submit'}
          </Button>
        </div>
      </div>
    </form>
  );
}
