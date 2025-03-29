import type { FC } from "react"

import { FaCog, FaHome, FaTasks, FaUser, FaWallet } from "react-icons/fa"

import usePage from "@/hooks/usePage"

const Navbar: FC = () => {
  const { switchPage } = usePage()

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 rounded-full border border-gray-700 bg-gray-900">
      <ul className="mx-auto grid h-16 grid-cols-5 font-medium">
        {/* 1) Задания (tasks) */}
        <li className="h-full">
          <button
            className="group flex h-full w-full flex-col items-center justify-center rounded-s-full hover:bg-gray-800"
            type="button"
            onClick={() => switchPage("tasks")}
          >
            <FaTasks className="mb-1 h-5 w-5 text-gray-200 transition-colors group-hover:text-purple-400" />
            <span className="text-sm text-gray-200 transition-colors group-hover:text-purple-400">
              Tasks
            </span>
          </button>
        </li>

        {/* 2) Квизы (quizzes) */}
        <li className="h-full">
          <button
            className="group flex h-full w-full flex-col items-center justify-center hover:bg-gray-800"
            type="button"
            onClick={() => switchPage("quizzes")}
          >
            <FaCog className="mb-1 h-5 w-5 text-gray-200 transition-colors group-hover:text-purple-400" />
            <span className="text-sm text-gray-200 transition-colors group-hover:text-purple-400">
              Quizzes
            </span>
          </button>
        </li>

        {/* 3) Дом (home) — центральная кнопка, выступающая выше остальных */}
        <li className="relative -mt-4 flex h-full items-center justify-center">
          <button
            className="group flex h-16 w-16 items-center justify-center rounded-full bg-purple-700 font-medium hover:bg-purple-600 focus:outline-none"
            type="button"
            onClick={() => switchPage("home")}
          >
            <FaHome className="h-6 w-6 text-white" />
            <span className="sr-only">Home</span>
          </button>
        </li>

        {/* 4) Прямой эфир (broadcast) */}
        <li className="h-full">
          <button
            className="group flex h-full w-full flex-col items-center justify-center hover:bg-gray-800"
            type="button"
            onClick={() => switchPage("broadcast")}
          >
            <FaWallet className="mb-1 h-5 w-5 text-gray-200 transition-colors group-hover:text-purple-400" />
            <span className="text-sm text-gray-200 transition-colors group-hover:text-purple-400">
              Broadcast
            </span>
          </button>
        </li>

        {/* 5) Клубы (club) */}
        <li className="h-full">
          <button
            className="group flex h-full w-full flex-col items-center justify-center rounded-e-full hover:bg-gray-800"
            type="button"
            onClick={() => switchPage("club")}
          >
            <FaUser className="mb-1 h-5 w-5 text-gray-200 transition-colors group-hover:text-purple-400" />
            <span className="text-sm text-gray-200 transition-colors group-hover:text-purple-400">
              Club
            </span>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
