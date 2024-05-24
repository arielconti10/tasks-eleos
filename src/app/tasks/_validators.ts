import * as z from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
});

export const updateTaskSchema = z.object({
  id: z.number(),
  name: z.string().min(4, "Name must be at least 4 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
});
