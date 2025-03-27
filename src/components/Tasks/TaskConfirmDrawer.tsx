import type { FC } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer"; // Adjust path if needed
// Button import removed
import { X } from "lucide-react"; // Icon for close button

import type { Task } from "@/hooks/types"; // Adjust path to your types file

interface TaskConfirmDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClaim: (taskId: string) => Promise<void>;
  isLoading: boolean;
}

const TaskConfirmDrawer: FC<TaskConfirmDrawerProps> = ({
  task,
  isOpen,
  onOpenChange,
  onClaim,
  isLoading,
}) => {
  if (!task) {
    return null;
  }

  const handleClaimClick = async () => {
    await onClaim(task.id);
  };

  const handleSubscribeClick = () => {
    console.log(`Placeholder: Subscribe action for task ${task.id}`);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-zinc-100 text-black p-0 rounded-t-lg">
        <div className="relative p-5 pb-6">
          {/* Close Button */}
          <DrawerClose asChild className="absolute top-3 right-3">
            {/* Replaced Button with button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full w-8 h-8 text-zinc-500 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </DrawerClose>

          {/* Header section */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0 w-14 h-14 bg-zinc-400 rounded-full"></div>
            <div className="flex-grow">
              <DrawerTitle className="font-semibold text-lg text-black mb-0.5">
                {task.localizedName}
              </DrawerTitle>
              <p className="text-sm text-zinc-600">{`+${task.reward} tokens`}</p>
            </div>
          </div>

          {/* Description */}
          <DrawerDescription className="text-sm text-zinc-700 mb-5">
            {task.localizedDescription}
          </DrawerDescription>

          {/* Action Buttons */}
          <div className="space-y-3">
             <div>
                 {/* Replaced Button with button */}
                 <button
                   type="button"
                   className="w-full px-4 py-2 rounded-md bg-zinc-300 hover:bg-zinc-400 text-black text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-50"
                   onClick={handleSubscribeClick}
                   // disabled={isLoading}
                 >
                   Subscribe
                 </button>
                 <p className="text-xs text-zinc-500 mt-1 px-1">
                   subscribe to our channel and claim your reward
                 </p>
             </div>

             <div>
                {/* Replaced Button with button */}
                <button
                  type="button"
                  className="w-full px-4 py-2 rounded-md bg-zinc-300 hover:bg-zinc-400 text-black text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-50"
                  onClick={handleClaimClick}
                  disabled={isLoading || task.status === 'completed'}
                >
                  {isLoading ? "Claiming..." : "Claim Reward"}
                </button>
                 <p className="text-xs text-zinc-500 mt-1 px-1">
                   after this action, click claim reward
                 </p>
             </div>
          </div>

        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TaskConfirmDrawer;