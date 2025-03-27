// src/components/Tasks/TaskItem.tsx (Simplified Example)

import type { FC } from "react";
import type { Task } from "@/hooks/types"; // Adjust path
import { ChevronRightIcon, CheckCircleIcon, LockClosedIcon, ClockIcon } from '@heroicons/react/24/outline';

interface TaskItemProps extends Task {
  onClick: (taskId: string) => void;
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
  const isDisabledVisual = !isAvailable || status === 'completed';
  // Cooldown display logic remains the same
  const showCooldown = !isAvailable && status === 'completed' && nextAvailableAt;

  let StatusIndicator: React.ReactNode = null;
  // Status indicator logic remains largely the same, NO spinner needed here
   if (showCooldown) {
    const availableDate = new Date(nextAvailableAt!);
    const timeString = availableDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    StatusIndicator = (
      <div className="flex items-center text-xs text-zinc-400 space-x-1">
         <ClockIcon className="w-4 h-4" />
         <span>{timeString}</span>
      </div>
    );
  } else if (status === 'completed') {
    StatusIndicator = <CheckCircleIcon className="w-6 h-6 text-green-500" />;
  } else if (!isAvailable) {
     StatusIndicator = <LockClosedIcon className="w-5 h-5 text-zinc-400" />;
  } else {
    StatusIndicator = <ChevronRightIcon className="w-6 h-6 text-zinc-400" />;
  }

  return (
    <div
      className={`
        flex items-center w-full max-w-sm p-3 bg-zinc-600 rounded-lg shadow-md space-x-4
        ${isDisabledVisual // Use isDisabledVisual for styling
            ? 'opacity-60 cursor-not-allowed'
            : 'cursor-pointer hover:bg-zinc-500 transition-colors duration-150 ease-in-out'
        }
      `}
      // Call onClick only if it SHOULD open the drawer (available & not completed)
      onClick={!isDisabledVisual && isAvailable ? () => onClick(id) : undefined}
      aria-disabled={isDisabledVisual}
      role="button"
      tabIndex={isDisabledVisual ? -1 : 0}
      data-task-id={id}
    >
      {/* ... rest of the TaskItem content (icon, title, reward) ... */}
       {/* Круглая иконка-плейсхолдер слева */}
      <div className="flex-shrink-0 w-12 h-12 bg-zinc-400 rounded-full"></div>

      {/* Текстовая информация (название и награда) */}
      <div className="flex-grow flex flex-col">
        <span className="font-semibold text-base text-white leading-tight">
          {localizedName}
        </span>
        <span className="text-sm text-zinc-300">
          {`+${reward} tokens`}
        </span>
      </div>

      {/* Индикатор статуса/действия справа */}
      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8">
        {StatusIndicator}
      </div>
    </div>
  );
};

export default TaskItem;