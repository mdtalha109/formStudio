import type { Form } from '@core/domain/entities/Form';
import { useFormTable } from '../hooks/useFormTable';
import FormListToolbar from './FormListToolbar';
import FormListEmptyState from './FormListEmptyState';
import FormListFooter from './FormListFooter';
import FormTable from './FormTable';

interface FormListProps {
  forms: Form[];
}

function FormList({ forms }: FormListProps) {
  const { query, setQuery, table, filteredCount, totalCount } = useFormTable(forms);

  return (
    <div className="rounded-lg border border-border bg-card">
      <FormListToolbar count={filteredCount} query={query} onQueryChange={setQuery} />

      {filteredCount === 0 ? (
        <FormListEmptyState hasQuery={!!query} />
      ) : (
        <FormTable table={table} />
      )}

      {filteredCount > 0 && <FormListFooter shown={filteredCount} total={totalCount} />}
    </div>
  );
}

export default FormList;
