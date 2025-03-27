import type { FC, PropsWithChildren } from "react"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"
import { CLASSES } from "@/constants"
import { useGameStore } from "@/hooks/gameStore"

const ClassShopMenu: FC<
  PropsWithChildren<{ position: Position; corridorId: string }>
> = ({ children, position, corridorId }) => {
  const { appendClass } = useGameStore()

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="pb-5 text-white">
        <DrawerHeader className="mt-4 p-0 text-white">
          <DrawerTitle>Магазин</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <ul className="mt-4 px-10">
          {CLASSES.map((classData, i) => (
            <li key={i} className="mt-2 flex justify-between">
              <p>{classData.name}</p>
              <button
                onClick={() => {
                  const newClass: Class = {
                    ...classData,
                    id: crypto.randomUUID(),
                    position,
                  }
                  appendClass(corridorId, newClass)
                }}
              >
                Установить
              </button>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  )
}

export default ClassShopMenu
