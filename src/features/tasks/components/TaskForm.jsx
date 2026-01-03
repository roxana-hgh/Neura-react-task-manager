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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner"

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../schema/task.schema";


function TaskForm({ initialValues, onSubmit, submitLabel }) {
  const [date, setDate] = useState(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (initialValues?.due_date) {
      setDate(new Date(initialValues.due_date));
    }
  }, [initialValues?.due_date]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      piority: initialValues?.piority ?? "medium",
      description: initialValues?.description ?? "",
      due_date: initialValues?.due_date ?? null,
    },
  });

  const onValidSubmit = (data) => {
    setLoader(true);
    onSubmit({
      ...data,
      due_date: date
        ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0]
        : null,
    });

  };

  return (
    <form onSubmit={handleSubmit(onValidSubmit)}>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="col-span-2 grid gap-3">
          <Label>Title</Label>
          <Input {...register("title")} />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label>Piority</Label>
          <Controller
            name="piority"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.piority && (
            <p className="text-sm text-red-500">{errors.piority.message}</p>
          )}
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
          <Textarea {...register("description")} />
        </div>
      </div>

      <Button type="submit" className="w-full">
        {loader ? <Spinner /> : submitLabel}
      </Button>
    </form>
  );
}

export default TaskForm;
