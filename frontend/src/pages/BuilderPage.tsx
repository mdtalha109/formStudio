import { useParams } from 'react-router-dom';

function BuilderPage() {
  const { formId } = useParams<{ formId: string }>();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 px-6 text-center">
      <h1 className="text-foreground text-2xl font-bold">Builder coming soon</h1>
      <p className="text-muted-foreground text-sm">
        The drag-and-drop builder for form <span className="font-medium">{formId}</span> is
        on its way in the next phase.
      </p>
    </div>
  );
}

export default BuilderPage;
