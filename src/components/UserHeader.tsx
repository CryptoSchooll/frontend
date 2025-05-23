import type { FC } from "react"

import { SparklesIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import useBalanceStore from "@/hooks/balanceStore"
import usePage from "@/hooks/usePage"
import { useTranslationStore } from "@/hooks/useTranslationStore"

const UserHeader: FC = () => {
  const { balance, income, incomeMultiplier, actions } = useBalanceStore()
  const { switchPage } = usePage()
  const [animateBalance, setAnimateBalance] = useState(false)
  const { language, switchLanguage } = useTranslationStore()

  useEffect(() => {
    const onTick = () => {
      actions.updateBalance()
      actions.checkForMultiplier()
      actions.checkForElectricity()
    }
    const interval = setInterval(onTick, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [
    actions.updateBalance,
    actions.checkForMultiplier,
    actions.checkForElectricity,
  ])

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
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-950/90 via-purple-950/80 to-indigo-950/90 shadow-xl backdrop-blur-md"></div>

      {/* Декоративные элементы - узоры и свечение */}
      <div className="absolute -left-1 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-purple-600/10 blur-2xl"></div>
      <div className="absolute -right-1 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-xl"></div>
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>

      {/* Основной контент */}
      <div className="relative flex items-center justify-between gap-3 px-3 py-2">
        {/* Аватар пользователя с улучшенным свечением */}
        <div className="relative h-12 w-12 shrink-0">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 opacity-80 blur-[2px]"></div>
          <img
            alt="Аватар"
            className="relative h-12 w-12 rounded-full border border-white/40 object-cover shadow-inner"
            src="https://via.placeholder.com/150"
          />
        </div>

        {/* Средняя часть - Баланс и доход с улучшенным дизайном */}
        <motion.div
          animate={{ scale: animateBalance ? 1.05 : 1 }}
          className="flex-1 cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900/60 to-purple-900/60 p-2 text-center shadow-inner ring-1 ring-white/5 hover:from-indigo-800/60 hover:to-purple-800/60"
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          onClick={handleBalanceClick}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <SparklesIcon className="h-4 w-4 text-purple-300" />
              <motion.span
                animate={{ scale: animateBalance ? 1.1 : 1 }}
                className="text-xl font-bold tracking-tight text-white drop-shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                {balance.toLocaleString()}
              </motion.span>
            </div>
            <div className="mt-0.5 text-xs font-medium text-purple-300/90">
              <span className="text-green-400">+{income}</span>
              <span className="ml-1 text-purple-300/80">/сек</span>
            </div>
          </div>
        </motion.div>

        {/* Правая часть - множитель с улучшенным дизайном */}
        <div className="flex h-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-800 to-indigo-900 px-3 font-medium text-white shadow-lg ring-1 ring-white/10">
          <span className="text-sm">×{incomeMultiplier.toFixed(1)}</span>
        </div>

        <div className="" onClick={() => switchLanguage()}>
          {language}
        </div>
      </div>
    </div>
  )
}

export default UserHeader
