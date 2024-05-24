import { deleteTask } from "@/app/tasks/_actions";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { User } from "@/db/schema";
import { isMobileDevice } from "@/lib/isMobile";
import * as trpc from "@/trpc/datalayer";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export async function UserList() {
  const users = await trpc.getUsers();
  const isMobile = await isMobileDevice();

  return (
    <div className="flex flex-col gap-4 w-full">
      {users.map((user: User) => (
        <div
          key={user.id}
          className="flex items-center gap-4 border-bottom-1 border-border-2 py-4"
        >
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName + " " + user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
          <div className="ml-auto font-medium">
            <Button size="sm">View details</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
