import type { DrawerStore } from "@/hooks/drawerStore"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer"
import { useGameStore } from "@/hooks/gameStore"

const CorridorConfirmDrawer = ({
  isConfirmDrawerOpen,
  confirmDrawerContext,
  closeConfirmDrawer,
}: {
  isConfirmDrawerOpen: DrawerStore["isConfirmDrawerOpen"]
  confirmDrawerContext: DrawerStore["confirmDrawerContext"]
  closeConfirmDrawer: DrawerStore["actions"]["closeConfirmDrawer"]
}) => {
  const { addCorridor } = useGameStore((state) => state.actions)

  const handleConfirmCorridor = () => {
    if (!confirmDrawerContext) return

    addCorridor(
      confirmDrawerContext.corridorId,
      confirmDrawerContext.direction,
      confirmDrawerContext.side,
    )
    closeConfirmDrawer()
  }

  return (
    <Drawer
      open={isConfirmDrawerOpen}
      onOpenChange={(open) => !open && closeConfirmDrawer()}
    >
      <DrawerContent className="pb-5 text-white">
        {confirmDrawerContext && (
          <>
            <DrawerHeader className="mt-4 p-0 text-white">
              <DrawerTitle>Подтверждение</DrawerTitle>
              <DrawerDescription>
                Добавить новый корридор &quot;{confirmDrawerContext.direction}
                &quot;?
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <button onClick={handleConfirmCorridor}>
                Да, Установить ({confirmDrawerContext.direction})
              </button>
              <DrawerClose asChild>
                <button>Отмена</button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export default CorridorConfirmDrawer
