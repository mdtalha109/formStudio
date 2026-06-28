import type { LucideIcon } from 'lucide-react';

interface FieldPaletteItemProps {
  displayName: string;
  icon: LucideIcon;
  onClick: () => void;
}

function FieldPaletteItem({ displayName, icon: Icon, onClick }: FieldPaletteItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-foreground hover:bg-background group flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors"
    >
      <Icon className="text-muted-foreground group-hover:text-foreground size-4 shrink-0" strokeWidth={1.75} />
      <span className="truncate font-medium">{displayName}</span>
    </button>
  );
}

export default FieldPaletteItem;
