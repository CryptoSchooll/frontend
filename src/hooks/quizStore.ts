import { create } from "zustand"
import { persist } from "zustand/middleware"

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
          // Заглушка с расширенным списком квизов
          const quizzesData: Quiz[] = [
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

          // Имитируем задержку запроса
          await new Promise((resolve) => setTimeout(resolve, 1000))

          set({ quizzes: quizzesData })
        } catch (err: unknown) {
          set({ error: (err as Error).message })
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
