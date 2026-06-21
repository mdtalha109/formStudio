import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { formRepository } from '@adapters/repositories/FormRepository';

function toastError(fallbackMessage: string) {
  return (err: unknown) => {
    toast.error(err instanceof Error ? err.message : fallbackMessage);
  };
}

export function useFormActions() {
  const queryClient = useQueryClient();
  const invalidateForms = () => queryClient.invalidateQueries({ queryKey: ['forms'] });

  const createForm = useMutation({
    mutationFn: (title: string) => formRepository.createForm(title),
    onSuccess: () => {
      invalidateForms();
      toast.success('Form created');
    },
    onError: toastError('Failed to create form'),
  });

  const renameForm = useMutation({
    mutationFn: ({ formId, title }: { formId: string; title: string }) =>
      formRepository.renameForm(formId, title),
    onSuccess: () => {
      invalidateForms();
      toast.success('Form renamed');
    },
    onError: toastError('Failed to rename form'),
  });

  const deleteForm = useMutation({
    mutationFn: (formId: string) => formRepository.deleteForm(formId),
    onSuccess: () => {
      invalidateForms();
      toast.success('Form deleted');
    },
    onError: toastError('Failed to delete form'),
  });

  const duplicateForm = useMutation({
    mutationFn: (formId: string) => formRepository.duplicateForm(formId),
    onSuccess: () => {
      invalidateForms();
      toast.success('Form duplicated');
    },
    onError: toastError('Failed to duplicate form'),
  });

  const publishForm = useMutation({
    mutationFn: (formId: string) => formRepository.publishForm(formId),
    onSuccess: () => {
      invalidateForms();
      toast.success('Form published');
    },
    onError: toastError('Failed to publish form'),
  });

  const unpublishForm = useMutation({
    mutationFn: (formId: string) => formRepository.unpublishForm(formId),
    onSuccess: () => {
      invalidateForms();
      toast.success('Form unpublished');
    },
    onError: toastError('Failed to unpublish form'),
  });

  return { createForm, renameForm, deleteForm, duplicateForm, publishForm, unpublishForm };
}
