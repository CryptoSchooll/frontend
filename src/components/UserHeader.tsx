import type { FC } from "react"

import useBalanceStore from "@/hooks/balanceStore"

const UserHeader: FC = () => {
  const { balance, income, incomeMultiplier, actions } = useBalanceStore()

  return (
    <div className="mx-auto flex w-[27rem] items-center p-4">
      {/* Аватар */}
      <img
        alt="Pavel"
        className="h-16 w-16 rounded-full object-cover"
        src="https://via.placeholder.com/150" // Замените на реальное изображение
      />

      <div className="ml-4 flex flex-col">
        {/* Имя пользователя */}
        <span className="text-xl font-bold text-black">Pavel Durov</span>

        {/* Полоса со счётом (градиент) */}
        <div className="relative mt-2 h-10 w-72 rounded-full bg-gradient-to-r from-purple-700 to-purple-500">
          <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
            {balance}
          </span>

          {/* Кружок с множителем (x1.3) */}
          <div className="h-13 w-13 absolute right-0 top-0 flex -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-purple-800">
            <span className="text-sm text-white">x{incomeMultiplier}</span>
            {/* <div
              className="bg-purple-500"
              onClick={() => actions.activateMultiplier(1.3, 0.002)}
            >
              +
            </div> */}
          </div>
        </div>

        {/* Скорость */}
        <span className="mt-1 text-sm text-white">
          +{Math.floor(income * incomeMultiplier)}/sec
        </span>
      </div>
    </div>
  )
}

export default UserHeader
