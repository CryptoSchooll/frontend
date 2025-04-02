import type { UIStore } from "@/hooks/uiStore"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import { useQuizStore } from "@/hooks/quizStore"
import { useUIStore } from "@/hooks/uiStore"

interface QuizConfirmDialogProps {
  isQuizConfirmOpen: UIStore["isQuizConfirmOpen"]
  quizConfirmContext: UIStore["quizConfirmContext"]
  closeQuizConfirm: UIStore["actions"]["closeQuizConfirm"]
}

const QuizConfirmDialog = ({
  isQuizConfirmOpen,
  quizConfirmContext,
  closeQuizConfirm,
}: QuizConfirmDialogProps) => {
  const quizActions = useQuizStore((state) => state.actions)
  const uiActions = useUIStore((state) => state.actions)

  // Обработчик подтверждающего действия
  const handleConfirmAction = () => {
    if (!quizConfirmContext) return

    const { quizId, actionType } = quizConfirmContext

    switch (actionType) {
      case "start":
        // Начать викторину
        quizActions.clearProgress()
        uiActions.openQuiz({ quizId })
        break

      case "continue":
        // Продолжить незавершенную викторину
        uiActions.openQuiz({ quizId })
        break

      case "exit": {
        // Выйти из викторины с нулевым результатом
        const quizResult = {
          id: crypto.randomUUID(),
          quizId,
          completedAt: new Date().toISOString(),
          correctAnswers: 0,
          totalQuestions: 0,
          reward: 0,
          score: 0,
        }

        quizActions.updateQuizResult(quizId, quizResult)
        quizActions.setQuizFinished(true)
        uiActions.closeQuiz()
        break
      }
    }

    closeQuizConfirm()
  }

  // Обработчик отмены
  const handleCancel = () => {
    if (!quizConfirmContext) return

    const { quizId, actionType } = quizConfirmContext

    switch (actionType) {
      case "start":
        // При отмене начала викторины очищаем выбор
        quizActions.clearSelection()
        break

      case "continue": {
        // При отказе от продолжения завершаем с нулем
        const quizResult = {
          id: crypto.randomUUID(),
          quizId,
          completedAt: new Date().toISOString(),
          correctAnswers: 0,
          totalQuestions: 0,
          reward: 0,
          score: 0,
        }

        quizActions.updateQuizResult(quizId, quizResult)
        quizActions.setQuizFinished(true)
        quizActions.clearProgress()
        break
      }

      case "exit":
        // При отмене выхода ничего не делаем
        break
    }

    closeQuizConfirm()
  }

  // Получение текста сообщения
  const getMessage = () => {
    if (!quizConfirmContext) return ""

    const { title, actionType } = quizConfirmContext

    switch (actionType) {
      case "start":
        return `Начать викторину "${title || "Без названия"}"?`
      case "continue":
        return "Продолжить незавершенную викторину?"
      case "exit":
        return "Вы уверены, что хотите выйти? Викторина будет считаться завершенной с нулевым результатом."
      default:
        return ""
    }
  }

  // Получение текста кнопок
  const getButtonText = () => {
    if (!quizConfirmContext) return { confirm: "Подтвердить", cancel: "Отмена" }

    const { actionType } = quizConfirmContext

    switch (actionType) {
      case "start":
        return { confirm: "Начать", cancel: "Отмена" }
      case "continue":
        return { confirm: "Продолжить", cancel: "Закончить" }
      case "exit":
        return { confirm: "Выйти", cancel: "Остаться" }
      default:
        return { confirm: "Подтвердить", cancel: "Отмена" }
    }
  }

  // Определяем, можно ли закрыть диалог при клике вне окна
  const allowClose = quizConfirmContext?.actionType !== "continue"

  const buttonText = getButtonText()

  return (
    <Dialog
      open={isQuizConfirmOpen}
      onOpenChange={(open) => {
        // Если диалог закрывается (open = false) и это не окно продолжения, то закрываем
        // Иначе (для продолжения) игнорируем попытку закрытия при клике вне окна
        if (!open && allowClose) {
          closeQuizConfirm()
        }
      }}
    >
      <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-purple-950">
        <DialogHeader>
          <DialogTitle className="text-white">Подтверждение</DialogTitle>
          <DialogDescription className="text-purple-200">
            {getMessage()}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex gap-3">
          <DialogClose
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800 py-3 font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
            onClick={handleCancel}
          >
            {buttonText.cancel}
          </DialogClose>
          <button
            className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 py-3 font-medium text-white shadow-lg hover:from-purple-500 hover:to-purple-400"
            onClick={handleConfirmAction}
          >
            {buttonText.confirm}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default QuizConfirmDialog
