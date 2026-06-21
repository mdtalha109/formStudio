import { useState } from 'react';
import { getCoreRowModel, getSortedRowModel, useReactTable, type SortingState } from '@tanstack/react-table';
import type { Form } from '@core/domain/entities/Form';
import { formColumns } from '../components/formColumns';
import { useFormSearch } from './useFormSearch';

export function useFormTable(forms: Form[]) {
  const { query, setQuery, filtered } = useFormSearch(forms);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'updatedAt', desc: true }]);

  const table = useReactTable({
    data: filtered,
    columns: formColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return { query, setQuery, table, filteredCount: filtered.length, totalCount: forms.length };
}
