import type { FC } from "react"

const UserHeader: FC = () => {
  return (
    <div className="mb-4 flex w-full items-center justify-between">
      <div className="flex items-center space-x-2">
        {/* Заглушка для аватара */}
        <div className="h-10 w-10 rounded-full bg-gray-300" />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-700">Gleb Durov</span>
          <span className="text-sm text-gray-500">+1.2K/min</span>
        </div>
      </div>
      {/* Очки и множитель */}
      <div className="flex flex-col items-end">
        <span className="text-xl font-bold text-gray-800">4.345.356</span>
        <span className="text-sm text-gray-500">x1.3</span>
      </div>
    </div>
  )
}

export default UserHeader
