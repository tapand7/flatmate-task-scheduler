export interface FlatInfo {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "MEMBER";
  status: "ACTIVE" | "OOF";
  notificationPreference: "EMAIL" | "WHATSAPP";
  flatId: FlatInfo | string; // string fallback for safety
  lastAssignedAt: string | null;
  createdAt: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "MEMBER";
  status: "ACTIVE" | "OOF";
  notificationPreference: "EMAIL" | "WHATSAPP";
  flatId: FlatInfo | string;
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
export const getFlatId = (flatId: FlatInfo | string | undefined): string => {
  if (!flatId) return "";
  return typeof flatId === "object" ? flatId._id : flatId;
};

export const getFlatName = (flatId: FlatInfo | string | undefined): string => {
  if (!flatId) return "";
  return typeof flatId === "object" ? flatId.name : flatId;
};
