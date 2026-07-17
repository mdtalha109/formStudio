import { useParams } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import { usePublicForm } from '@features/renderer/hooks/usePublicForm';
import { FormRenderer } from '@features/renderer/components/FormRenderer';

function PublicFormPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = usePublicForm(slug ?? '');

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-background flex min-h-screen flex-col items-center justify-center gap-3">
        <AlertCircle className="text-muted-foreground size-8" strokeWidth={1.5} />
        <p className="text-foreground font-medium">Form not found</p>
        <p className="text-muted-foreground text-sm">
          This form doesn't exist or is no longer available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="border-border border-b pb-6 mb-6">
          <h1 className="text-foreground text-xl font-semibold">{data.title}</h1>
        </div>
        <FormRenderer data={data} />
      </div>
    </div>
  );
}

export default PublicFormPage;
