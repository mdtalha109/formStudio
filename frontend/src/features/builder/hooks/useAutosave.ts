import { useEffect, useRef, useState } from 'react';
import { saveFormSchema } from '@adapters/api/formSchemaApi';
import { useBuilderStore } from '@adapters/store/builderStore';
import type { NormalizedSchema } from '@core/domain/entities/SchemaNode';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const DEBOUNCE_MS = 1500;

export function useAutosave(formId: string, serverSchema: NormalizedSchema | undefined): SaveStatus {
  const schema = useBuilderStore((state) => state.schema);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const lastSavedRef = useRef<NormalizedSchema | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (serverSchema) {
      lastSavedRef.current = serverSchema;
    }
  }, [serverSchema]);

  useEffect(() => {
    // No baseline yet (server schema not loaded) or schema unchanged — skip.
    if (!lastSavedRef.current || schema === lastSavedRef.current) return;

    setSaveStatus('saving');
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      try {
        await saveFormSchema(formId, schema);
        lastSavedRef.current = schema;
        setSaveStatus('saved');
      } catch {
        setSaveStatus('error');
      }
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [schema, formId]);

  return saveStatus;
}
