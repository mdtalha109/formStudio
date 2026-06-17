import { Type, CircleDot, Calendar, FileUp } from 'lucide-react';

const COMPONENT_ITEMS = [
  { label: 'Text Input', icon: Type },
  { label: 'Selection', icon: CircleDot },
  { label: 'Date Picker', icon: Calendar },
  { label: 'File Upload', icon: FileUp },
];

function BuilderPreviewMockup() {
  return (
    <div className="border-border bg-background overflow-hidden rounded-xl border shadow-xl">
      <div className="border-border bg-muted flex items-center gap-2 border-b px-4 py-3">
        <span className="size-3 rounded-full bg-red-400" />
        <span className="size-3 rounded-full bg-amber-400" />
        <span className="bg-primary size-3 rounded-full" />
        <span className="bg-muted text-subtle-foreground ml-3 truncate rounded-md px-3 py-1 text-xs">
          formstudio.io/editor/survey-01
        </span>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-6 p-6">
        <div className="w-36">
          <p className="text-subtle-foreground mb-3 text-xs font-medium tracking-wide uppercase">
            Components
          </p>
          <div className="flex flex-col gap-2">
            {COMPONENT_ITEMS.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="border-border bg-background text-foreground flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
              >
                <Icon className="text-primary size-4" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="border-border rounded-lg border border-dashed p-4">
          <div className="bg-primary-light mb-3 h-9 rounded-md" />
          <div className="bg-primary-light mb-3 h-9 rounded-md" />
          <div className="border-primary text-primary flex h-20 items-center justify-center rounded-md border-2 border-dashed text-sm font-medium">
            Drop field here
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuilderPreviewMockup;
