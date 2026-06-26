export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "MEMBER";
  status: "ACTIVE" | "OOF";
  notificationPreference: "EMAIL" | "WHATSAPP";
  flatId: string;
  lastAssignedAt: string | null;
  createdAt: string;
}

export interface Flat {
  _id: string;
  name: string;
  description?: string;
  createdBy: string;
  members: string[];
  createdAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  assignedTo: User | string;
  flatId: string;
  dueDate: string;
  status: "PENDING" | "COMPLETED";
  createdAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  flatId: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  flatId: string;
  dueDate: string;
}
