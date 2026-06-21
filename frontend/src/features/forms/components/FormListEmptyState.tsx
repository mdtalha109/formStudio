interface FormListEmptyStateProps {
  hasQuery: boolean;
}

function FormListEmptyState({ hasQuery }: FormListEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-16 text-center">
      <p className="text-sm font-medium text-foreground">
        {hasQuery ? 'No matching forms' : 'No forms yet'}
      </p>
      <p className="text-xs text-muted-foreground">
        {hasQuery ? 'Try a different search term.' : 'Create your first form to get started.'}
      </p>
    </div>
  );
}

export default FormListEmptyState;
