// src/components/Tasks/TaskItem.tsx

import type { Task } from "@/hooks/types" // Adjust path
import type { FC } from "react"

import {
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline"
import {
  CurrencyDollarIcon,
  FireIcon,
  StarIcon,
} from "@heroicons/react/24/solid"

interface TaskItemProps extends Task {
  onClick: (taskId: string) => void
}

const TaskItem: FC<TaskItemProps> = ({
  id,
  localizedName,
  localizedDescription,
  reward,
  status,
  isAvailable,
  nextAvailableAt,
  taskType,
  onClick,
}) => {
  // Определяем визуальное состояние задачи
  const isDisabledVisual = !isAvailable || status === "completed"
  const showCooldown = !isAvailable && status === "completed" && nextAvailableAt

  // Определяем иконку задачи в зависимости от её типа
  const getTaskIcon = () => {
    switch (taskType) {
      case "daily":
        return <StarIcon className="h-5 w-5 text-yellow-400" />
      case "repeatable":
        return <FireIcon className="h-5 w-5 text-orange-500" />
      case "one_time":
        return <CurrencyDollarIcon className="h-5 w-5 text-green-400" />
      case "quiz":
        return <StarIcon className="h-5 w-5 text-blue-400" />
      default:
        return <StarIcon className="h-5 w-5 text-purple-400" />
    }
  }

  // Определяем индикатор статуса задачи
  let StatusIndicator: React.ReactNode = null
  if (showCooldown) {
    const availableDate = new Date(nextAvailableAt!)
    const timeString = availableDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    StatusIndicator = (
      <div className="flex items-center space-x-1 text-xs text-purple-300">
        <ClockIcon className="h-3 w-3" />
        <span>{timeString}</span>
      </div>
    )
  } else if (status === "completed") {
    StatusIndicator = <CheckCircleIcon className="h-5 w-5 text-green-500" />
  } else if (!isAvailable) {
    StatusIndicator = <LockClosedIcon className="h-4 w-4 text-gray-400" />
  } else {
    StatusIndicator = <ChevronRightIcon className="h-5 w-5 text-purple-300" />
  }

  // Определяем стили в зависимости от состояния
  const getContainerStyles = () => {
    if (status === "completed") {
      return "border-green-500/30 bg-black/30"
    }
    if (!isAvailable) {
      return "border-gray-600/30 bg-black/40"
    }
    return "border-purple-500/30 bg-black/20 hover:border-purple-400/50 hover:bg-black/40"
  }

  return (
    <div
      aria-disabled={isDisabledVisual}
      className={`
        mb-2.5 flex w-full items-center space-x-3 rounded-lg border p-2.5 shadow-lg backdrop-blur-sm transition-all duration-200
        ${getContainerStyles()}
        ${isDisabledVisual ? "cursor-not-allowed opacity-80" : "active:scale-98 cursor-pointer"}
      `}
      data-task-id={id}
      role="button"
      tabIndex={isDisabledVisual ? -1 : 0}
      onClick={!isDisabledVisual && isAvailable ? () => onClick(id) : undefined}
    >
      {/* Иконка задачи */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-black/40 backdrop-blur-sm">
        {getTaskIcon()}
      </div>

      {/* Текстовая информация */}
      <div className="flex min-w-0 flex-grow flex-col">
        <span className="truncate text-sm font-semibold leading-tight text-white">
          {localizedName}
        </span>
        <span className="text-2xs mt-0.5 line-clamp-1 text-gray-300">
          {localizedDescription}
        </span>
        <div className="mt-1 flex items-center text-xs text-purple-300">
          <span className="mr-2 flex items-center">
            <CurrencyDollarIcon className="mr-0.5 h-3 w-3" />
            {reward}
          </span>
          {StatusIndicator}
        </div>
      </div>
    </div>
  )
}

export default TaskItem
