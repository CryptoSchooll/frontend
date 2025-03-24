import type React from "react"

import QuizList from "../components/Quiz/QuizList"

const Quizzes: React.FC = () => {
  return (
    // Добавляем класс "relative", чтобы абсолютная позиция учитывала этот блок
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-gray-50 p-4">
      {/* Ваш новый элемент */}
      <div className="absolute left-[182px] top-[130px] justify-start text-center font-['Intro_Light'] text-base font-light leading-snug text-black">
        quiz
      </div>

      {/* Список квизов */}
      <QuizList />
    </div>
  )
}

export default Quizzes
