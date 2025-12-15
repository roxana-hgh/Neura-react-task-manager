import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Funnel, EllipsisVertical } from "lucide-react";
import AddNewTask from "../AddTask/AddTask";

function TasksList() {
  const Tasks = [
    {
      id: 1,
      title: "Task 1",
      completed: false,
      created_at: "2025-12-12",
      due_date: "2025-12-20",
      piority: "High",
    },
    {
      id: 2,
      title: "Task 2",
      completed: true,
      created_at: "2025-12-12",
      due_date: "2025-12-21",
      piority: "Medium",
    },
    {
      id: 3,
      title: "Task 3",
      completed: false,
      created_at: "2025-12-13",
      due_date: "2025-12-25",
      piority: "High",
    },
  ];
  const [tasks, setTasks] = useState(Tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHighPiority, setShowHighPiority] = useState(false);
  const [showMediumPiority, setShowMediumPiority] = useState(false);
  const [showLowPiority, setShowLowPiority] = useState(false);
  const activeFilters = [showHighPiority, showMediumPiority, showLowPiority].some(f => f);

  const AddTaskHandler = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const TaskCheckChangeHandler = (taskId, checked) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: checked };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const RemoveTaskHandler = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  return (
    <>
      <div className="filter-sec mb-3">
        <div className="flex justify-between">
          <div className="w-1/3 flex gap-3">
            <Input 
              className="" 
              type="text" 
              placeholder="Search Tasks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="text-neutral-700" variant="outline">
                  <Funnel />
                  Priority
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuCheckboxItem
                  checked={showHighPiority}
                  onCheckedChange={setShowHighPiority}
                >
                  High
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showMediumPiority}
                  onCheckedChange={setShowMediumPiority}
                >
                  Medium
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showLowPiority}
                  onCheckedChange={setShowLowPiority}
                >
                  Low
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="">
            <AddNewTask onAddTask={AddTaskHandler} />
          </div>
        </div>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-12 items-center py-2">
              <TableHead className="col-span-1 h-auto">Status</TableHead>
              <TableHead className="col-span-6 h-auto">Task</TableHead>

              <TableHead className="col-span-2 h-auto">Priority</TableHead>
              <TableHead className="col-span-2 h-auto">Due Date</TableHead>
              <TableHead className="col-span-1 h-auto"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks
              .filter((task) => {
                const titleMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
                
                if (!titleMatch) return false;
                if (!activeFilters) return true;
                
                if (showHighPiority && task.piority === "High") return true;
                if (showMediumPiority && task.piority === "Medium") return true;
                if (showLowPiority && task.piority === "Low") return true;
                
                return false;
              })
              .map((task) => (
              <TableRow
                className={`grid grid-cols-12 p-1 ${
                  task.completed ? "bg-neutral-50" : ""
                }`}
                key={task.id}
              >
                <TableCell className="col-span-1">
                  <Checkbox
                    checked={task.completed}
                    id={`task-item${task.id}`}
                    onCheckedChange={(checked) =>
                      TaskCheckChangeHandler(task.id, checked)
                    }
                  />
                </TableCell>
                <TableCell className={`col-span-6  `}>
                  <Label htmlFor={`task-item${task.id}`}>
                    {/* <Badge variant="secondary">Work</Badge>  */}
                    <span
                      className={`${
                        task.completed
                          ? "text-neutral-500 line-through"
                          : "font-medium"
                      }`}
                    >
                      {task.title}
                    </span>
                  </Label>
                </TableCell>

                <TableCell className="col-span-2 text-sm font-medium">
                  {task.piority}
                </TableCell>
                <TableCell className="col-span-2 text-sm">
                  {new Date(task.due_date).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="col-span-1 text-sm text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical
                        size={18}
                        color="#333333"
                        strokeWidth={0.5}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-500"
                        onClick={() => RemoveTaskHandler(task.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {tasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No tasks available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default TasksList;
