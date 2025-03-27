export type TaskStatus = "pending" | "completed";
export type TaskType = "daily" | "quiz" | "one_time" | "repeatable";

export interface Task {
  id: string;
  reward: number;
  taskType: TaskType;
  status: TaskStatus;
  cooldownHours?: number | null;
  isAvailable: boolean;
  nextAvailableAt?: string | null;
  localizedName: string;
  localizedDescription: string;
}

export interface CompleteTaskResponse {
    success: boolean;
    reward?: number;
    updatedBalance?: number;
    nextAvailableAt?: string | null;
    message?: string; // Optional message for errors or info
}