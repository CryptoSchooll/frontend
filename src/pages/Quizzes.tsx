import type { FC } from "react"

import QuizList from "../components/Quiz/QuizList"

const Quizzes: FC = () => {
  return (
    // Добавляем класс "relative", чтобы абсолютная позиция учитывала этот блок
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-gray-50 p-4">
      {/* Ваш новый элемент */}
     

      {/* Список квизов */}
      <QuizList />
    </div>
  )
}

export default Quizzes
