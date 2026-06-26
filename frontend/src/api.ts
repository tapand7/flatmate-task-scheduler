import axios from "axios";
import type { CreateTaskPayload, Flat, LoginPayload, RegisterPayload, Task, User } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("alterno_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const errorMessage = (error: unknown) => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message;
  }
  return "Something went wrong";
};

const unwrap = async <T,>(request: Promise<{ data: T }>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    throw new Error(errorMessage(error), { cause: error });
  }
};

export const loginUser = (payload: LoginPayload) =>
  unwrap<{ user: User; token: string }>(api.post("/users/login", payload));

export const registerUser = (payload: RegisterPayload) =>
  unwrap<{ user: User; token: string }>(api.post("/users", payload));

export const getFlats = () => unwrap<Flat[]>(api.get("/flats"));

export const createFlat = (payload: Pick<Flat, "name" | "description">) =>
  unwrap<Flat>(api.post("/flats", payload));

export const getTasks = (flatId: string) =>
  unwrap<Task[]>(api.get("/tasks", { params: { flatId } }));

export const createTask = (payload: CreateTaskPayload) =>
  unwrap<{ message: string; task: Task }>(api.post("/tasks", payload));

export const updateTaskStatus = (taskId: string, status: Task["status"]) =>
  unwrap<Task>(api.patch(`/tasks/${taskId}/status`, { status }));

export const getUsersByFlat = (flatId: string) =>
  unwrap<User[]>(api.get("/users", { params: { flatId } }));

export const updateUserStatus = (userId: string, status: User["status"]) =>
  unwrap<User>(api.patch(`/users/${userId}/status`, { status }));
