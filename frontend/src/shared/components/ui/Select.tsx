import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { cn } from '@shared/utils/cn';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hideLabel?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, error, hideLabel, id, className, ...props },
  ref,
) {
  return (
    <div>
      <label
        htmlFor={id}
        className={hideLabel ? 'sr-only' : 'text-foreground mb-1 block text-sm font-medium'}
      >
        {label}
      </label>
      <select
        id={id}
        ref={ref}
        className={cn(
          'border-border w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none',
          'focus:ring-1 focus:ring-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
});
