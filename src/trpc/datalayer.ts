import "server-only";

import { cache } from "react";
import { db } from "@/db";
import { publicProcedure } from "./init";
import { eq } from "drizzle-orm";
import { tasks, User } from "@/db/schema";
import { z } from "zod";

export const getTasks = cache(
  publicProcedure.meta({ span: "getTasks" }).query(async () => {
    const tasks = await db.query.tasks.findMany();
    return tasks;
  })
);

export const getTaskById = publicProcedure
  .meta({ span: "getTask" })
  .input(z.object({ id: z.number() }))
  .query(async ({ input }) => {
    const task = await db.query.tasks.findFirst({
      where: eq(tasks.id, input.id),
    });

    return task;
  });

export const getUsers = publicProcedure
  .meta({ span: "getUsers" })
  .query(async () => {
    const users = await fetch("https://dummyjson.com/users").then((res) =>
      res.json()
    );
    return users.users as User[];
  });

export type Task = Awaited<ReturnType<typeof getTasks>>[number];
