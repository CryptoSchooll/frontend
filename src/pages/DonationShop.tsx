import type { FC } from "react"

import { CurrencyDollarIcon, SparklesIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import { useState } from "react"

import useBalanceStore from "@/hooks/balanceStore"

interface DonationPackage {
  id: string
  name: string
  amount: number
  price: number
  bonus: number
  isPopular: boolean
}

const donationPackages: DonationPackage[] = [
  {
    id: "basic",
    name: "Базовый",
    amount: 1000,
    price: 50,
    bonus: 0,
    isPopular: false,
  },
  {
    id: "standard",
    name: "Стандарт",
    amount: 3000,
    price: 140,
    bonus: 5,
    isPopular: true,
  },
  {
    id: "premium",
    name: "Премиум",
    amount: 7000,
    price: 300,
    bonus: 10,
    isPopular: false,
  },
  {
    id: "ultimate",
    name: "Ультимейт",
    amount: 15000,
    price: 590,
    bonus: 15,
    isPopular: false,
  },
]

const DonationShop: FC = () => {
  const { actions } = useBalanceStore()
  const [, setSelectedPackage] = useState<DonationPackage | null>(null)

  const handlePurchase = (pkg: DonationPackage) => {
    // Здесь будет интеграция с платежным шлюзом
    // Временно имитируем успешную покупку
    actions.addBalance(pkg.amount)
    // Сбрасываем выбранный пакет
    setSelectedPackage(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 p-4">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Пополнение баланса
        </h1>
        <div className="mb-8 rounded-xl bg-gradient-to-b from-purple-800/50 to-indigo-900/50 p-4 backdrop-blur-lg">
          <p className="mb-2 text-center text-sm text-purple-300">
            Пополняйте баланс и получайте бонусы!
          </p>
          <div className="flex justify-center gap-2">
            <SparklesIcon className="h-6 w-6 text-purple-300" />
            <span className="text-lg font-bold text-white">
              = Внутриигровая валюта
            </span>
          </div>
        </div>
        <div className="scrollbar-none space-y-4 overflow-y-auto">
          {donationPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={`relative overflow-hidden rounded-xl border ${
                pkg.isPopular
                  ? "border-purple-500 bg-gradient-to-r from-purple-900/70 to-indigo-900/70"
                  : "border-purple-800/50 bg-gradient-to-r from-purple-950/70 to-indigo-950/70"
              } p-4 shadow-lg backdrop-blur-sm`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPackage(pkg)}
            >
              {pkg.isPopular && (
                <div className="absolute -right-8 top-3 rotate-45 bg-purple-500 px-10 py-1 text-xs font-bold text-white shadow-md">
                  Популярный
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                  <div className="mt-1 flex items-center">
                    <SparklesIcon className="mr-1 h-4 w-4 text-yellow-400" />
                    <span className="text-xl font-bold text-yellow-400">
                      {pkg.amount.toLocaleString()}
                    </span>
                    {pkg.bonus > 0 && (
                      <span className="ml-2 rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
                        +{pkg.bonus}%
                      </span>
                    )}
                  </div>
                </div>
                <motion.button
                  className="rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-2 font-medium text-white shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePurchase(pkg)
                  }}
                >
                  <span className="flex items-center">
                    <CurrencyDollarIcon className="mr-1 h-4 w-4" />
                    {pkg.price} руб.
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            При возникновении проблем с платежами, обратитесь в нашу
            <a className="ml-1 text-purple-400 hover:text-purple-300" href="#">
              службу поддержки
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default DonationShop
