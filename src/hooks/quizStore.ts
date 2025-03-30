import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

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

export interface QuizResult {
  id: string
  quizId: string
  completedAt: string
  correctAnswers: number
  totalQuestions: number
  reward: number
  score: number
  broadcastId?: string
}

// --- Quiz Store Type Definitions ---
interface QuizStoreState {
  quizzes: Quiz[]
  selectedQuiz: Quiz | null
  progress: QuizProgress | null
  quizFinished: boolean
  loading: boolean
  error: string | null
}

interface QuizStoreActions {
  selectQuiz: (quiz: Quiz) => void
  clearSelection: () => void
  setProgress: (progress: QuizProgress) => void
  clearProgress: () => void
  setQuizFinished: (finished: boolean) => void
  updateQuizResult: (quizId: string, result: QuizResult) => void
}

interface QuizStore extends QuizStoreState {
  actions: QuizStoreActions
}

// Моковые данные для квизов
const MOCK_QUIZZES: Quiz[] = [
  {
    id: "1",
    title: "Квест 1",
    tasksCount: 10,
    isAvailable: true,
    solved: true,
    correctAnswers: 7,
  },
  {
    id: "2",
    title: "Квест 2",
    tasksCount: 10,
    isAvailable: true,
    solved: true,
    correctAnswers: 10,
  },
  {
    id: "3",
    title: "Квест 3",
    tasksCount: 7,
    isAvailable: true,
    solved: false,
    correctAnswers: 0,
  },
  {
    id: "4",
    title: "Квест 4",
    tasksCount: 9,
    isAvailable: true,
    solved: false,
    correctAnswers: 0,
  },
  {
    id: "5",
    title: "Квест 5",
    tasksCount: 5,
    isAvailable: false,
    solved: false,
    correctAnswers: 0,
  },
  {
    id: "6",
    title: "Квест 6",
    tasksCount: 6,
    isAvailable: false,
    solved: false,
    correctAnswers: 0,
  },
]

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      // --- State ---
      quizzes: MOCK_QUIZZES,
      selectedQuiz: null,
      progress: null,
      quizFinished: false,
      loading: false,
      error: null,

      // --- Actions ---
      actions: {
        selectQuiz: (quiz: Quiz) => set({ selectedQuiz: quiz }),
        clearSelection: () => set({ selectedQuiz: null }),
        setProgress: (progress: QuizProgress) => set({ progress }),
        clearProgress: () => set({ progress: null, quizFinished: false }),
        setQuizFinished: (finished: boolean) => set({ quizFinished: finished }),
        updateQuizResult: (quizId: string, result: QuizResult) =>
          set((state) => ({
            quizzes: state.quizzes.map((quiz) =>
              quiz.id === quizId
                ? {
                    ...quiz,
                    solved: true,
                    correctAnswers: result.correctAnswers,
                    isAvailable: false,
                  }
                : quiz,
            ),
          })),
      },
    }),
    {
      name: "quiz-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        quizzes: state.quizzes,
        progress: state.progress,
        quizFinished: state.quizFinished,
      }),
    },
  ),
)
