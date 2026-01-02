import { useState, useReducer, useMemo } from "react";
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
import AddNewTask from "../AddTask/AddTask";

function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "TOGGLE":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: action.payload.completed }
          : task
      );

    case "REMOVE":
      return state.filter((task) => task.id !== action.payload.id);

    default:
      return state;
  }
}

function TasksList() {
  const Tasks = [
    {
      id: 1,
      title: "Task 1",
      completed: false,
      created_at: "2025-12-12",
      due_date: "2025-12-20",
      piority: "high",
    },
    {
      id: 2,
      title: "Task 2",
      completed: true,
      created_at: "2025-12-12",
      due_date: "2025-12-21",
      piority: "medium",
    },
    {
      id: 3,
      title: "Task 3",
      completed: false,
      created_at: "2025-12-13",
      due_date: "2025-12-25",
      piority: "low",
    },
  ];
  const [tasks, dispatch] = useReducer(tasksReducer, Tasks);

  // const [tasks, setTasks] = useState(Tasks);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [showHighPiority, setShowHighPiority] = useState(false);
  // const [showMediumPiority, setShowMediumPiority] = useState(false);
  // const [showLowPiority, setShowLowPiority] = useState(false);
  // const activeFilters = [showHighPiority, showMediumPiority, showLowPiority].some(f => f);

  const [filters, setFilters] = useState({
    search: "",
    priorities: new Set(),
  });

  const togglePriority = (priority) => {
    setFilters((prev) => {
      const next = new Set(prev.priorities);

      next.has(priority) ? next.delete(priority) : next.add(priority);

      return { ...prev, priorities: next };
    });
  };

  const onSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      if (!matchesSearch) return false;

      if (filters.priorities.size === 0) return true;

      return filters.priorities.has(task.piority);
    });
  }, [tasks, filters]);

  const addTask = (task) => dispatch({ type: "ADD", payload: task });

  const toggleTask = (id, completed) =>
    dispatch({ type: "TOGGLE", payload: { id, completed } });

  const removeTask = (id) => dispatch({ type: "REMOVE", payload: { id } });

  // const AddTaskHandler = (newTask) => {
  //   setTasks((prevTasks) => [...prevTasks, newTask]);
  // };

  // const TaskCheckChangeHandler = (taskId, checked) => {
  //   let updatedTasks = tasks.map((task) => {
  //     if (task.id === taskId) {
  //       return { ...task, completed: checked };
  //     }
  //     return task;
  //   });
  //   setTasks(updatedTasks);
  // };

  // const RemoveTaskHandler = (taskId) => {
  //   setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  // };

  return (
    <>
      <div className="filter-sec mb-2">
        <div className="flex justify-between">
          <div className=" flex gap-3">
            <Input
              className="min-w-60"
              type="text"
              placeholder="Search Tasks"
              value={filters.search}
              onChange={(e) => onSearchChange(e.target.value)}
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
                    checked={filters.priorities.has("high")}
                    onCheckedChange={() => togglePriority("high")}
                  >
                    High
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuCheckboxItem
                    checked={filters.priorities.has("medium")}
                    onCheckedChange={() => togglePriority("medium")}
                  >
                    Medium
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuCheckboxItem
                    checked={filters.priorities.has("low")}
                    onCheckedChange={() => togglePriority("low")}
                  >
                    Low
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex gap-1">
                {Array.from(filters.priorities).map((filter) => (
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
            {filteredTasks.map((task) => (
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
