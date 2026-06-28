import type { FormStatus } from '@core/domain/entities/Form';

interface FormStatusBadgeProps {
  status: FormStatus;
}

function FormStatusBadge({ status }: FormStatusBadgeProps) {
  const isPublished = status === 'published';

  return (
    <span
      className={
        isPublished
          ? 'inline-flex items-center gap-1.5 rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success'
          : 'inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground'
      }
    >
      <span
        className={
          isPublished ? 'size-1.5 rounded-full bg-success' : 'size-1.5 rounded-full bg-muted-foreground/50'
        }
      />
      {isPublished ? 'Published' : 'Draft'}
    </span>
  );
}

export default FormStatusBadge;
