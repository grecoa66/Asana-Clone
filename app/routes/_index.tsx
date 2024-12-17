import { Avatar } from "@radix-ui/react-avatar";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Check, Users, Lock } from "lucide-react";
import { useState } from "react";
import { AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { currentUser, projects, tasks, teams, users } from "~/data/data";
import { cn, getFormattedDate } from "~/lib/utils";
import { Task } from "~/types/tasks";

export const meta: MetaFunction = () => {
  return [
    { title: "asana" },
    { name: "description", content: "Hackathon clone of asana" },
  ];
};

export const loader = () => {
  const currentUserTasks = tasks.filter((t) => t.users.includes(currentUser));
  const completedTasks = currentUserTasks.filter(
    (t) => t.status.status === "Done"
  );
  const upcomingTasks = currentUserTasks.filter(
    (t) => t.status.dueDate > new Date()
  );
  const overdueTasks = currentUserTasks.filter(
    (t) => t.status.dueDate <= new Date() && t.status.status !== "Done"
  );
  const collaborators = users;

  const userTeams = teams.filter((t) => t.users.includes(currentUser));
  const userProjects = projects.filter((p) =>
    userTeams.find((u) => p.teams.includes(u))
  );

  return {
    completedTasks,
    collaborators,
    upcomingTasks,
    overdueTasks,
    userProjects,
  };
};

export default function Index() {
  const {
    completedTasks,
    collaborators,
    upcomingTasks,
    overdueTasks,
    userProjects,
  } = useLoaderData<typeof loader>();
  const [selectView, setSelectView] = useState<string>("my-week");
  return (
    <div className="bg-violet-400 min-h-screen text-white p-4">
      <h2 className="text-xl">Home</h2>
      <div className="flex flex-col items-center gap-2">
        <p>{getFormattedDate()}</p>
        <h3 className="text-3xl">
          Good Morning, {currentUser.name.split(" ")[0]}
        </h3>
        <div className="flex flex-row items-center bg-white/25 w-fit p-1 rounded-full">
          <Select
            value={selectView}
            onValueChange={(value) => setSelectView(value)}
          >
            <SelectTrigger className="w-28 border-transparent shadow-none text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="my-week">My Week</SelectItem>
              <SelectItem value="my-month">My Month</SelectItem>
            </SelectContent>
          </Select>
          <Separator
            orientation="vertical"
            className="ml-2 mr-4 h-4 bg-white"
            decorative={true}
          />
          <div className="flex flex-row gap-1 items-center">
            <Check className="w-4 h-4" />
            <span className="text-xl">{completedTasks.length}</span>
            <span className="text-xs">tasks completed</span>
          </div>
          <div className="flex flex-row gap-1 items-center ml-8 mr-2">
            <Users className="w-4 h-4" />
            <span className="text-xl">{collaborators.length}</span>
            <span className="text-xs">collaborators</span>
          </div>
        </div>
      </div>
      <div className="my-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Avatar className="w-12 h-12">
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="flex flex-row gap-2 items-center pb-2">
              My tasks <Lock className="w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="overdue">OverDue</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                <TaskTable
                  tasks={upcomingTasks.map((t) => {
                    return {
                      ...t,
                      status: {
                        status: t.status.status,
                        dueDate: new Date(t.status.dueDate),
                      },
                    };
                  })}
                />
              </TabsContent>
              <TabsContent value="overdue">
                <TaskTable
                  tasks={overdueTasks.map((t) => {
                    return {
                      ...t,
                      status: {
                        status: t.status.status,
                        dueDate: new Date(t.status.dueDate),
                      },
                    };
                  })}
                />
              </TabsContent>
              <TabsContent value="completed">
                <TaskTable
                  tasks={completedTasks.map((t) => {
                    return {
                      ...t,
                      status: {
                        status: t.status.status,
                        dueDate: new Date(t.status.dueDate),
                      },
                    };
                  })}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <div className="max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {userProjects.map((p) => (
              <div key={p.id} className="flex flex-row gap-2 items-center">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <p>{p.name}</p>
                  <p className="text-xs text-gray-500">{p.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>People</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

const TaskTable = ({ tasks }: { tasks: Task[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold w-1/3">Task Name</TableHead>
          <TableHead className="font-semibold w-1/6">Assignee</TableHead>
          <TableHead className="font-semibold w-1/6">Due Date</TableHead>
          <TableHead className="font-semibold w-1/6">Priority</TableHead>
          <TableHead className="font-semibold w-1/6">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="w-1/3 pl-6">{task.name}</TableCell>
            <TableCell className="w-1/6 text-xs">
              {task.users.map((u) => (
                <p key={u.id}>{u.name}</p>
              ))}
            </TableCell>
            <TableCell className="w-1/6 text-xs">
              {new Date(task.status.dueDate).toLocaleDateString()}
            </TableCell>
            <TableCell className="w-1/6 text-xs">
              <Badge
                className={cn(
                  task.priority === "High"
                    ? "bg-red-400"
                    : task.priority === "Medium"
                    ? "bg-orange-400"
                    : "bg-cyan-400"
                )}
              >
                {task.priority}
              </Badge>
            </TableCell>
            <TableCell className="w-1/6 text-xs">
              {task.status.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
