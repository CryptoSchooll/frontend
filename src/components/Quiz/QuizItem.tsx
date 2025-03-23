import type React from "react"

interface QuizItemProps {
  id: string
  title: string
  tasksCount: number
  isAvailable: boolean
  solved: boolean
  correctAnswers: number
}

const QuizItem: React.FC<QuizItemProps> = ({
  id,
  title,
  tasksCount,
  isAvailable,
  solved,
  correctAnswers,
}) => {
  return (
    <div
      className={`flex w-full items-center justify-between rounded-md border border-gray-300 p-3 shadow-sm ${
        !isAvailable ? "opacity-50" : ""
      }`}
      data-id={id}
    >
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">{title}</span>
        <span className="text-sm text-gray-500">
          {solved
            ? `Решено: ${correctAnswers}/${tasksCount}`
            : `Заданий: ${tasksCount}`}
        </span>
      </div>
      <span className="text-sm text-gray-500">→</span>
    </div>
  )
}

export default QuizItem
