import type { UIStore } from "@/hooks/uiStore"
import type { FC } from "react"

import { ClockIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Dialog, DialogContent } from "@/components/ui/Dialog"
import useBalanceStore from "@/hooks/balanceStore"
import { useQuizStore } from "@/hooks/quizStore"
import { useUIStore } from "@/hooks/uiStore"

interface Option {
  id: string
  text: string
}

interface Question {
  id: string
  text: string
  options: Option[]
  timeLimit: number // Ограничение времени для вопроса (сек)
}

export interface QuizSubmitResponse {
  quizId: string
  correctAnswers: number
  totalQuestions: number
  score: number
  reward: number
  updatedBalance: number
  correctAnswerIds: string[]
}

interface Answer {
  questionId: string
  answerId: string
  answerTime: number
}

const fetchQuizQuestions = async (_quizId: string): Promise<Question[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    {
      id: "q1",
      text: "Сколько будет 2+2?",
      timeLimit: 10,
      options: [
        { id: "a1", text: "3" },
        { id: "a2", text: "4" },
        { id: "a3", text: "5" },
        { id: "a4", text: "22" },
      ],
    },
    {
      id: "q2",
      text: "Столица Франции?",
      timeLimit: 10,
      options: [
        { id: "a5", text: "Берлин" },
        { id: "a6", text: "Лондон" },
        { id: "a7", text: "Париж" },
        { id: "a8", text: "Мадрид" },
      ],
    },
  ]
}

const submitQuizAnswers = async (
  _quizId: string,
  answers: Answer[],
  _totalTime: number,
): Promise<QuizSubmitResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const reward = 1000
  const currentBalance = useBalanceStore.getState().balance
  const updatedBalance = currentBalance + reward

  // Создаем моковый результат квиза
  const quizResult = {
    id: crypto.randomUUID(),
    quizId: _quizId,
    completedAt: new Date().toISOString(),
    correctAnswers: 1,
    totalQuestions: answers.length,
    reward,
    score: 50,
  }

  // Обновляем результат в store
  useQuizStore.getState().actions.updateQuizResult(_quizId, quizResult)

  return {
    quizId: _quizId,
    correctAnswers: 1,
    totalQuestions: answers.length,
    score: 50,
    reward,
    updatedBalance,
    correctAnswerIds: ["a2", "a7"],
  }
}

interface QuizBoxDialogProps {
  isQuizActive: UIStore["isQuizActive"]
  quizContext: UIStore["quizContext"]
  closeQuiz: UIStore["actions"]["closeQuiz"]
}

