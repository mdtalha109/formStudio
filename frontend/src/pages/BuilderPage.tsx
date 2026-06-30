import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import BuilderCanvas from '@features/builder/components/canvas/BuilderCanvas';
import FieldSidebar from '@features/builder/components/sidebar/FieldSidebar';
import PropertiesPanel from '@features/builder/components/properties/PropertiesPanel';
import BuilderDndProvider from '@features/builder/dnd/BuilderDndProvider';
import { FormStatusBadge, useForms } from '@features/forms';
import { ROUTES } from '@app/router/routes';
import { useSelection } from '@features/builder/hooks/useSelection';

function BuilderPage() {
  const { formId } = useParams<{ formId: string }>();
  const { data: forms } = useForms();
  const { selectedNodeId } = useSelection();
  const form = forms?.find((candidate) => candidate.id === formId);

  return (
    <div className="bg-background flex h-screen flex-col">
      <header className="border-border bg-card flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <Link
          to={ROUTES.DASHBOARD}
          aria-label="Back to dashboard"
          className="text-muted-foreground hover:bg-muted hover:text-foreground -ml-1 inline-flex size-8 items-center justify-center rounded-md"
        >
          <ChevronLeft className="size-4" />
        </Link>
        <div className="bg-border h-5 w-px" />
        <div className="flex min-w-0 items-center gap-2">
          <h1 className="text-foreground truncate text-sm font-semibold">
            {form?.title ?? 'Untitled form'}
          </h1>
          {form && <FormStatusBadge status={form.status} />}
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <BuilderDndProvider>
          <FieldSidebar />
          <div
            className="flex-1 overflow-auto bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)] bg-[size:20px_20px]"
          >
            <BuilderCanvas />
          </div>
        </BuilderDndProvider>
        <PropertiesPanel key={selectedNodeId} />
      </div>
    </div>
  );
}

export default BuilderPage;
