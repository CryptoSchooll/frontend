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
import { CLASSES } from "@/constants"
import useBalanceStore from "@/hooks/balanceStore"
import { useGameStore } from "@/hooks/gameStore"
import { cn } from "@/lib/utils"

const ClassShopDrawer = ({
  shopDrawerContext,
  closeShopDrawer,
  isShopDrawerOpen,
}: {
  shopDrawerContext: DrawerStore["shopDrawerContext"]
  closeShopDrawer: DrawerStore["actions"]["closeShopDrawer"]
  isShopDrawerOpen: DrawerStore["isShopDrawerOpen"]
}) => {
  const { appendClass } = useGameStore((state) => state.actions)
  const { balance, actions } = useBalanceStore()

  const handleSelectClass = (classData: Omit<Class, "id" | "position">) => {
    if (!shopDrawerContext) return

    if (!actions.canAfford(classData.cost)) {
      console.warn("Cant afford that")
      return
    }

    const newClass: Class = {
      ...classData,
      id: crypto.randomUUID(),
      position: shopDrawerContext.position,
    }
    appendClass(shopDrawerContext.corridorId, newClass)
    actions.substractBalance(classData.cost)
    actions.addIncome(classData.income)
    closeShopDrawer()
  }

  return (
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
                  <button
                    className={cn("", {
                      "text-gray-500": classData.cost > balance,
                    })}
                    disabled={classData.cost > balance}
                    onClick={() => handleSelectClass(classData)}
                  >
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
  )
}

export default ClassShopDrawer
