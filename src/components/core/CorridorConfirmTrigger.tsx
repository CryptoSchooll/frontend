import type { FC, PropsWithChildren } from "react"

import { useDrawerStore } from "@/hooks/drawerStore"

const CorridorConfirmTrigger: FC<
  PropsWithChildren<{ corridorId: string; direction: Direction; side: Side }>
> = ({ children, direction, side, corridorId }) => {
  const { openConfirmDrawer } = useDrawerStore((state) => state.actions)

  const handleClick = () => openConfirmDrawer({ corridorId, direction, side })

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  )
}

export default CorridorConfirmTrigger
