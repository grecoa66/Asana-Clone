import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
      <h2>Team</h2>
      <p>{team.name}</p>
      <h3 className="text-xl">Team Members</h3>
      {teamMembers.map((tm) => (
        <div className="border-b-2 border-black">
          <p>Name: {tm.name}</p>
          <p>Email: {tm.email}</p>
        </div>
      ))}
      <h3 className="text-xl">Team Projects</h3>
      {teamProjects.map((tp) => (
        <div className="border-b-2 border-black">
          <p>Name: {tp.name}</p>
        </div>
      ))}
      <h3 className="text-xl">Team Tasks</h3>
      {teamTasks.map((tt) => (
        <div>
          <p>Name: {tt.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamPage;
