import { useQuery } from '@tanstack/react-query';
import { formRepository } from '@adapters/repositories/FormRepository';

export function useForms() {
  return useQuery({
    queryKey: ['forms'],
    queryFn: () => formRepository.listForms(),
  });
}
