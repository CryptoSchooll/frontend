import { motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

import QuizItem from "./QuizItem"

import { useQuizStore } from "@/hooks/quizStore"
import { useUIStore } from "@/hooks/uiStore"

// Оптимизированные анимации для мобильных устройств
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      when: "beforeChildren",
    },
  },
}

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.5,
    },
  },
}

const QuizList: React.FC = () => {
  const {
    quizzes,
    selectedQuiz,
    progress,
    quizFinished,
    loading,
    error,
    actions: { selectQuiz, clearProgress },
  } = useQuizStore()

  const { openQuizConfirm } = useUIStore((state) => state.actions)
  const [hasInitialized, setHasInitialized] = useState(false)
  const userSelectedQuizId = useRef<string | null>(null)

  // Загрузка при первой инициализации
  useEffect(() => {
    if (loading) {
      return
    }

    if (!hasInitialized) {
      setHasInitialized(true)

      // Проверяем наличие и статус прогресса
      if (progress && selectedQuiz && !quizFinished) {
        // Продолжение существующей викторины
        openQuizConfirm({
          quizId: selectedQuiz.id,
          title: selectedQuiz.title,
          actionType: "continue",
        })
      }
    } else if (userSelectedQuizId.current && selectedQuiz) {
      // Пользователь только что выбрал викторину
      if (selectedQuiz.id === userSelectedQuizId.current) {
        openQuizConfirm({
          quizId: selectedQuiz.id,
          title: selectedQuiz.title,
          actionType: "start",
        })
        userSelectedQuizId.current = null
      }
    }
  }, [
    loading,
    hasInitialized,
    progress,
    selectedQuiz,
    quizFinished,
    openQuizConfirm,
  ])

  // Сброс состояния при очистке выбора
  useEffect(() => {
    if (!selectedQuiz) {
      userSelectedQuizId.current = null
    }
  }, [selectedQuiz])

  // Обработчик выбора викторины
  const handleQuizClick = useCallback(
    (quizId: string) => {
      const quiz = quizzes.find((q) => q.id === quizId)
      if (!quiz) return

      clearProgress()
      userSelectedQuizId.current = quizId
      selectQuiz(quiz)
    },
    [quizzes, selectQuiz, clearProgress],
  )

  // Состояния загрузки и ошибок - компактные версии для мобильных устройств
  if (loading) {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <div className="border-3 h-7 w-7 animate-spin rounded-full border-purple-400 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-900/20 p-3 text-center backdrop-blur-sm">
        <p className="text-sm text-red-300">Не удалось загрузить викторины</p>
      </div>
    )
  }

  if (quizzes.length === 0) {
    return (
      <div className="rounded-lg bg-purple-900/20 p-4 text-center backdrop-blur-sm">
        <p className="text-sm text-white">Пока нет доступных викторин</p>
      </div>
    )
  }

  return (
    <motion.div
      animate="visible"
      className="space-y-1"
      initial="hidden"
      variants={containerVariants}
    >
      {quizzes.map((quiz) => {
        const isDisabled = !quiz.isAvailable || quiz.solved

        return (
          <motion.div
            key={quiz.id}
            className={isDisabled ? "opacity-60" : ""}
            variants={itemVariants}
            onClick={() => {
              if (!isDisabled) {
                handleQuizClick(quiz.id)
              }
            }}
          >
            <QuizItem
              correctAnswers={quiz.correctAnswers}
              id={quiz.id}
              isAvailable={quiz.isAvailable}
              solved={quiz.solved}
              tasksCount={quiz.tasksCount}
              title={quiz.title}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default QuizList
