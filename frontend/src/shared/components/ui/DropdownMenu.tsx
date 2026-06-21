import type { ReactNode } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@shared/utils/cn';

export interface DropdownMenuItemConfig {
  label: string;
  onSelect: () => void;
  destructive?: boolean;
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuItemConfig[];
}

export function DropdownMenu({ trigger, items }: DropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          className="DropdownMenuContent mt-2 border-border bg-background min-w-[160px] rounded-md border shadow-lg"
        >
          {items.map((item) => (
            <DropdownMenuPrimitive.Item
              key={item.label}
              onSelect={item.onSelect}
              className={cn(
                'cursor-pointer px-3 py-2 text-sm outline-none ',
                item.destructive
                  ? 'text-danger hover:bg-muted'
                  : 'text-foreground hover:bg-[#eff6ff]',
              )}
            >
              {item.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
