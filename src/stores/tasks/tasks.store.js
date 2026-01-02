import { create } from "zustand";

const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    completed: false,
    created_at: "2025-12-12",
    due_date: "2025-12-27",
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
    created_at: "2025-12-12",
    due_date: "2026-01-02",
    piority: "medium",
  },
  {
    id: 4,
    title: "Task 4",
    completed: false,
    created_at: "2025-12-12",
    due_date: "2026-01-07",
    piority: "low",
  },
];

export const useTasksStore = create((set) => ({
  // ---------- STATE ----------
  tasks: initialTasks,
  search: "",
  priorities: new Set(),
  filteredTasks: initialTasks,

  // ---------- INTERNAL HELPER ----------
  _recalculate: (state) => {
    const { tasks, search, priorities } = state;

    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (priorities.size === 0) return true;

      return priorities.has(task.piority);
    });
  },

  // ---------- ACTIONS ----------
  addTask: (task) =>
    set((state) => {
      const tasks = [...state.tasks, task];
      return {
        tasks,
        filteredTasks: state._recalculate({ ...state, tasks }),
      };
    }),

  toggleTask: (id, completed) =>
    set((state) => {
      const tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed } : task
      );
      return {
        tasks,
        filteredTasks: state._recalculate({ ...state, tasks }),
      };
    }),

  removeTask: (id) =>
    set((state) => {
      const tasks = state.tasks.filter((task) => task.id !== id);
      return {
        tasks,
        filteredTasks: state._recalculate({ ...state, tasks }),
      };
    }),

  updateTask: (id, updates) =>
    set((state) => {
      const tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      );

      return {
        tasks,
        filteredTasks: state._recalculate({ ...state, tasks }),
      };
    }),

  setSearch: (value) =>
    set((state) => ({
      search: value,
      filteredTasks: state._recalculate({ ...state, search: value }),
    })),

  togglePriority: (priority) =>
    set((state) => {
      const priorities = new Set(state.priorities);
      priorities.has(priority)
        ? priorities.delete(priority)
        : priorities.add(priority);

      return {
        priorities,
        filteredTasks: state._recalculate({ ...state, priorities }),
      };
    }),

  clearFilters: () =>
    set((state) => ({
      search: "",
      priorities: new Set(),
      filteredTasks: state._recalculate({
        ...state,
        search: "",
        priorities: new Set(),
      }),
    })),
}));
