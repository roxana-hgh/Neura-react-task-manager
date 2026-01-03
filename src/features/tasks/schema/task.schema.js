import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters"),

  piority: z.enum(["high", "medium", "low"], {
    required_error: "Priority is required",
  }),

  description: z
    .string()
    .optional(),

  due_date: z
    .string()
    .nullable()
    .optional(),
});
