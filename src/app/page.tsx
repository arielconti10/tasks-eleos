import { TaskForm } from "@/app/tasks/_components/task-form";
import { TaskList } from "@/app/tasks/_components/task-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <>
      <div className="container h-14 max-w-screen-2xl">
        <div className="flex-1 space-y-4 pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-10">
            <Card className="col-span-5 md:col-span-4">
              <CardHeader>
                <CardTitle>Add Task</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <TaskForm />
              </CardContent>
            </Card>
            <Card className="col-span-5 md:col-span-6">
              <CardHeader>
                <CardTitle>My Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
