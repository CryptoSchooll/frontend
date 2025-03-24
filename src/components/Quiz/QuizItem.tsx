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
  tasksCount,
  isAvailable,
  solved,
  correctAnswers,
}) => {
  // Подготавливаем текст статуса (справа)
  let statusText = "→"
  if (solved) {
    statusText = `completed ${correctAnswers}/${tasksCount}`
  } else if (!isAvailable) {
    statusText = "locked"
  }

  return (
    <div className="relative h-14 w-96" data-id={id}>
      {/* Фон серого цвета на всю ширину/высоту */}
      <div className="absolute inset-0 bg-zinc-300" />

      {/* Крупная цифра (id) слева, по центру вертикали */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 font-['Intro_Book'] text-5xl leading-none text-black">
        {id}
      </div>

      {/* Надпись QUIZ #... немного правее цифры, по центру вертикали */}
      <div className="absolute left-14 top-1/2 -translate-y-1/2 font-['Intro_Book'] text-xl font-normal leading-snug text-black">
        {`QUIZ #${id}`}
      </div>

      {/* Статус (completed, locked, →) прижат к правому краю, по центру вертикали */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-right font-['Intro_Book'] text-base font-normal leading-snug text-black">
        {statusText}
      </div>
    </div>
  )
}

export default QuizItem
