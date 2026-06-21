import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hideLabel?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hideLabel, leftIcon, rightIcon, id, className, ...props },
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
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-2.5 top-1/2 inline-flex -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </span>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            'border-border b w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
            !!leftIcon && 'pl-8',
            !!rightIcon && 'pr-8',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
});
