
import { useTasksStore } from "@/features/tasks/stores/tasks.store";


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
import { Badge } from "@/components/ui/badge";
import { Funnel, EllipsisVertical, X } from "lucide-react";
import AddNewTask from "./AddTask";
import EditTask from "./EditTask";

function TasksList() {
  const tasks = useTasksStore(state => state.filteredTasks);


  const search = useTasksStore((state) => state.search);
  const priorities = useTasksStore((state) => state.priorities);

  const setSearch = useTasksStore((state) => state.setSearch);
  const togglePriority = useTasksStore((state) => state.togglePriority);

  const toggleTask = useTasksStore((state) => state.toggleTask);
  const removeTask = useTasksStore((state) => state.removeTask);
  const addTask = useTasksStore((state) => state.addTask);
  const editTask = useTasksStore((state) => state.updateTask);

  return (
    <>
      <div className="filter-sec mb-2">
        <div className="flex justify-between">
          <div className=" flex gap-3">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks"
              className="min-w-sm"
            />
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="text-neutral-700 text-sm"
                    variant="outline"
                  >
                    <Funnel />
                    Priority
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuCheckboxItem
                    checked={priorities.has("high")}
                    onCheckedChange={() => togglePriority("high")}
                  >
                    High
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuCheckboxItem
                    checked={priorities.has("medium")}
                    onCheckedChange={() => togglePriority("medium")}
                  >
                    Medium
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuCheckboxItem
                    checked={priorities.has("low")}
                    onCheckedChange={() => togglePriority("low")}
                  >
                    Low
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex gap-1">
                {Array.from(priorities).map((filter) => (
                  <Badge
                    className="hover:text-red-500 cursor-pointer"
                    onClick={() => togglePriority(filter)}
                    variant="secondary"
                  >
                    {filter} Priority <X />{" "}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="">
            <AddNewTask onAddTask={addTask} />
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
            {tasks.map((task) => (
              <TableRow
                className={`grid grid-cols-12 p-1 cursor-pointer ${
                  task.completed ? "bg-neutral-50" : ""
                }`}
                key={task.id}
              >
                <TableCell className="col-span-1">
                  <Checkbox
                    checked={task.completed}
                    id={`task-item${task.id}`}
                    onCheckedChange={(checked) => toggleTask(task.id, checked)}
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
                  <span
                    className={` px-2 py-1 text-xs rounded-full font-medium  ${
                      task.piority === "high"
                        ? "bg-red-300/40"
                        : task.piority === "low"
                        ? "bg-green-300/40"
                        : "bg-amber-300/40"
                    }`}
                  >
                    {task.piority}
                  </span>
                </TableCell>
                <TableCell className="col-span-2 text-xs font-medium">
                  {task.due_date ? new Date(task.due_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }) : "No due date"}
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
                      <EditTask task={task} onUpdate={editTask} />
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => removeTask(task.id)}
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
