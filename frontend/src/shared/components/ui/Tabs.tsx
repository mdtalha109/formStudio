/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@shared/utils/cn';

export interface TabsProps extends TabsPrimitive.TabsProps {}

export function Tabs({ className, ...props }: TabsProps) {
  return <TabsPrimitive.Root className={cn(className)} {...props} />;
}

export interface TabsListProps extends TabsPrimitive.TabsListProps {}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn('border-border flex items-center gap-4 border-b px-4', className)}
      {...props}
    />
  );
}

export interface TabsTriggerProps extends TabsPrimitive.TabsTriggerProps {}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'text-subtle-foreground -mb-px border-b-2 border-transparent px-0.5 py-2.5 text-sm font-medium outline-none cursor-pointer',
        'data-[state=active]:border-primary data-[state=active]:text-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export interface TabsContentProps extends TabsPrimitive.TabsContentProps {}

export function TabsContent({ className, ...props }: TabsContentProps) {
  return <TabsPrimitive.Content className={cn(className)} {...props} />;
}
