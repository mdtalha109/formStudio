import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@shared/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, className, ...props },
  ref,
) {
  return (
    <div>
      <label htmlFor={id} className="text-foreground mb-1 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className={cn(
          'border-border b w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
});
