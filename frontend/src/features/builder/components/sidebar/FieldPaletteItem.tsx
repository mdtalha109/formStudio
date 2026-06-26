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
      className="text-foreground hover:bg-muted flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium"
    >
      <Icon className="text-muted-foreground size-4" />
      {displayName}
    </button>
  );
}

export default FieldPaletteItem;
