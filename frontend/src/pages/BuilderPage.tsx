import { useParams } from 'react-router-dom';
import BuilderCanvas from '@features/builder/components/canvas/BuilderCanvas';
import FieldSidebar from '@features/builder/components/sidebar/FieldSidebar';
import PropertiesPanel from '@features/builder/components/properties/PropertiesPanel';

function BuilderPage() {
  const { formId } = useParams<{ formId: string }>();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-border border-b px-6 py-3">
        <p className="text-muted-foreground text-xs">
          Editing form <span className="font-medium">{formId}</span>
        </p>
      </header>
      <div className="flex flex-1">
        <FieldSidebar />
        <div className="flex-1 overflow-auto">
          <BuilderCanvas />
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
}

export default BuilderPage;
