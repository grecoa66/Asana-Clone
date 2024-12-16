import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { projects, tasks, teams, users } from "~/data/data";

export const loader = ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (!id) {
    throw new Response("team id required", { status: 404 });
  }
  const team = teams.find((team) => team.id === id);
  if (!team) {
    throw new Response("team not found", { status: 404 });
  }
  const teamMembers = team.users.map((user) =>
    users.find((u) => u.id === user.id)
  );

  const teamProjects = projects.filter((project) =>
    project.teams.find((t) => t.id === team.id)
  );

  const teamTasks = tasks.filter((task) => {
    return task.projects.find((team) => teamProjects.includes(team));
  });

  return { team, teamMembers, teamProjects, teamTasks };
};

export const TeamPage = () => {
  const { team, teamMembers, teamProjects, teamTasks } =
    useLoaderData<typeof loader>();
  return (
    <div>
      {/* Avatar & Team Name (Bigger) */}
      <div className="h-24 bg-violet-400 opacity-50" />
      <div className="px-4 ">
        <Avatar className="w-24 h-24 relative top-[-48px] mb-[-42px]">
          <AvatarFallback>{team.name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <p className="text-xl">{team.name}</p>
      </div>
      {/* Projects Table */}
      <Card className="m-4">
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/3">Name</TableHead>
                <TableHead className="w-1/3">Members</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamProjects.map((tp) => (
                <TableRow>
                  <TableCell className="text-lg">
                    <p>{tp.name}</p>
                    <p className="text-xs text-gray-400">{tp.description}</p>
                  </TableCell>
                  <TableCell>
                    {tp.teams.map((t) => (
                      <div>
                        {t.users.map((u) => (
                          <p>{u.name}</p>
                        ))}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Tasks */}
      <Card className="m-4">
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Name</TableHead>
                <TableHead className="w-1/4">Status</TableHead>
                <TableHead className="w-1/4">Members</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamTasks.map((tt) => (
                <TableRow>
                  <TableCell className="text-lg flex flex-col gap-1">
                    <p>{tt.name}</p>
                    <p className="text-xs text-gray-400">{tt.description}</p>
                  </TableCell>
                  <TableCell>
                    <p>{tt.status.status}</p>
                  </TableCell>
                  <TableCell>
                    {tt.users.map((u) => (
                      <p>{u.name}</p>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamPage;
