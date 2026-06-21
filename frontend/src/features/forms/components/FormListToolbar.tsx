import { Search } from 'lucide-react';
import { Input } from '@shared/components/ui';
import CreateFormButton from './CreateFormButton';

interface FormListToolbarProps {
  count: number;
  query: string;
  onQueryChange: (query: string) => void;
}

function FormListToolbar({ count, query, onQueryChange }: FormListToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold text-foreground">Forms</h2>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {count}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Input
          id="form-search"
          label="Search forms"
          hideLabel
          leftIcon={<Search className="size-3.5" />}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search forms..."
          className="w-56 text-sm"
        />
        <CreateFormButton />
      </div>
    </div>
  );
}

export default FormListToolbar;
