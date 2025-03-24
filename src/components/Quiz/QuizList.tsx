import { useCallback, useEffect, useState } from "react"

import ConfirmModal from "./ConfirmModal"
import QuizBox from "./QuizBox"
import QuizItem from "./QuizItem"

import { useQuizStore } from "@/hooks/quizStore"

const QuizList: React.FC = () => {
  const {
    quizzes,
    selectedQuiz,
    progress,
    quizFinished,
    loading,
    error,
    fetchQuizzes,
    selectQuiz,
    clearSelection,
    clearProgress,
  } = useQuizStore()

  const [showQuiz, setShowQuiz] = useState(false)
  const [showContinueModal, setShowContinueModal] = useState(false)

  // Загружаем квизы при монтировании компонента.
  useEffect(() => {
    fetchQuizzes()
  }, [fetchQuizzes])

  // Объединяем логику показа модального окна "Продолжить викторину?" в один эффект.
  useEffect(() => {
    if (progress && selectedQuiz && !quizFinished) {
      setShowContinueModal(true)
    } else {
      setShowContinueModal(false)
    }
  }, [progress, selectedQuiz, quizFinished])

  // Если состояние из store сброшено, то сбрасываем и локальное состояние модалки.
  useEffect(() => {
    if (!progress && !selectedQuiz) {
      setShowContinueModal(false)
    }
  }, [progress, selectedQuiz])

  const handleQuizClick = useCallback(
    (quizId: string) => {
      const quiz = quizzes.find((q) => q.id === quizId)
      if (quiz) {
        selectQuiz(quiz)
        clearProgress() // сбрасываем старый прогресс при выборе нового квиза
      }
    },
    [quizzes, selectQuiz, clearProgress],
  )

  // Если пользователь подтверждает старт нового квиза
  const handleConfirmNew = useCallback(() => {
    setShowQuiz(true)
  }, [])

  // Обработка модального окна "Продолжить викторину?"
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

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>

  if (showQuiz && selectedQuiz) {
    return <QuizBox quizId={selectedQuiz.id} onClose={handleCollectReward} />
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-col space-y-2">
        {quizzes.map((quiz) => (
          <div key={quiz.id} onClick={() => handleQuizClick(quiz.id)}>
            <QuizItem
              correctAnswers={quiz.correctAnswers}
              id={quiz.id}
              isAvailable={quiz.isAvailable}
              solved={quiz.solved}
              tasksCount={quiz.tasksCount}
              title={quiz.title}
            />
          </div>
        ))}
      </div>

      {/* Если выбран квиз и нет сохранённого прогресса, показываем окно подтверждения нового запуска */}
      {selectedQuiz && !showQuiz && !showContinueModal && (
        <ConfirmModal
          message={`Do you want to start ${selectedQuiz.title}?`}
          onCancel={clearSelection}
          onConfirm={handleConfirmNew}
        />
      )}

      {/* Если обнаружен сохранённый прогресс, предлагаем продолжить викторину */}
      {showContinueModal && (
        <ConfirmModal
          message="Продолжить викторину?"
          onCancel={handleContinueCancel}
          onConfirm={handleContinueConfirm}
        />
      )}
    </div>
  )
}

export default QuizList
