import type { ComponentPropsWithoutRef } from 'react';
import { Table as TablePrimitive } from '@radix-ui/themes';
import { cn } from '@shared/utils/cn';

export function Table({ className, ...props }: ComponentPropsWithoutRef<typeof TablePrimitive.Root>) {
  return <TablePrimitive.Root className={cn('w-full text-left [&_table]:w-full', className)} {...props} />;
}

export function TableHeader(props: ComponentPropsWithoutRef<typeof TablePrimitive.Header>) {
  return <TablePrimitive.Header {...props} />;
}

export function TableBody(props: ComponentPropsWithoutRef<typeof TablePrimitive.Body>) {
  return <TablePrimitive.Body {...props} />;
}

export function TableRow({ className, ...props }: ComponentPropsWithoutRef<typeof TablePrimitive.Row>) {
  return <TablePrimitive.Row className={cn('border-b border-border last:border-0', className)} {...props} />;
}

export function TableHeaderCell({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof TablePrimitive.ColumnHeaderCell>) {
  return (
    <TablePrimitive.ColumnHeaderCell
      className={cn('px-4 py-2.5 text-xs font-medium text-muted-foreground', className)}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentPropsWithoutRef<typeof TablePrimitive.Cell>) {
  return <TablePrimitive.Cell className={cn('px-4 py-3 whitespace-nowrap', className)} {...props} />;
}
