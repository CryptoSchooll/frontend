import { motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"

import ConfirmModal from "./ConfirmModal"
import QuizBox from "./QuizBox"
import QuizItem from "./QuizItem"

import { useQuizStore } from "@/hooks/quizStore"

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
    actions: { selectQuiz, clearSelection, clearProgress },
  } = useQuizStore()

  const [showQuiz, setShowQuiz] = useState(false)
  const [showContinueModal, setShowContinueModal] = useState(false)
  const [hasCheckedProgress, setHasCheckedProgress] = useState(false)

  // Обработка состояния прогресса при загрузке
  useEffect(() => {
    if (!hasCheckedProgress && !loading) {
      // Проверяем наличие сохраненного прогресса и выбранной викторины
      if (progress && selectedQuiz && !quizFinished) {
        // Если есть прогресс и викторина не завершена, показываем модальное окно
        setShowContinueModal(true)
      } else if (selectedQuiz && !progress) {
        // Если есть выбранная викторина, но нет прогресса, показываем окно подтверждения
        setShowQuiz(true)
      }
      setHasCheckedProgress(true)
    }
  }, [progress, selectedQuiz, quizFinished, loading, hasCheckedProgress])

  // Если состояние из store сброшено, то сбрасываем и локальное состояние модалки
  useEffect(() => {
    if (!progress && !selectedQuiz) {
      setShowContinueModal(false)
      setShowQuiz(false)
    }
  }, [progress, selectedQuiz])

  // Обработчики действий
  const handleQuizClick = useCallback(
    (quizId: string) => {
      const quiz = quizzes.find((q) => q.id === quizId)
      if (quiz) {
        selectQuiz(quiz)
        clearProgress()
        // Не открываем викторину сразу, подтверждение откроется через условный рендеринг
      }
    },
    [quizzes, selectQuiz, clearProgress],
  )

  const handleConfirmNew = useCallback(() => {
    setShowQuiz(true)
  }, [])

  const handleContinueConfirm = useCallback(() => {
    setShowContinueModal(false)
    setShowQuiz(true)
  }, [])

  const handleContinueCancel = useCallback(() => {
    setShowContinueModal(false)
    clearProgress()
    clearSelection()
  }, [clearProgress, clearSelection])

  const handleCollectReward = useCallback(() => {
    clearProgress()
    clearSelection()
    setShowQuiz(false)
  }, [clearProgress, clearSelection])

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

      {showContinueModal && (
        <ConfirmModal
          message="Продолжить незавершенную викторину?"
          onCancel={handleContinueCancel}
          onConfirm={handleContinueConfirm}
        />
      )}

      {selectedQuiz && !showQuiz && !showContinueModal && (
        <ConfirmModal
          message={`Начать викторину "${selectedQuiz.title || `Викторина ${selectedQuiz.id}`}"?`}
          onCancel={clearSelection}
          onConfirm={handleConfirmNew}
        />
      )}

      {showQuiz && selectedQuiz && (
        <QuizBox quizId={selectedQuiz.id} onClose={handleCollectReward} />
      )}
    </motion.div>
  )
}

export default QuizList
