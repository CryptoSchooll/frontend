// src/stores/types.ts (or your preferred path)

// --- Quiz Domain Types ---

export interface Quiz {
  id: string
  title: string
  tasksCount: number
  isAvailable: boolean
  solved: boolean
  correctAnswers: number
}

export interface Answer {
  questionId: string
  answerId: string
  answerTime: number
}

export interface QuizProgress {
  currentQuestionIndex: number
  answers: Answer[]
  quizStartedAt: number
  questionStartedAt: number
}

// --- Quiz Store Type Definitions ---

// Interface for the quiz state properties
export interface QuizStoreState {
  quizzes: Quiz[]
  selectedQuiz: Quiz | null
  progress: QuizProgress | null
  quizFinished: boolean
  loading: boolean
  error: string | null
}

// Interface for the quiz action methods
export interface QuizStoreActions {
  fetchQuizzes: () => Promise<void>
  selectQuiz: (quiz: Quiz) => void
  clearSelection: () => void
  setProgress: (progress: QuizProgress) => void
  clearProgress: () => void
  setQuizFinished: (finished: boolean) => void
}

// Combined type for the complete quiz store structure
export interface QuizStore extends QuizStoreState {
  actions: QuizStoreActions
}

// --- Task Domain Types ---

export type TaskStatus = "pending" | "completed"
export type TaskType = "daily" | "quiz" | "one_time" | "repeatable"

export interface Task {
  id: string
  reward: number
  taskType: TaskType
  status: TaskStatus
  cooldownHours?: number | null
  isAvailable: boolean
  nextAvailableAt?: string | null
  localizedName: string
  localizedDescription: string
}

export interface CompleteTaskResponse {
  success: boolean
  reward?: number
  updatedBalance?: number
  nextAvailableAt?: string | null
  message?: string // Optional message for errors or info
}

// --- Task Store Type Definitions (Placeholder - add if needed) ---
// If you also refactor useTaskStore to use this types file,
// you would add its specific store types here as well, similar to QuizStore.
/*
export interface TaskStoreState {
  tasks: Task[];
  loading: boolean;
  completingTaskId: string | null;
  error: string | null;
}

export interface TaskStoreActions {
  fetchTasks: (type?: TaskType) => Promise<void>;
  completeTask: (taskId: string) => Promise<CompleteTaskResponse | null>;
}

export interface TaskStore extends TaskStoreState {
   // Assuming the same 'actions' pattern for consistency
   actions: TaskStoreActions;
   // Or if TaskStore doesn't use the 'actions' nesting:
   // fetchTasks: (type?: TaskType) => Promise<void>;
   // completeTask: (taskId: string) => Promise<CompleteTaskResponse | null>;
}
*/
