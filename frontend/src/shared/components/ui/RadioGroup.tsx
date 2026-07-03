import type { InputHTMLAttributes } from 'react';
import { cn } from '@shared/utils/cn';

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  legend: string;
  options: RadioOption[];
  layout?: 'vertical' | 'horizontal';
  error?: string;
}

export function RadioGroup({
  legend,
  options,
  layout = 'vertical',
  error,
  required,
  name,
  className,
  ...props
}: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="text-foreground mb-1.5 text-sm font-medium">
        {legend}
        {required && (
          <span className="text-danger ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div className={cn('flex', layout === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-1.5', className)}>
        {options.map((opt) => (
          <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="radio" name={name} value={opt.value} className="accent-primary" {...props} />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </fieldset>
  );
}
