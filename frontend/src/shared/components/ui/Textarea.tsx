import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@shared/utils/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hideLabel?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hideLabel, id, className, ...props },
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
      <textarea
        id={id}
        ref={ref}
        className={cn(
          'border-border w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
});
