interface FormListFooterProps {
  shown: number;
  total: number;
}

function FormListFooter({ shown, total }: FormListFooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
      <span>
        Showing {shown} of {total} {total === 1 ? 'form' : 'forms'}
      </span>
    </div>
  );
}

export default FormListFooter;
