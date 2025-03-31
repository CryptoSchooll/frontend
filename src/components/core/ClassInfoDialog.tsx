import type { UIStore } from "@/hooks/uiStore"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog"

import useBalanceStore from "@/hooks/balanceStore"
import { useGameStore } from "@/hooks/gameStore"

// import useBalanceStore from "@/hooks/balanceStore"
// import { useGameStore } from "@/hooks/gameStore"
// import { cn } from "@/lib/utils"

const ClassInfoDialog = ({
  classInfoContext,
  closeClassInfo,
  isClassInfoOpen,
}: {
  classInfoContext: UIStore["classInfoContext"]
  closeClassInfo: UIStore["actions"]["closeClassInfo"]
  isClassInfoOpen: UIStore["isClassInfoOpen"]
}) => {
  const { removeClass } = useGameStore((state) => state.actions)
  const { substractIncome } = useBalanceStore((state) => state.actions)

  return (
    <Dialog
      open={isClassInfoOpen}
      onOpenChange={(open) => !open && closeClassInfo()}
    >
      <DialogContent className="sm:max-w-md">
        {classInfoContext && (
          <>
            <DialogHeader className="text-white">
              <DialogTitle>{classInfoContext.classData.name}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="text-white">
              {classInfoContext.classData.income}/s
            </div>
            <div
              onClick={() => {
                removeClass(
                  classInfoContext.corridorId,
                  classInfoContext.classData.position,
                )
                substractIncome(classInfoContext.classData.income)
                closeClassInfo()
              }}
            >
              Delete
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ClassInfoDialog
