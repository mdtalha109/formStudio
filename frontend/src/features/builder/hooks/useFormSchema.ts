import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFormSchema } from '@adapters/api/formSchemaApi';
import { useBuilderStore } from '@adapters/store/builderStore';

export function useFormSchema(formId: string) {
  const hydrateSchema = useBuilderStore((state) => state.hydrateSchema);

  const query = useQuery({
    queryKey: ['form-schema', formId],
    queryFn: () => getFormSchema(formId),
    enabled: !!formId,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.data) {
      hydrateSchema(query.data);
    }
  }, [query.data, hydrateSchema]);

  return query;
}
