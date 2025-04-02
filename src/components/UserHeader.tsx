import type { FC } from "react"

import { SparklesIcon, TrophyIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import useBalanceStore from "@/hooks/balanceStore"
import usePage from "@/hooks/usePage"

const UserHeader: FC = () => {
  const { balance, income } = useBalanceStore()
  const { switchPage } = usePage()
  const [animateBalance, setAnimateBalance] = useState(false)

  // Анимация при изменении баланса
  useEffect(() => {
    setAnimateBalance(true)
    const timer = setTimeout(() => setAnimateBalance(false), 1000)
    return () => clearTimeout(timer)
  }, [balance])

  const handleBalanceClick = () => {
    switchPage("donationShop")
  }

  return (
    <div className="relative mx-auto w-full max-w-md px-2 py-2">
      {/* Фоновый градиент с размытием */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-900/80 via-indigo-900/70 to-purple-900/80 shadow-lg backdrop-blur-md"></div>

      {/* Декоративные элементы */}
      <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-purple-500/20 blur-xl"></div>
      <div className="absolute -bottom-2 -left-2 h-12 w-12 rounded-full bg-indigo-500/20 blur-lg"></div>

      {/* Основной контент */}
      <div className="relative flex items-center justify-between px-3 py-2">
        {/* Аватар пользователя */}
        <div className="relative h-12 w-12 shrink-0">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-70 blur-sm"></div>
          <img
            alt="Аватар"
            className="relative h-12 w-12 rounded-full border-2 border-white/30 object-cover"
            src="https://via.placeholder.com/150"
          />
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white shadow-lg">
            5
          </div>
        </div>

        {/* Средняя часть - Баланс и доход */}
        <motion.div
          animate={{ scale: animateBalance ? 1.05 : 1 }}
          className="mx-3 flex-1 cursor-pointer rounded-lg bg-gradient-to-r from-purple-900/60 to-indigo-900/60 p-2 text-center shadow-inner hover:from-purple-800/70 hover:to-indigo-800/70"
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          onClick={handleBalanceClick}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <SparklesIcon className="h-4 w-4 text-purple-300" />
              <motion.span
                animate={{ scale: animateBalance ? 1.1 : 1 }}
                className="text-xl font-bold text-white"
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                {balance.toLocaleString()}
              </motion.span>
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-purple-300">
              <span className="text-green-400">+{income}/сек</span>
            </div>
          </div>
        </motion.div>

        {/* Правая часть - Множитель и бонусы */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex h-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-700 to-indigo-600 px-3 text-sm font-bold text-white shadow-md">
            <span>×{(1.3).toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-purple-200">
            <TrophyIcon className="h-3 w-3 text-yellow-400" />
            <span>Ранг 3</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHeader
