"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createTask, updateTask } from "@/app/tasks/_actions";
import { Task } from "@/trpc/datalayer";
import { useRouter } from "next/navigation";

const taskFormSchema = z.object({
  name: z.string().min(4, {
    message: "Task name must be at least 10 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(140, {
      message: "Description must be at most 140 characters.",
    }),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

export function TaskForm({ task }: { task?: Task }) {
  const { toast } = useToast();
  const router = useRouter();

  const defaultValues: Partial<TaskFormValues> = {
    name: task?.name ?? "",
    description: task?.description ?? "",
  };

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          if (task) {
            await updateTask({
              id: task.id,
              ...data,
            });

            toast({
              variant: "default",
              description: "Task updated successfully.",
            });

            router.push("/");
          } else {
            await createTask(data);
            toast({
              variant: "default",
              description: "Task created successfully.",
            });
          }
          form.reset();
        })}
        className="p-4 space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit more about your task."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{task ? "Update task" : "Create task"}</Button>
      </form>
    </Form>
  );
}
