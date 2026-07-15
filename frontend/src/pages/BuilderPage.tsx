import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertCircle, Check, ChevronLeft, Eye, EyeOff, Loader2, Redo2, Undo2 } from 'lucide-react';
import BuilderCanvas from '@features/builder/components/canvas/BuilderCanvas';
import FieldSidebar from '@features/builder/components/sidebar/FieldSidebar';
import PropertiesPanel from '@features/builder/components/properties/PropertiesPanel';
import FormPreview from '@features/builder/components/preview/FormPreview';
import BuilderDndProvider from '@features/builder/dnd/BuilderDndProvider';
import { useAutosave } from '@features/builder/hooks/useAutosave';
import { useFormSchema } from '@features/builder/hooks/useFormSchema';
import { useSelection } from '@features/builder/hooks/useSelection';
import { useUndoRedo } from '@features/builder/hooks/useUndoRedo';
import { FormStatusBadge, useForms } from '@features/forms';
import { Button } from '@shared/components/ui';
import { ROUTES } from '@app/router/routes';
import type { SaveStatus } from '@features/builder/hooks/useAutosave';

function SaveStatusIndicator({ status }: { status: SaveStatus }) {
  if (status === 'idle') return null;

  return (
    <div className="flex items-center gap-1.5 text-xs">
      {status === 'saving' && (
        <>
          <Loader2 className="text-muted-foreground size-3 animate-spin" />
          <span className="text-muted-foreground">Saving...</span>
        </>
      )}
      {status === 'saved' && (
        <>
          <Check className="text-muted-foreground size-3" />
          <span className="text-muted-foreground">Saved</span>
        </>
      )}
      {status === 'error' && (
        <>
          <AlertCircle className="text-danger size-3" />
          <span className="text-danger">Save failed</span>
        </>
      )}
    </div>
  );
}

function BuilderPage() {
  const { formId } = useParams<{ formId: string }>();
  const { data: forms } = useForms();
  const { selectedNodeId } = useSelection();
  const form = forms?.find((candidate) => candidate.id === formId);

  const { data: serverSchema, isLoading, isError } = useFormSchema(formId ?? '');
  const saveStatus = useAutosave(formId ?? '', serverSchema);
  const { undo, redo, canUndo, canRedo } = useUndoRedo();
  const [isPreview, setIsPreview] = useState(false);

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
        <div className="ml-auto flex items-center gap-1">
          <Button
            type="button"
            variant={isPreview ? 'secondary' : 'ghost'}
            size="icon"
            aria-label={isPreview ? 'Exit preview' : 'Preview form'}
            onClick={() => setIsPreview((prev) => !prev)}
          >
            {isPreview ? (
              <EyeOff className="size-4" strokeWidth={1.75} />
            ) : (
              <Eye className="size-4" strokeWidth={1.75} />
            )}
          </Button>
          <div className="bg-border mx-1 h-5 w-px" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Undo"
            disabled={!canUndo || isPreview}
            onClick={undo}
          >
            <Undo2 className="size-4" strokeWidth={1.75} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Redo"
            disabled={!canRedo || isPreview}
            onClick={redo}
          >
            <Redo2 className="size-4" strokeWidth={1.75} />
          </Button>
          <div className="bg-border mx-1 h-5 w-px" />
          <SaveStatusIndicator status={saveStatus} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {isPreview ? (
          <FormPreview />
        ) : (
          <>
            <BuilderDndProvider>
              <FieldSidebar />
              <div className="flex-1 overflow-auto bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)] bg-[size:20px_20px]">
                {isLoading && (
                  <div className="flex h-full items-center justify-center">
                    <Loader2 className="text-muted-foreground size-5 animate-spin" />
                  </div>
                )}
                {isError && (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground text-sm">Failed to load form schema.</p>
                  </div>
                )}
                {!isLoading && !isError && <BuilderCanvas />}
              </div>
            </BuilderDndProvider>
            <PropertiesPanel key={selectedNodeId} />
          </>
        )}
      </div>
    </div>
  );
}

export default BuilderPage;
