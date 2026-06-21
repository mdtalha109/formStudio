import { useState } from 'react';
import type { FormEvent } from 'react';
import { Modal, Button, Input } from '@shared/components/ui';
import { useFormActions } from '../hooks/useFormActions';

interface CreateFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateFormModal({ open, onOpenChange }: CreateFormModalProps) {
  const [title, setTitle] = useState('');
  const { createForm } = useFormActions();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    await createForm.mutateAsync(title.trim());
    setTitle('');
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Create New Form">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="create-form-title"
          label="Form title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <Button type="submit" disabled={createForm.isPending || !title.trim()}>
          {createForm.isPending ? 'Creating...' : 'Create Form'}
        </Button>
      </form>
    </Modal>
  );
}

export default CreateFormModal;
