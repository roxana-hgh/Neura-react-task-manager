import TaskForm from "./TaskForm";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function EditTask({ task, onUpdate }) {
  const [openModal, setOpenModal] = useState(false);

  const EditHandler = (data) => {
    onUpdate(task.id, data);
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setOpenModal(true);
          }}
        >
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <TaskForm
          initialValues={task}
          submitLabel="Update Task"
          onSubmit={EditHandler}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditTask;
