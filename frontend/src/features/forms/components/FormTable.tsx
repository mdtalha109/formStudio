import { ArrowUpDown } from 'lucide-react';
import { flexRender, type Table as ReactTable } from '@tanstack/react-table';
import type { Form } from '@core/domain/entities/Form';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@shared/components/ui';

interface FormTableProps {
  table: ReactTable<Form>;
}

function FormTable({ table }: FormTableProps) {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const isSortable = header.column.getCanSort();
              const sortDirection = header.column.getIsSorted();
              return (
                <TableHeaderCell key={header.id}>
                  {isSortable ? (
                    <button
                      onClick={header.column.getToggleSortingHandler()}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <ArrowUpDown
                        className={`size-3 ${
                          sortDirection ? 'text-foreground' : 'text-muted-foreground/40'
                        } ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
                      />
                    </button>
                  ) : (
                    flexRender(header.column.columnDef.header, header.getContext())
                  )}
                </TableHeaderCell>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} className="group hover:bg-muted/40">
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default FormTable;
