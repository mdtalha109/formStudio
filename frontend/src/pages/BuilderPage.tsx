import { useParams } from 'react-router-dom';
import BuilderCanvas from '@features/builder/components/canvas/BuilderCanvas';

function BuilderPage() {
  const { formId } = useParams<{ formId: string }>();

  return (
    <div className="min-h-screen">
      <header className="border-border border-b px-6 py-3">
        <p className="text-muted-foreground text-xs">
          Editing form <span className="font-medium">{formId}</span>
        </p>
      </header>
      <BuilderCanvas />
    </div>
  );
}

export default BuilderPage;
