import { TaskForm } from "@/app/tasks/_components/task-form";
import * as trpc from "@/trpc/datalayer";
import { t } from "../../../trpc/init";

export default async function Page(props: { params: { id: number } }) {
  const id = Number(props.params.id);

  const task = await trpc.getTaskById({ id });

  return <TaskForm task={task} />;
}
