export type User = {
  readonly id: string;
  name: string;
  email: string;
};

export type Team = {
  readonly id: string;
  users: User[];
  name: string;
};
