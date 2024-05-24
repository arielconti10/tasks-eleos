import { UserList } from "@/app/users/_components/user-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUsers } from "@/trpc/datalayer";

export default async function Page() {
  const users = await getUsers();

  return (
    <div className="container h-14 max-w-screen-2xl">
      <div className="flex-1 space-y-4 pt-6">
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <UserList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
