"use server";

import { db } from "@/db";
import { tasks } from "@/db/schema";
import { publicProcedure } from "@/trpc/init";
import { createTaskSchema, updateTaskSchema } from "./_validators";
import { revalidatePath, revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const createTask = publicProcedure
  .meta({ span: "createTask" })
  .input(createTaskSchema)
  .mutation(async ({ input }) => {
    await db.insert(tasks).values({
      ...input,
    });

    revalidatePath("/");
  });

export const updateTask = publicProcedure
  .meta({ span: "updateTask" })
  .input(updateTaskSchema)
  .mutation(async ({ input }) => {
    await db
      .update(tasks)
      .set({ ...input })
      .where(eq(tasks.id, input.id));
  });

export const deleteTask = publicProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input }) => {
    await db.delete(tasks).where(eq(tasks.id, input.id));
    revalidatePath("/");
  });
