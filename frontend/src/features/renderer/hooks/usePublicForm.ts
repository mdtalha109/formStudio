import { useQuery } from '@tanstack/react-query';
import { getPublicForm } from '@adapters/api/publicFormApi';

export function usePublicForm(slug: string) {
  return useQuery({
    queryKey: ['public-form', slug],
    queryFn: () => getPublicForm(slug),
    enabled: !!slug,
    staleTime: Infinity,
  });
}
