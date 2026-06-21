import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Form } from '@core/domain/entities/Form';
import { Modal, Button, Input } from '@shared/components/ui';
import { useFormActions } from '../hooks/useFormActions';

interface RenameFormModalProps {
  form: Form;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function RenameFormModal({ form, open, onOpenChange }: RenameFormModalProps) {
  const [title, setTitle] = useState(form.title);
  const { renameForm } = useFormActions();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    await renameForm.mutateAsync({ formId: form.id, title: title.trim() });
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Rename Form">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="rename-form-title"
          label="Form title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <Button type="submit" disabled={renameForm.isPending || !title.trim()}>
          {renameForm.isPending ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Modal>
  );
}

export default RenameFormModal;
