import { create } from "zustand"
import { persist, StateStorage } from "zustand/middleware"

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

interface QuizStore {
  quizzes: Quiz[]
  selectedQuiz: Quiz | null
  progress: QuizProgress | null
  quizFinished: boolean
  loading: boolean
  error: string | null
  fetchQuizzes: () => Promise<void>
  selectQuiz: (quiz: Quiz) => void
  clearSelection: () => void
  setProgress: (progress: QuizProgress) => void
  clearProgress: () => void
  setQuizFinished: (finished: boolean) => void
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      quizzes: [],
      selectedQuiz: null,
      progress: null,
      quizFinished: false,
      loading: false,
      error: null,
      fetchQuizzes: async () => {
        set({ loading: true, error: null })
        try {
          // Используем заглушку
          const quizzesData: Quiz[] = [
            {
              id: "1",
              title: "Квест 1",
              tasksCount: 10,
              isAvailable: true,
              solved: false,
              correctAnswers: 0,
            },
            {
              id: "2",
              title: "Квест 2",
              tasksCount: 8,
              isAvailable: true,
              solved: false,
              correctAnswers: 0,
            },
          ]
          await new Promise((resolve) => setTimeout(resolve, 1000))
          set({ quizzes: quizzesData })
        } catch (err: any) {
          set({ error: err.message })
        } finally {
          set({ loading: false })
        }
      },
      selectQuiz: (quiz: Quiz) => set({ selectedQuiz: quiz }),
      clearSelection: () => set({ selectedQuiz: null }),
      setProgress: (progress: QuizProgress) => set({ progress }),
      clearProgress: () => set({ progress: null, quizFinished: false }),
      setQuizFinished: (finished: boolean) => set({ quizFinished: finished }),
    }),
    {
      name: "quiz-store",
    },
  ),
)
