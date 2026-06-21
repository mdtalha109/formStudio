import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import type { Form } from '@core/domain/entities/Form';
import { DropdownMenu } from '@shared/components/ui';
import type { DropdownMenuItemConfig } from '@shared/components/ui';
import { useFormActions } from '../hooks/useFormActions';
import RenameFormModal from './RenameFormModal';
import DeleteFormDialog from './DeleteFormDialog';

interface FormCardMenuProps {
  form: Form;
}

function FormCardMenu({ form }: FormCardMenuProps) {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { duplicateForm, publishForm, unpublishForm } = useFormActions();

  const items: DropdownMenuItemConfig[] = [
    { label: 'Rename', onSelect: () => setRenameOpen(true) },
    { label: 'Duplicate', onSelect: () => duplicateForm.mutate(form.id) },
    form.status === 'published'
      ? { label: 'Unpublish', onSelect: () => unpublishForm.mutate(form.id) }
      : { label: 'Publish', onSelect: () => publishForm.mutate(form.id) },
    { label: 'Delete', onSelect: () => setDeleteOpen(true), destructive: true },
  ];

  return (
    <>
      <DropdownMenu
        trigger={
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="text-subtle-foreground hover:text-foreground hover:bg-muted cursor-pointer rounded-md p-1"
            aria-label="Form actions"
          >
            <MoreVertical className="size-4" />
          </button>
        }
        items={items}
      />
      <RenameFormModal form={form} open={renameOpen} onOpenChange={setRenameOpen} />
      <DeleteFormDialog form={form} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </>
  );
}

export default FormCardMenu;
