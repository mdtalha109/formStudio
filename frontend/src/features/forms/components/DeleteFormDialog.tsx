import type { Form } from '@core/domain/entities/Form';
import { Modal, Button } from '@shared/components/ui';
import { useFormActions } from '../hooks/useFormActions';

interface DeleteFormDialogProps {
  form: Form;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteFormDialog({ form, open, onOpenChange }: DeleteFormDialogProps) {
  const { deleteForm } = useFormActions();

  const handleDelete = async () => {
    await deleteForm.mutateAsync(form.id);
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Delete Form">
      <p className="text-muted-foreground text-sm">
        Are you sure you want to delete{' '}
        <span className="text-foreground font-medium">{form.title}</span>? This cannot be
        undone.
      </p>
      <div className="mt-4 flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleDelete}
          disabled={deleteForm.isPending}
        >
          {deleteForm.isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteFormDialog;
