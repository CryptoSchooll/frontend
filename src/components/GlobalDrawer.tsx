import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer"
import { CLASSES } from "@/constants"
import { useDrawerStore } from "@/hooks/drawerStore"
import { useGameStore } from "@/hooks/gameStore"

export function GlobalDrawers() {
  const {
    isShopDrawerOpen,
    shopDrawerContext,
    isConfirmDrawerOpen,
    confirmDrawerContext,
  } = useDrawerStore()
  const { closeShopDrawer, closeConfirmDrawer } = useDrawerStore(
    (state) => state.actions,
  )
  const { appendClass, addCorridor } = useGameStore((state) => state.actions)

  const handleSelectClass = (classData: Omit<Class, "id" | "position">) => {
    if (!shopDrawerContext) return

    const newClass: Class = {
      ...classData,
      id: crypto.randomUUID(),
      position: shopDrawerContext.position,
    }
    appendClass(shopDrawerContext.corridorId, newClass)
    closeShopDrawer()
  }

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
    <>
      <Drawer
        open={isShopDrawerOpen}
        onOpenChange={(open) => !open && closeShopDrawer()}
      >
        <DrawerContent className="pb-5 text-white">
          {shopDrawerContext && (
            <>
              <DrawerHeader className="mt-4 p-0 text-white">
                <DrawerTitle>
                  Магазин (Слот {shopDrawerContext.position})
                </DrawerTitle>
                <DrawerDescription />
              </DrawerHeader>
              <ul className="mt-4 px-10">
                {CLASSES.map((classData, i) => (
                  <li key={i} className="mt-2 flex justify-between">
                    <p>
                      {classData.name} (Стоимость: {classData.cost})
                    </p>{" "}
                    <button onClick={() => handleSelectClass(classData)}>
                      Установить
                    </button>
                  </li>
                ))}
              </ul>
              <DrawerFooter>
                <DrawerClose asChild>
                  <button>Отмена</button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

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
    </>
  )
}
