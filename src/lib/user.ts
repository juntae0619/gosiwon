export type UserRole = "user" | "owner";

export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
};

export type CreateUserInput = {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: UserRole;
};

export type SessionUser = Pick<User, "id" | "email" | "name" | "role">;
