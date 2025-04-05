import type { FC } from "react"

import {
  BookOpenIcon,
  HomeIcon,
  SparklesIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import usePage from "@/hooks/usePage"
import { useTranslationStore } from "@/hooks/useTranslationStore"

// Вариант анимации для иконок
const iconVariants = {
  active: {
    scale: 1.15,
    y: -2,
    transition: { type: "spring", stiffness: 500, damping: 10 },
  },
  inactive: {
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 25 },
  },
}

// Вариант анимации для кнопки home
const homeVariants = {
  active: {
    scale: 1.1,
    boxShadow: "0 0 15px 5px rgba(168, 85, 247, 0.5)",
    transition: { type: "spring", stiffness: 500, damping: 10 },
  },
  inactive: {
    scale: 1,
    boxShadow: "0 0 10px 2px rgba(168, 85, 247, 0.3)",
    transition: { type: "spring", stiffness: 500, damping: 25 },
  },
  tap: {
    scale: 0.95,
    transition: { type: "spring", stiffness: 500, damping: 10 },
  },
}

const Navbar: FC = () => {
  const { currentPage, switchPage } = usePage()
  const { translations } = useTranslationStore()

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 transform rounded-full shadow-xl">
      {/* Фоновый градиент с размытием */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/90 via-purple-950/90 to-gray-900/90 shadow-lg backdrop-blur-md"></div>

      <div className="relative">
        <ul className="mx-auto grid h-16 grid-cols-5 font-medium">
          {/* 1) Задания (tasks) */}
          <li className="relative h-full">
            <motion.button
              animate={currentPage === "tasks" ? "active" : "inactive"}
              className="group flex h-full w-full flex-col items-center justify-center"
              initial="inactive"
              type="button"
              variants={iconVariants}
              whileTap="tap"
              onClick={() => switchPage("tasks")}
            >
              <SparklesIcon
                className={`h-5 w-5 transition-colors ${currentPage === "tasks" ? "text-purple-400" : "text-gray-300"}`}
              />
              <span
                className={`mt-1 text-xs transition-colors ${currentPage === "tasks" ? "text-purple-300" : "text-gray-400"}`}
              >
                {translations.navbarTasks}
              </span>
            </motion.button>
          </li>

          {/* 2) Квизы (quizzes) */}
          <li className="relative h-full">
            <motion.button
              animate={currentPage === "quizzes" ? "active" : "inactive"}
              className="group flex h-full w-full flex-col items-center justify-center"
              initial="inactive"
              type="button"
              variants={iconVariants}
              whileTap="tap"
              onClick={() => switchPage("quizzes")}
            >
              <BookOpenIcon
                className={`h-5 w-5 transition-colors ${currentPage === "quizzes" ? "text-purple-400" : "text-gray-300"}`}
              />
              <span
                className={`mt-1 text-xs transition-colors ${currentPage === "quizzes" ? "text-purple-300" : "text-gray-400"}`}
              >
                {translations.navbarQuizzes}
              </span>
            </motion.button>
          </li>

          {/* 3) Дом (home) — центральная кнопка */}
          <li className="relative -mt-6 flex h-full items-center justify-center">
            <motion.button
              animate={currentPage === "home" ? "active" : "inactive"}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-purple-700 shadow-[0_0_10px_2px_rgba(168,85,247,0.3)]"
              initial="inactive"
              type="button"
              variants={homeVariants}
              whileTap="tap"
              onClick={() => switchPage("home")}
            >
              <HomeIcon className="h-7 w-7 text-white" />
              <span className="sr-only">Home</span>
            </motion.button>

            {/* Пульсирующий эффект за кнопкой, если активна */}
            {currentPage === "home" && (
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.3, 0.7] }}
                className="absolute inset-0 rounded-full bg-purple-500/30 blur-md"
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </li>

          {/* 4) Прямой эфир (broadcast) */}
          <li className="relative h-full">
            <motion.button
              animate={currentPage === "broadcast" ? "active" : "inactive"}
              className="group flex h-full w-full flex-col items-center justify-center"
              initial="inactive"
              type="button"
              variants={iconVariants}
              whileTap="tap"
              onClick={() => switchPage("broadcast")}
            >
              <TrophyIcon
                className={`h-5 w-5 transition-colors ${currentPage === "broadcast" ? "text-purple-400" : "text-gray-300"}`}
              />
              <span
                className={`mt-1 text-xs transition-colors ${currentPage === "broadcast" ? "text-purple-300" : "text-gray-400"}`}
              >
                {translations.navbarBroadcast}
              </span>
            </motion.button>
          </li>

          {/* 5) Клубы (club) */}
          <li className="relative h-full">
            <motion.button
              animate={currentPage === "club" ? "active" : "inactive"}
              className="group flex h-full w-full flex-col items-center justify-center"
              initial="inactive"
              type="button"
              variants={iconVariants}
              whileTap="tap"
              onClick={() => switchPage("club")}
            >
              <UserGroupIcon
                className={`h-5 w-5 transition-colors ${currentPage === "club" ? "text-purple-400" : "text-gray-300"}`}
              />
              <span
                className={`mt-1 text-xs transition-colors ${currentPage === "club" ? "text-purple-300" : "text-gray-400"}`}
              >
                {translations.navbarClubs}
              </span>
            </motion.button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
