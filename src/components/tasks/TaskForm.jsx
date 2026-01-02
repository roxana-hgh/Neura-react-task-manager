import { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";

function TaskForm({ initialValues, onSubmit, submitLabel }) {
  const [date, setDate] = useState();
  useEffect(() => {
    if (initialValues?.due_date) {
      setDate(new Date(initialValues.due_date));
    }
  }, [initialValues?.due_date]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    onSubmit({
      title: formData.get("title"),
      piority: formData.get("piority"),
      description: formData.get("description"),
      due_date: date
        ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0]
        : null,
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="col-span-2 grid gap-3">
          <Label>Title</Label>
          <Input
            name="title"
            defaultValue={initialValues?.title}
            placeholder="Task title"
          />
        </div>

        <div className="grid gap-3">
          <Label>Piority</Label>
          <Select name="piority" defaultValue={initialValues?.piority}>
            <SelectTrigger>
              <SelectValue placeholder="Select piority" />
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

        <div className="flex flex-col gap-3">
          <Label>Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-between">
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="col-span-2 grid gap-3">
          <Label>Description</Label>
          <Textarea
            name="description"
            defaultValue={initialValues?.description}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}

export default TaskForm;