const QuizBoxDialog: FC<QuizBoxDialogProps> = ({
  isQuizActive,
  quizContext,
  closeQuiz,
}) => {
  const {
    progress,
    actions: { setProgress, clearProgress, setQuizFinished, clearSelection },
  } = useQuizStore()
  const { openQuizConfirm } = useUIStore((state) => state.actions)
  const [questions, setQuestions] = useState<Question[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<QuizSubmitResponse | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)

  // Получаем ID викторины из контекста
  const quizId = quizContext?.quizId || ""

  // При монтировании загружаем вопросы и инициализируем прогресс, если его ещё нет
  useEffect(() => {
    if (!isQuizActive || !quizId) return

    const init = async () => {
      const fetchedQuestions = await fetchQuizQuestions(quizId)
      setQuestions(fetchedQuestions)
      if (!progress) {
        setProgress({
          currentQuestionIndex: 0,
          answers: [],
          quizStartedAt: Date.now(),
          questionStartedAt: Date.now(),
        })
      }
    }
    init()
  }, [isQuizActive, quizId, progress, setProgress])

  const currentIndex = progress?.currentQuestionIndex || 0
  const currentQuestion = questions[currentIndex]

  // Обновление оставшегося времени для текущего вопроса
  useEffect(() => {
    if (!progress || !currentQuestion) return

    const questionStart = progress.questionStartedAt
    const limit = currentQuestion.timeLimit

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - questionStart) / 1000)
      const remaining = Math.max(limit - elapsed, 0)
      setTimeLeft(remaining)
      if (remaining === 0) {
        clearInterval(interval)
        // Автоматически засчитываем вопрос как неправильный, вызывая handleAnswer с пустым значением
        handleAnswer("")
      }
    }, 1000) // Обновляем каждую секунду вместо 100мс

    return () => clearInterval(interval)
  }, [progress, currentQuestion])

  const handleAnswer = (answerId: string) => {
    if (!progress || !currentQuestion) return
    const now = Date.now()
    const answerTimeSeconds = (now - progress.questionStartedAt) / 1000
    const newAnswer = {
      questionId: currentQuestion.id,
      answerId, // Если answerId пустой, значит пользователь не успел ответить
      answerTime: answerTimeSeconds,
    }

    const newAnswers = [...progress.answers, newAnswer]
    let newIndex = currentIndex
    if (currentIndex < questions.length - 1) {
      newIndex = currentIndex + 1
    }
    setProgress({
      currentQuestionIndex: newIndex,
      answers: newAnswers,
      quizStartedAt: progress.quizStartedAt,
      questionStartedAt: Date.now(),
    })

    if (currentIndex >= questions.length - 1) {
      handleSubmitQuiz(newAnswers, progress.quizStartedAt)
    }
  }

  const handleSubmitQuiz = async (answers: Answer[], quizStartedAt: number) => {
    setSubmitting(true)
    const totalTime = (Date.now() - quizStartedAt) / 1000
    try {
      const resp = await submitQuizAnswers(quizId, answers, totalTime)
      setResult(resp)
      setQuizFinished(true)
    } catch (err) {
      console.error("Ошибка при отправке викторины:", err)
    } finally {
      setSubmitting(false)
    }
  }

  const timePercentage = currentQuestion
    ? Math.round((timeLeft / currentQuestion.timeLimit) * 100)
    : 0

  // Получаем цвет таймера в зависимости от оставшегося времени
  const getTimerColor = () => {
    if (timePercentage > 60)
      return "bg-gradient-to-r from-emerald-500 to-teal-400"
    if (timePercentage > 30)
      return "bg-gradient-to-r from-amber-500 to-yellow-400"
    return "bg-gradient-to-r from-red-500 to-rose-400"
  }

  // Обработчик закрытия викторины
  const handleClose = () => {
    if (!result) {
      // Спрашиваем подтверждение выхода, если викторина не завершена
      openQuizConfirm({
        quizId,
        title: "",
        actionType: "exit",
      })
    } else {
      closeQuiz()
      clearProgress()
      clearSelection()
    }
  }

  return (
    <Dialog open={isQuizActive} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md overflow-hidden bg-gradient-to-b from-gray-900 to-purple-950 p-0">
        <div className="p-5">
          {result ? (
            // Результаты квиза
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <h2 className="mb-4 text-center text-2xl font-bold text-white">
                Результаты
              </h2>

              {/* Круговой индикатор с результатами */}
              <div className="relative mb-5 flex h-32 w-32 items-center justify-center rounded-full bg-purple-900/50 p-1">
                <div className="z-10 flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-b from-purple-800 to-purple-900 text-center">
                  <span className="text-3xl font-bold text-white">
                    {result.score}%
                  </span>
                  <span className="mt-1 text-xs text-purple-300">
                    {result.correctAnswers}/{result.totalQuestions} верно
                  </span>
                </div>

                {/* Внешний светящийся круг */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 opacity-30 blur-sm"></div>
              </div>

              {/* Награда */}
              <div className="my-4 rounded-lg bg-gradient-to-r from-purple-900/60 to-indigo-900/60 p-3 text-center">
                <p className="mb-1 text-sm text-purple-300">Ваша награда</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {result.reward}
                </p>
              </div>

              {/* Новый баланс */}
              <p className="mb-6 text-sm text-gray-400">
                Новый баланс: {result.updatedBalance}
              </p>

              <motion.button
                className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 py-3 font-medium text-white shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (result) {
                    useBalanceStore.getState().actions.addBalance(result.reward)
                  }
                  closeQuiz()
                  clearProgress()
                  clearSelection()
                }}
              >
                Забрать награду
              </motion.button>
            </motion.div>
          ) : questions.length === 0 ? (
            // Загрузка вопросов
            <div className="flex flex-col items-center py-10">
              <motion.div
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                className="mb-4 h-12 w-12 rounded-full border-4 border-purple-600 border-t-transparent"
              />
              <p className="text-purple-300">Загрузка вопросов...</p>
            </div>
          ) : submitting ? (
            // Отправка ответов
            <div className="flex flex-col items-center py-10">
              <motion.div
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                className="mb-4 h-12 w-12 rounded-full border-4 border-purple-600 border-t-transparent"
              />
              <p className="text-purple-300">Отправка ответов...</p>
            </div>
          ) : (
            // Интерфейс вопроса
            <>
              {/* Таймер */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <p className="mb-2 text-xs text-gray-400">
                    Вопрос {currentIndex + 1} из {questions.length}
                  </p>
                  <div className="flex items-center">
                    <ClockIcon className="mr-1 h-4 w-4 text-gray-400" />
                    <p className="text-sm font-medium text-gray-400">
                      {Math.floor(timeLeft)} сек
                    </p>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                  <motion.div
                    animate={{ width: `${timePercentage}%` }}
                    className={`h-full ${getTimerColor()}`}
                    initial={{ width: "100%" }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Текст вопроса */}
              <h2 className="mb-5 text-xl font-medium text-white">
                {currentQuestion?.text}
              </h2>

              {/* Варианты ответов */}
              <div className="flex flex-col space-y-3">
                {currentQuestion?.options.map((option) => (
                  <motion.button
                    key={option.id}
                    className="group w-full rounded-lg border border-purple-800 bg-gradient-to-r from-purple-900/50 to-purple-800/50 px-4 py-3 text-left text-purple-100 transition-all"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(168, 85, 247, 0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.id)}
                  >
                    <span className="group-hover:text-white">
                      {option.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </>
          )}

          {/* Кнопка закрытия */}
          {!result && (
            <motion.button
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
            >
              <XCircleIcon className="h-6 w-6" />
            </motion.button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QuizBoxDialog
