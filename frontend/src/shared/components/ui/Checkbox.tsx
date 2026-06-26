import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@shared/utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  hideLabel?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, hideLabel, id, className, ...props },
  ref,
) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm text-foreground">
      <input
        id={id}
        ref={ref}
        type="checkbox"
        className={cn(
          'size-4 rounded border-border text-primary outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      <span className={hideLabel ? 'sr-only' : undefined}>{label}</span>
    </label>
  );
});
