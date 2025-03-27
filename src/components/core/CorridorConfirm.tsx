import type { FC, PropsWithChildren } from "react"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"
import { useGameStore } from "@/hooks/gameStore"

const CorridorConfirm: FC<
  PropsWithChildren<{ corridorId: string; direction: Direction; side: Side }>
> = ({ children, direction, side, corridorId }) => {
  const { addCorridor } = useGameStore()

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="pb-5 text-white">
        <DrawerHeader className="mt-4 p-0 text-white">
          <DrawerTitle>Корридор</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <DrawerFooter>
          <button
            onClick={() => {
              addCorridor(corridorId, direction, side)
            }}
          >
            Установить {direction}
          </button>
          <DrawerClose>Отмена</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CorridorConfirm
