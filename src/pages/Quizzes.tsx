import type React from "react"

import QuizList from "../components/Quiz/QuizList"

const Quizzes: React.FC = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-gray-50 p-4">
      <QuizList />
    </div>
  )
}

export default Quizzes
