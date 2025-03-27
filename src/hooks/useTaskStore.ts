// D:/git/frontend/src/hooks/useTaskStore.ts или где он у вас лежит

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, TaskStatus, TaskType, CompleteTaskResponse } from "./types"; // Предположим, типы вынесены

// --- МОКОВЫЕ ДАННЫЕ ---

const MOCK_TASKS: Task[] = [
  {
    id: "task-daily-1",
    reward: 100,
    taskType: "daily",
    status: "pending", // Доступна для выполнения
    cooldownHours: 24,
    isAvailable: true,
    nextAvailableAt: null,
    localizedName: "Ежедневный вход",
    localizedDescription: "Зайдите в приложение и получите награду.",
  },
  {
    id: "task-repeat-1",
    reward: 50,
    taskType: "repeatable",
    status: "completed", // Уже выполнена, на перезарядке
    cooldownHours: 6,
    isAvailable: false,
    // Пример времени: 6 часов после полуночи UTC сегодня
    nextAvailableAt: new Date(new Date().setUTCHours(6, 0, 0, 0)).toISOString(),
    localizedName: "Быстрая разминка",
    localizedDescription: "Выполните простое действие каждые 6 часов.",
  },
  {
    id: "task-onetime-1",
    reward: 500,
    taskType: "one_time",
    status: "pending", // Доступна
    cooldownHours: null,
    isAvailable: true,
    nextAvailableAt: null,
    localizedName: "Привязать почту",
    localizedDescription: "Привяжите ваш email к аккаунту для безопасности.",
  },
  {
    id: "task-quiz-1",
    reward: 250,
    taskType: "quiz", // Представим, что это тоже задача
    status: "completed", // Викторина пройдена
    cooldownHours: null,
    isAvailable: false, // Пройденные одноразовые/викторины недоступны
    nextAvailableAt: null,
    localizedName: "Викторина по JS",
    localizedDescription: "Проверьте свои знания JavaScript.",
  },
  {
    id: "task-repeat-2",
    reward: 75,
    taskType: "repeatable",
    status: "pending", // Перезарядка закончилась, снова доступна
    cooldownHours: 2,
    isAvailable: true,
    // Время перезарядки уже прошло
    nextAvailableAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 часа назад
    localizedName: "Посмотреть рекламу",
    localizedDescription: "Посмотрите короткий ролик.",
  },
    {
    id: "task-onetime-2",
    reward: 1000,
    taskType: "one_time",
    status: "pending", // Доступна, но условие не выполнено (например, нужно что-то купить)
    cooldownHours: null,
    isAvailable: false, // Пока не доступна для выполнения через кнопку
    nextAvailableAt: null,
    localizedName: "Совершить покупку",
    localizedDescription: "Купите любой товар в магазине.",
  },
];

// --- ИМИТАЦИЯ ЗАДЕРЖКИ СЕТИ ---
const networkDelay = (delay = 700) => new Promise((resolve) => setTimeout(resolve, delay));

// --- МОКОВЫЕ ФУНКЦИИ FETCH ---

const mockFetchTasks = async (type?: TaskType): Promise<Task[]> => {
  console.log(`[MOCK API] GET /api/v1/tasks ${type ? `?type=${type}` : ''}`);
  await networkDelay();

  // // Опционально: имитация ошибки сети/сервера
  // if (Math.random() < 0.1) { // 10% шанс ошибки
  //   console.error("[MOCK API] Simulated fetchTasks error");
  //   throw new Error("Simulated server error fetching tasks.");
  // }

  if (type) {
    return MOCK_TASKS.filter(task => task.taskType === type);
  }
  return [...MOCK_TASKS]; // Возвращаем копию, чтобы избежать случайных мутаций
};

