import { useParams } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import { usePublicForm } from '@features/renderer/hooks/usePublicForm';

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
        {/* FormRenderer mounts here in 6-D */}
        <div className="border-border bg-card rounded-lg border shadow-sm">
          <div className="border-border border-b px-6 py-5">
            <h1 className="text-foreground text-lg font-semibold">{data.title}</h1>
          </div>
          <div className="px-6 py-8">
            <p className="text-muted-foreground text-sm">Form renderer coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicFormPage;
