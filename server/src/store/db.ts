import fs from "fs";
import path from "path";

const DB_FILE = path.join(__dirname, "../../../db.json");

export type RoleUser = "admin" | "member";

export interface User {
  id: string;
  email: string;
  name: string;
  role: RoleUser;
}

export interface UserDB extends User {
  passwordHash: string;
}

type StatusProject = "active" | "archived";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: StatusProject;
  ownerId: string;
  createdAt: string;
}

type TaskStatus = "todo" | "in_progress" | "review" | "done";
type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  projectId: string;
  assigneeId: string | null;
  priority: TaskPriority;
  order: number;
}

export interface OTPData {
  code: string;
  expiresAt: Date;
  tempUser?: { name: string; email: string; passwordHash: string };
}

export const users: UserDB[] = [];
export const otps = new Map<string, OTPData>();
export const projects: Project[] = [
  {
    id: "1",
    name: "Project 1",
    description: "Project 1 description",
    status: "active",
    ownerId: "1",
    createdAt: "2022-01-01",
  },
];
export const tasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Task 1 description",
    status: "todo",
    projectId: "1",
    assigneeId: "1",
    priority: "low",
    order: 1,
  },
];

const CLEANER_INTERVAL = 60 * 1000;
setInterval(() => {
  const now = new Date();
  for (const [email, otp] of otps.entries()) {
    if (now > otp.expiresAt) {
      otps.delete(email);
    }
  }
}, CLEANER_INTERVAL);

export const saveDb = () => {
  const payload = { users, projects, tasks };
  const dataString = JSON.stringify(payload, null, 2);

  fs.writeFileSync(DB_FILE, dataString);
};

export const loadDb = () => {
  if (fs.existsSync(DB_FILE)) {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(data);
    users.splice(0, users.length, ...(parsed.users || []));
    projects.splice(0, projects.length, ...(parsed.projects || []));
    tasks.splice(0, tasks.length, ...(parsed.tasks || []));
  }
};

loadDb();
