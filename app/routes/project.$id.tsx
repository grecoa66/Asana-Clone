import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ChevronDown } from "lucide-react";

import { Badge } from "~/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { projects, tasks } from "~/data/data";
import { cn } from "~/lib/utils";

export const loader = ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) {
    throw new Response("project id required", { status: 404 });
  }
  const project = projects.find((project) => project.id === id);
  if (!project) {
    throw new Response("project not found", { status: 404 });
  }

  console.log("Project ID: ", project.id);

  const projectTasks = tasks.filter((task) =>
    task.projects.find((p) => {
      return p.id === project.id;
    })
  );

  return { project, projectTasks };
};

export const ProjectPage = () => {
  const { project, projectTasks } = useLoaderData<typeof loader>();

  const todoTasks = {
    title: "To Do",
    tasks: projectTasks.filter((pt) => pt.status.status === "To Do"),
  };
  const doingTasks = {
    title: "Doing",
    tasks: projectTasks.filter((pt) => pt.status.status === "Doing"),
  };
  const testingTasks = {
    title: "Testing",
    tasks: projectTasks.filter((pt) => pt.status.status === "Testing"),
  };
  const doneTasks = {
    title: "Done",
    tasks: projectTasks.filter((pt) => pt.status.status === "Done"),
  };
  const sortedTasks = [todoTasks, doingTasks, testingTasks, doneTasks];
  return (
    <div className="p-4">
      <div>
        <p className="text-xl">{project.name}</p>
      </div>
      {/* Projects Table */}
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
      </Table>
      <Accordion
        type="multiple"
        defaultValue={sortedTasks.map((_, i) => `item-${i}`)}
        className="w-full mt-4"
      >
        {sortedTasks.map((group, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="mb-8">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center">
                <ChevronDown className="mr-2 h-4 w-4 shrink-0 transition-transform duration-200" />
                <span className="font-semibold">{group.title}</span>
                <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">
                  {group.tasks.length}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableBody>
                  {group.tasks.map((task) => (
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ProjectPage;
