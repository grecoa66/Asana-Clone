import { Team, User } from "./users";

export type Status = {
  dueDate: Date;
  status: "To Do" | "Doing" | "Testing" | "Done";
};

export type Project = {
  readonly id: string;
  name: string;
  description: string;
  teams: Team[];
};

export type Task = {
  readonly id: string;
  name: string;
  description: string;
  status: Status;
  users: User[];
  projects: Project[];
};
