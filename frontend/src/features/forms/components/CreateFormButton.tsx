import { useState } from 'react';
import { Plus } from 'lucide-react';
import CreateFormModal from './CreateFormModal';
import { Button } from '@shared/components/ui';

function CreateFormButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        leftIcon={<Plus className="size-4 text-white" />}
      >
       
        <span className="text-white text-sm font-semibold">Create New Form</span>
      </Button>
      <CreateFormModal open={open} onOpenChange={setOpen} />
    </>
  );
}

export default CreateFormButton;
