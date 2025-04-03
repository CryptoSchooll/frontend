import type { FC } from "react"

import QuizList from "../components/Quiz/QuizList"

const Quizzes: FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-b from-[#0d0d1a] via-[#121218] to-[#1a0c2e] p-2 text-white">
      {/* Декоративные элементы фона */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 top-20 h-80 w-80 rounded-full bg-blue-700/10 blur-3xl"></div>
        <div className="absolute -left-10 bottom-10 h-96 w-96 rounded-full bg-purple-700/10 blur-3xl"></div>
        <div className="absolute bottom-40 right-0 h-64 w-64 rounded-full bg-pink-700/5 blur-3xl"></div>
      </div>

      {/* Заголовок и описание */}
      <div className="relative mb-4 text-center">
        <h1 className="text-2xl font-bold text-white">Викторины</h1>
        <p className="mt-1 text-sm text-purple-300">
          Проверьте свои знания и получите награды
        </p>
      </div>

      {/* Статистика и достижения - адаптивная сетка */}
      <div className="relative mb-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-gradient-to-br from-purple-900/20 to-purple-700/20 p-3 backdrop-blur-sm">
          <h3 className="mb-1 text-sm font-medium text-white">Пройдено</h3>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-white">3</span>
            <span className="text-xs text-purple-300">из 12 викторин</span>
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-700/20 p-3 backdrop-blur-sm">
          <h3 className="mb-1 text-sm font-medium text-white">Заработано</h3>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-white">750</span>
            <span className="text-xs text-blue-300">токенов</span>
          </div>
        </div>
      </div>

      {/* Список доступных викторин */}
      <div className="scrollbar-none relative flex-1 overflow-y-auto pb-16">
        <h2 className="mb-3 text-lg font-semibold text-white">
          Доступные викторины
        </h2>
        <QuizList />
      </div>
    </div>
  )
}

export default Quizzes
