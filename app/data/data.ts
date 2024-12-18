import { Project, Task } from "~/types/tasks";
import { Team, User } from "~/types/users";

// USERS
const user1: User = {
  id: "abc-123",
  name: "Alex Greco",
  email: "alex@dustid.com",
};

const user2: User = {
  id: "abc-456",
  name: "Tristan Sweeney",
  email: "tristan@dustid.com",
};

const user3: User = {
  id: "abc-789",
  name: "Andrew Stern",
  email: "andrew@dustid.com",
};

const user4: User = {
  id: "def-123",
  name: "Curtis Williams",
  email: "curtis@dustid.com",
};

// TEAMS
const team1: Team = {
  id: "team-abc-123",
  users: [user1, user2],
  name: "Web Devs",
};

const team2: Team = {
  id: "team-abc-456",
  users: [user3],
  name: "Project Management",
};

const team3: Team = {
  id: "team-abc-789",
  users: [user4],
  name: "QA",
};

// PROJECTS
const project1: Project = {
  id: "project-abc-123",
  name: "DICE4",
  description: "Building the platform of the future",
  teams: [team1],
};

const project2: Project = {
  id: "project-abc-456",
  name: "Automation Testing",
  description: "Testing the platform",
  teams: [team2, team3],
};

const project3: Project = {
  id: "project-abc-789",
  name: "Dice Design Library",
  description: "Building the components for the future",
  teams: [team1, team2],
};

// TASKS

const task1: Task = {
  id: "task-abc-123",
  name: "Authentication: Sign In",
  description:
    "Users should be able to sign in. Use KeyCloak as authentication providor",
  status: { dueDate: new Date("12/20/2024"), status: "Testing" },
  priority: "Low",
  users: [user1, user4],
  projects: [project2],
};

const task2: Task = {
  id: "task-abc-456",
  name: "Authentication: Sign Out",
  description:
    "Users should be able to sign out. There sessions should be destroyed. Use KeyCloak as authentication providor",
  status: { dueDate: new Date("12/21/2024"), status: "Doing" },
  priority: "High",
  users: [user1, user2],
  projects: [project1],
};

const task3: Task = {
  id: "task-abc-789",
  name: "Display User Details",
  description:
    "Users should be able to see their user details, edit them, and save changes.",
  status: { dueDate: new Date("12/30/2024"), status: "To Do" },
  priority: "Medium",
  users: [user2],
  projects: [project1],
};

const task4: Task = {
  id: "task-def-123",
  name: "Delete User",
  description: "Users should be able to delete their user account.",
  status: { dueDate: new Date("12/1/2024"), status: "To Do" },
  priority: "Low",
  users: [user1, user3],
  projects: [project1],
};
const task5: Task = {
  id: "task-def-456",
  name: "Login Card",
  description: "Design a generic login component.",
  status: { dueDate: new Date("1/10/2025"), status: "To Do" },
  priority: "High",
  users: [user1, user3],
  projects: [project1, project3],
};

const task6: Task = {
  id: "task-def-789",
  name: "List Things in DataTable component",
  description: "Implement a ShadCN datagrid to display all things.",
  status: { dueDate: new Date("12/10/2024"), status: "Done" },
  priority: "Medium",
  users: [user1, user3],
  projects: [project1, project3],
};

const task7: Task = {
  id: "task-ghi-123",
  name: "Create Thing",
  description:
    "Add a form to the UI. Write service function to create thing via Thing Api",
  status: { dueDate: new Date("12/12/2024"), status: "Done" },
  priority: "High",
  users: [user2, user3],
  projects: [project1],
};

const users = [user1, user2, user3, user4];
const currentUser = user3;
const teams = [team1, team2, team3];
const projects = [project1, project2, project3];
const tasks = [task1, task2, task3, task4, task5, task6, task7];

export {
  user1,
  user2,
  user3,
  user4,
  team1,
  team2,
  team3,
  project1,
  project2,
  project3,
  task1,
  task2,
  task3,
  task4,
  task5,
  task6,
  task7,
  currentUser,
  users,
  teams,
  projects,
  tasks,
};
