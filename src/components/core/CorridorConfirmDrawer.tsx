import type { UIStore } from "@/hooks/uiStore"

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
  isConfirmDrawerOpen: UIStore["isConfirmDrawerOpen"]
  confirmDrawerContext: UIStore["confirmDrawerContext"]
  closeConfirmDrawer: UIStore["actions"]["closeConfirmDrawer"]
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
      <DrawerContent>
        {confirmDrawerContext && (
          <>
            <DrawerHeader>
              <DrawerTitle>Создание коридора</DrawerTitle>
              <DrawerDescription>
                Вы хотите добавить новый коридор в направлении &quot;{confirmDrawerContext.direction}&quot;?
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-6">
              <div className="rounded-lg border border-purple-800/20 bg-purple-900/20 p-4">
                <div className="mb-3 flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-700/60"></div>
                  <div>
                    <h4 className="font-medium text-white">
                      Информация о коридоре
                    </h4>
                    <p className="text-sm text-gray-400">
                      Направление: {confirmDrawerContext.direction}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Новый коридор будет добавлен к текущей структуре. Вы сможете
                  размещать в нем дополнительные классы.
                </p>
              </div>
            </div>
            
            <DrawerFooter>
              <button 
                className="w-full rounded-md bg-gradient-to-r from-green-800 to-teal-800 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-green-700 hover:to-teal-700 active:translate-y-0.5"
                onClick={handleConfirmCorridor}
              >
                Подтвердить создание
              </button>
              <DrawerClose asChild>
                <button className="rounded-md border border-gray-700 bg-gray-800 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
                  Отмена
                </button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export default CorridorConfirmDrawer
