import { deleteTask } from "@/app/tasks/_actions";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { isMobileDevice } from "@/lib/isMobile";
import * as trpc from "@/trpc/datalayer";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export async function TaskList() {
  const tasks = await trpc.getTasks();
  const isMobile = await isMobileDevice();

  return (
    <form>
      <div className="overflow-x-auto">
        <Table className="min-w-full table-fixed">
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="md:w-[15%] truncate md:text-pretty">
                  {task.name}
                </TableCell>
                <TableCell className="truncate md:text-wrap">
                  {task.description}
                </TableCell>
                <TableCell className="md:w-[15%]">{task.createdAt}</TableCell>
                <TableCell className="md:w-[21%] sticky right-0 text-right">
                  <Link href={`/tasks/${task.id}`}>
                    <Button size="sm" className="mr-2" variant="default">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    formAction={async () => {
                      "use server";
                      deleteTask({ id: task.id });
                      revalidatePath("/");
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </form>
  );
}
