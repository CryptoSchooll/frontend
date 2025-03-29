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
      <DrawerContent className="rounded-t-lg bg-zinc-100 p-0 text-black">
        <div className="relative p-5 pb-6">
          {/* Close Button */}
          <DrawerClose asChild className="absolute right-3 top-3">
            {/* Replaced Button with button */}
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              type="button"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </DrawerClose>

          {/* Header section */}
          <div className="mb-4 flex items-center space-x-4">
            <div className="h-14 w-14 flex-shrink-0 rounded-full bg-zinc-400"></div>
            <div className="flex-grow">
              <DrawerTitle className="mb-0.5 text-lg font-semibold text-black">
                {task.localizedName}
              </DrawerTitle>
              <p className="text-sm text-zinc-600">{`+${task.reward} tokens`}</p>
            </div>
          </div>

          {/* Description */}
          <DrawerDescription className="mb-5 text-sm text-zinc-700">
            {task.localizedDescription}
          </DrawerDescription>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div>
              {/* Replaced Button with button */}
              <button
                className="w-full rounded-md bg-zinc-300 px-4 py-2 text-sm font-medium text-black hover:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-50"
                type="button"
                onClick={handleSubscribeClick}
                // disabled={isLoading}
              >
                Subscribe
              </button>
              <p className="mt-1 px-1 text-xs text-zinc-500">
                subscribe to our channel and claim your reward
              </p>
            </div>

            <div>
              {/* Replaced Button with button */}
              <button
                className="w-full rounded-md bg-zinc-300 px-4 py-2 text-sm font-medium text-black hover:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-50"
                disabled={isLoading || task.status === "completed"}
                type="button"
                onClick={handleClaimClick}
              >
                {isLoading ? "Claiming..." : "Claim Reward"}
              </button>
              <p className="mt-1 px-1 text-xs text-zinc-500">
                after this action, click claim reward
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default TaskConfirmDrawer
