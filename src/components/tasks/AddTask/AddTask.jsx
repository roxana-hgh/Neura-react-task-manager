import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { ChevronDownIcon } from "lucide-react";

function AddNewTask(prop) {
  const [openModal, setOpenModal] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(undefined);

  const addTaskHandler = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const piority = formData.get("piority");
    const due_date = date;
    const description = formData.get("description");
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      piority,
      due_date: due_date ? new Date(due_date.getTime() - due_date.getTimezoneOffset() * 60000).toISOString().split("T")[0] : null,
      description,
      completed: false,
      created_at: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0],
    };
    console.log("New Task Added:", newTask);

    e.target.reset();
    setDate(undefined);
    setOpenDatePicker(false);
    setOpenModal(false);

    prop.onAddTask(newTask);

  }


  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button type="submit" size="sm" variant="default">
            Add <Plus />
          </Button>
        </DialogTrigger>
        
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Fill the form below to add a new task.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={addTaskHandler} className="">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="grid col-span-2 gap-3">
                <Label htmlFor="name-1">Title</Label>
                <Input id="Title" name="title" placeholder="Task title" />
              </div>
              <div className="col-span-1 grid gap-3">
                <Label htmlFor="Piority-1">Piority</Label>
                <Select name="piority">
                  <SelectTrigger className="w-full" id="Piority-1">
                    <SelectValue placeholder="Select Piority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Piority</SelectLabel>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex col-span-1 flex-col gap-3">
                <Label htmlFor="due_date" className="px-1">
                  Due Date
                </Label>
                <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="due_date"
                      className=" justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpenDatePicker(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid col-span-2 gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Description..." />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Task</Button>
            </DialogFooter>
            </form>
            
          </DialogContent>
        
      </Dialog>
    </>
  );
}

export default AddNewTask;
