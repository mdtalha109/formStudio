import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { createColumnHelper } from '@tanstack/react-table';
import type { Form } from '@core/domain/entities/Form';
import { buildBuilderPath } from '@app/router/routes';
import FormCardMenu from './FormCardMenu';
import FormStatusBadge from './FormStatusBadge';

function formatRelativeDate(iso: string): string {
  const diffHours = Math.round((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60));
  if (diffHours < 1) return 'just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const columnHelper = createColumnHelper<Form>();

export const formColumns = [
  columnHelper.accessor('title', {
    header: 'Name',
    cell: ({ row }) => (
      <Link
        to={buildBuilderPath(row.original.id)}
        className="flex items-center gap-3 group-hover:text-primary"
      >
        <FileText className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
        <span className="truncate text-sm font-medium text-foreground">{row.original.title}</span>
      </Link>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ row }) => <FormStatusBadge status={row.original.status} />,
  }),
  columnHelper.display({
    id: 'submissions',
    header: 'Submissions',
    cell: () => (
      // TODO: wire up real submission count
      <span className="text-sm text-muted-foreground tabular-nums">&mdash;</span>
    ),
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Updated',
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">{formatRelativeDate(getValue())}</span>
    ),
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className="text-right">
        <FormCardMenu form={row.original} />
      </div>
    ),
  }),
];
