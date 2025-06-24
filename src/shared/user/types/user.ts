export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  skills: string[];
  userRole: UserRole;
  experience: string;
}

export type UserRole = "frontend" | "backend" | "fullstack" | "designer" | "pm";
