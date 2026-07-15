import { Star } from 'lucide-react';
import type { FieldNode } from '@core/domain/entities/SchemaNode';
import { Checkbox, Input, RadioGroup, Select, Textarea } from '@shared/components/ui';
import { cn } from '@shared/utils/cn';

interface PreviewFieldProps {
  node: FieldNode;
  value: unknown;
  onChange: (value: unknown) => void;
}

function PreviewField({ node, value, onChange }: PreviewFieldProps) {
  switch (node.fieldType) {
    case 'text':
      return (
        <Input
          id={node.id}
          label={node.config.label}
          type="text"
          placeholder={node.config.placeholder}
          value={String(value ?? '')}
          required={node.config.required}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case 'email':
      return (
        <Input
          id={node.id}
          label={node.config.label}
          type="email"
          placeholder={node.config.placeholder}
          value={String(value ?? '')}
          required={node.config.required}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case 'phone':
      return (
        <Input
          id={node.id}
          label={node.config.label}
          type="tel"
          placeholder={node.config.placeholder}
          value={String(value ?? '')}
          required={node.config.required}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case 'number':
      return (
        <Input
          id={node.id}
          label={node.config.label}
          type="number"
          placeholder={node.config.placeholder}
          value={String(value ?? '')}
          required={node.config.required}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        />
      );

    case 'date':
      return (
        <Input
          id={node.id}
          label={node.config.label}
          type="date"
          placeholder={node.config.placeholder}
          value={String(value ?? '')}
          required={node.config.required}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case 'textarea':
      return (
        <Textarea
          id={node.id}
          label={node.config.label}
          placeholder={node.config.placeholder}
          value={String(value ?? '')}
          required={node.config.required}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case 'checkbox':
      return (
        <Checkbox
          id={node.id}
          label={node.config.label}
          checked={Boolean(value)}
          required={node.config.required}
          onChange={(e) => onChange(e.target.checked)}
        />
      );

    case 'dropdown':
      return (
        <Select
          id={node.id}
          label={node.config.label}
          options={node.config.options}
          placeholder={node.config.placeholder ?? 'Select an option'}
          value={String(value ?? '')}
          required={node.config.required}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case 'radio':
      return (
        <RadioGroup
          legend={node.config.label}
          name={node.id}
          options={node.config.options}
          layout={node.config.layout ?? 'vertical'}
          value={String(value ?? '')}
          required={node.config.required}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case 'rating': {
      const maxStars = node.config.maxStars;
      const rating = typeof value === 'number' ? value : 0;
      return (
        <div>
          <p className="text-foreground mb-1.5 text-sm font-medium">{node.config.label}</p>
          <div className="flex gap-1">
            {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`Rate ${star} out of ${maxStars}`}
                onClick={() => onChange(rating === star ? 0 : star)}
              >
                <Star
                  className={cn(
                    'size-6 transition-colors',
                    rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground hover:text-yellow-300',
                  )}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default PreviewField;
