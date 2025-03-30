// src/components/Tasks/TaskItem.tsx (Simplified Example)

import type { Task } from "@/hooks/types" // Adjust path
import type { FC } from "react"

import {
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline"

interface TaskItemProps extends Task {
  onClick: (taskId: string) => void
  // isLoading prop removed
}

const TaskItem: FC<TaskItemProps> = ({
  id,
  localizedName,
  reward,
  status,
  isAvailable,
  nextAvailableAt,
  taskType,
  onClick,
  // isLoading removed from props
}) => {
  // Determine if the item itself should appear interactive or disabled
  const isDisabledVisual = !isAvailable || status === "completed"
  // Cooldown display logic remains the same
  const showCooldown = !isAvailable && status === "completed" && nextAvailableAt

  let StatusIndicator: React.ReactNode = null
  // Status indicator logic remains largely the same, NO spinner needed here
  if (showCooldown) {
    const availableDate = new Date(nextAvailableAt!)
    const timeString = availableDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    StatusIndicator = (
      <div className="flex items-center space-x-1 text-xs text-zinc-400">
        <ClockIcon className="h-4 w-4" />
        <span>{timeString}</span>
      </div>
    )
  } else if (status === "completed") {
    StatusIndicator = <CheckCircleIcon className="h-6 w-6 text-green-500" />
  } else if (!isAvailable) {
    StatusIndicator = <LockClosedIcon className="h-5 w-5 text-zinc-400" />
  } else {
    StatusIndicator = <ChevronRightIcon className="h-6 w-6 text-zinc-400" />
  }

  return (
    <div
      className={`
        flex w-full max-w-sm items-center space-x-4 rounded-lg bg-zinc-600 p-3 shadow-md
        ${
          isDisabledVisual // Use isDisabledVisual for styling
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer transition-colors duration-150 ease-in-out hover:bg-zinc-500"
        }
      `}
      // Call onClick only if it SHOULD open the drawer (available & not completed)
      aria-disabled={isDisabledVisual}
      data-task-id={id}
      role="button"
      tabIndex={isDisabledVisual ? -1 : 0}
      onClick={!isDisabledVisual && isAvailable ? () => onClick(id) : undefined}
    >
      {/* ... rest of the TaskItem content (icon, title, reward) ... */}
      {/* Круглая иконка-плейсхолдер слева */}
      <div className="h-12 w-12 flex-shrink-0 rounded-full bg-zinc-400"></div>

      {/* Текстовая информация (название и награда) */}
      <div className="flex flex-grow flex-col">
        <span className="text-base font-semibold leading-tight text-white">
          {localizedName}
        </span>
        <span className="text-sm text-zinc-300">{`+${reward} tokens`}</span>
      </div>

      {/* Индикатор статуса/действия справа */}
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
        {StatusIndicator}
      </div>
    </div>
  )
}

export default TaskItem
