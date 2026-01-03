import { useState } from "react";
import TaskForm from "./TaskForm";
import { Button } from "@/components/ui/button";

import {
  Dialog,
 
  DialogContent,
  DialogDescription,
 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";

function AddNewTask({ onAddTask }) {
  const [openModal, setOpenModal] = useState(false);
 

  const submitHandler = (data) => {
   onAddTask({
              ...data,
              id: crypto.randomUUID(),
              completed: false,
              created_at: new Date().toISOString().split("T")[0],
            });
    setOpenModal(false);
  };
 

  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button type="submit" size="sm" variant="default">
            Add <Plus />
          </Button>
        </DialogTrigger>
        
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Fill the form below to add a new task.
              </DialogDescription>
            </DialogHeader>
            <TaskForm
          submitLabel="Add Task"
          onSubmit={submitHandler}
        />
          </DialogContent>
        
      </Dialog>
    </>
  );
}

export default AddNewTask;
