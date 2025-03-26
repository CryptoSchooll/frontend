import type { FC } from "react"

import { useEffect, useState } from "react"

import { useQuizStore } from "@/hooks/quizStore"

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

const fetchQuizQuestions = async (quizId: string): Promise<Question[]> => {
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
  quizId: string,
  answers: any,
  totalCompletionTime: number,
): Promise<QuizSubmitResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    quizId,
    correctAnswers: 1,
    totalQuestions: answers.length,
    score: 50,
    reward: 1000,
    updatedBalance: 151000,
    correctAnswerIds: ["a2", "a7"],
  }
}

interface QuizBoxProps {
  quizId: string
  onClose: () => void // Вызывается при нажатии кнопки "Забрать награду"
}

const QuizBox: FC<QuizBoxProps> = ({ quizId, onClose }) => {
  const {
    progress,
    setProgress,
    clearProgress,
    setQuizFinished,
    clearSelection,
  } = useQuizStore()
  const [questions, setQuestions] = useState<Question[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<QuizSubmitResponse | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)

  // При монтировании загружаем вопросы и инициализируем прогресс, если его ещё нет
  useEffect(() => {
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
  }, [quizId, progress, setProgress])

  const currentIndex = progress?.currentQuestionIndex || 0
  const currentQuestion = questions[currentIndex]

  // Обновление оставшегося времени для текущего вопроса
  useEffect(() => {
    if (!progress || !currentQuestion) return

    const questionStart = progress.questionStartedAt
    const limit = currentQuestion.timeLimit

    const interval = setInterval(() => {
      const elapsed = (Date.now() - questionStart) / 1000
      const remaining = Math.max(limit - elapsed, 0)
      setTimeLeft(remaining)
      if (remaining === 0) {
        clearInterval(interval)
        // Автоматически засчитываем вопрос как неправильный, вызывая handleAnswer с пустым значением
        handleAnswer("")
      }
    }, 100)

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

  const handleSubmitQuiz = async (answers: any, quizStartedAt: number) => {
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/40">
      <div className="relative w-full max-w-lg rounded-md bg-white p-4 shadow-lg">
        {result ? (
          <div>
            <h2 className="mb-2 text-xl font-bold">Результаты</h2>
            <p>
              Правильных ответов: {result.correctAnswers} из{" "}
              {result.totalQuestions}
            </p>
            <p>Счёт: {result.score}</p>
            <p>Награда: {result.reward}</p>
            <p>Новый баланс: {result.updatedBalance}</p>
            <button
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
              onClick={() => {
                onClose()
                clearProgress()
                clearSelection()
              }}
            >
              Забрать награду
            </button>
          </div>
        ) : questions.length === 0 ? (
          <div>Загрузка вопросов...</div>
        ) : submitting ? (
          <div>Отправка ответов...</div>
        ) : (
          <>
            {/* Таймер-бар */}
            <div className="mb-4">
              <div className="h-2 w-full rounded bg-gray-200">
                <div
                  className="h-2 rounded bg-blue-500"
                  style={{
                    width: `${timePercentage}%`,
                    transition: "width 0.1s linear",
                  }}
                ></div>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Осталось времени: {timeLeft.toFixed(1)} сек.
              </p>
            </div>
            <h2 className="mb-2 text-xl font-bold">
              Вопрос {currentIndex + 1} / {questions.length}
            </h2>
            <p className="mb-4">{currentQuestion.text}</p>
            <ul className="space-y-2">
              {currentQuestion.options.map((opt) => (
                <li key={opt.id}>
                  <button
                    className="rounded bg-gray-300 px-4 py-2"
                    onClick={() => handleAnswer(opt.id)}
                  >
                    {opt.text}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default QuizBox
