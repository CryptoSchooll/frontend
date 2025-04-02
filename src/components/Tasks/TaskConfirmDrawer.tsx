import type { Task } from "@/hooks/types" // Adjust path to your types file
import type { FC } from "react"

import { X } from "lucide-react" // Icon for close button

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer" // Adjust path if needed
// Button import removed

interface TaskConfirmDrawerProps {
  task: Task | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onClaim: (taskId: string) => Promise<void>
  isLoading: boolean
}

const TaskConfirmDrawer: FC<TaskConfirmDrawerProps> = ({
  task,
  isOpen,
  onOpenChange,
  onClaim,
  isLoading,
}) => {
  if (!task) {
    return null
  }

  const handleClaimClick = async () => {
    await onClaim(task.id)
  }

  const handleSubscribeClick = () => {
    console.log(`Placeholder: Subscribe action for task ${task.id}`)
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 flex-shrink-0 rounded-full bg-purple-700/60"></div>
            <div className="flex-grow">
              <DrawerTitle>{task.localizedName}</DrawerTitle>
              <div className="mt-1 flex items-center">
                <span className="text-sm text-purple-400">
                  +{task.reward} токенов
                </span>
              </div>
            </div>
          </div>
          <DrawerDescription className="mt-3">
            {task.localizedDescription}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-6">
          <div className="mb-1 rounded-lg border border-purple-800/20 bg-purple-900/20 p-4">
            <h4 className="mb-2 font-medium text-purple-300">
              Действия для получения награды:
            </h4>
            
            <div className="space-y-4">
              <div>
                <button
                  className="w-full rounded-md bg-gradient-to-r from-indigo-800 to-purple-800 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-indigo-700 hover:to-purple-700 active:translate-y-0.5"
                  type="button"
                  onClick={handleSubscribeClick}
                >
                  Подписаться на канал
                </button>
                <p className="mt-1.5 px-1 text-sm text-gray-400">
                  Подпишитесь на наш канал и получите вознаграждение
                </p>
              </div>

              <div>
                <button
                  className={`w-full rounded-md px-4 py-2.5 text-sm font-medium shadow-md transition-all ${
                    isLoading || task.status === "completed"
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gradient-to-r from-green-800 to-teal-800 text-white hover:from-green-700 hover:to-teal-700 active:translate-y-0.5"
                  }`}
                  disabled={isLoading || task.status === "completed"}
                  type="button"
                  onClick={handleClaimClick}
                >
                  {isLoading ? "Получение награды..." : "Получить награду"}
                </button>
                <p className="mt-1.5 px-1 text-sm text-gray-400">
                  После выполнения задания нажмите, чтобы получить награду
                </p>
              </div>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <button className="rounded-md border border-gray-700 bg-gray-800 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
              Закрыть
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default TaskConfirmDrawer