const mockCompleteTask = async (taskId: string): Promise<CompleteTaskResponse> => {
    console.log(`[MOCK API] POST /api/v1/tasks/${taskId}/complete`);
    await networkDelay();

    const taskIndex = MOCK_TASKS.findIndex(t => t.id === taskId);
    const task = taskIndex !== -1 ? MOCK_TASKS[taskIndex] : null;

    // // Опционально: имитация ошибки сети/сервера
    // if (Math.random() < 0.1) { // 10% шанс ошибки
    //   console.error("[MOCK API] Simulated completeTask error");
    //   throw new Error(`Simulated server error completing task ${taskId}.`);
    // }

    if (!task) {
        console.warn(`[MOCK API] Task ${taskId} not found.`);
        return { success: false, message: "Task not found" };
    }

    if (task.status === 'completed' || !task.isAvailable) {
        console.warn(`[MOCK API] Task ${taskId} is not available for completion.`);
        return { success: false, message: "Task not available or already completed" };
    }

    // Имитация успешного выполнения
    let nextAvailableAt: string | null = null;
    if ((task.taskType === 'daily' || task.taskType === 'repeatable') && task.cooldownHours) {
        const now = new Date();
        nextAvailableAt = new Date(now.getTime() + task.cooldownHours * 60 * 60 * 1000).toISOString();
    }

    // Имитируем обновленный баланс (просто для примера)
    const simulatedOldBalance = 10000;
    const updatedBalance = simulatedOldBalance + task.reward;

    console.log(`[MOCK API] Task ${taskId} completed successfully. Reward: ${task.reward}`);
    return {
        success: true,
        reward: task.reward,
        updatedBalance: updatedBalance,
        nextAvailableAt: nextAvailableAt,
    };
};


// --- ОБНОВЛЕННЫЙ useTaskStore С МОКАМИ ---

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  completingTaskId: string | null;
  error: string | null;
  fetchTasks: (type?: TaskType) => Promise<void>;
  completeTask: (taskId: string) => Promise<CompleteTaskResponse | null>;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      loading: false,
      completingTaskId: null,
      error: null,

      // --- Получение списка задач (ИСПОЛЬЗУЕТ МОК) ---
      fetchTasks: async (type?: TaskType) => {
        // Убрали получение токена, т.к. моку он не нужен
        set({ loading: true, error: null });
        try {
          // Вызываем моковую функцию вместо fetch
          const tasksData = await mockFetchTasks(type);
          set({ tasks: tasksData, loading: false });
        } catch (err: unknown) {
          console.error("Error fetching tasks (mock):", err);
          set({ error: (err as Error).message, loading: false });
        }
      },

      // --- Отметка задачи как выполненной (ИСПОЛЬЗУЕТ МОК) ---
      completeTask: async (taskId: string): Promise<CompleteTaskResponse | null> => {
         // Убрали получение токена
        if (get().completingTaskId) {
            console.warn("Another task completion is already in progress.");
            return null;
        }
        set({ completingTaskId: taskId, error: null });

        try {
          // Вызываем моковую функцию вместо fetch
          const responseData = await mockCompleteTask(taskId);

          if (!responseData.success) {
             // Обработка неудачи из мокового ответа
             const errorMessage = responseData.message || `Failed to complete task ${taskId}`;
             throw new Error(errorMessage);
          }

          // Успешно выполнено - обновляем состояние задачи в сторе
          // Эта логика остается прежней, она работает с результатом мока
          set((state) => {
            const updatedTasks = state.tasks.map((task) => {
              if (task.id === taskId) {
                return {
                  ...task,
                  status: 'completed' as TaskStatus,
                  isAvailable: responseData.nextAvailableAt ? false : false, // После выполнения всегда false до след. доступности
                  nextAvailableAt: responseData.nextAvailableAt || null,
                };
              }
              return task;
            });
            return { tasks: updatedTasks, completingTaskId: null };
          });

          return responseData; // Возвращаем моковые данные ответа

        } catch (err: unknown) {
          console.error(`Error completing task ${taskId} (mock):`, err);
          set({ error: (err as Error).message, completingTaskId: null });
          return null;
        }
      },
    }),
    {
      name: "task-store",
    },
  ),
);

// Не забудьте создать файл types.ts и переместить туда интерфейсы Task, TaskStatus, TaskType, CompleteTaskResponse
// Пример types.ts
/*
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
    message?: string; // Добавлено для ошибок
}
*/