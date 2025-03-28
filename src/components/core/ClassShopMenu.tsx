import type { FC, PropsWithChildren } from "react"

import { useDrawerStore } from "@/hooks/drawerStore"

const ClassShopTrigger: FC<
  PropsWithChildren<{ position: Position; corridorId: string }>
> = ({ children, position, corridorId }) => {
  const { openShopDrawer } = useDrawerStore((state) => state.actions)

  const handleClick = () => openShopDrawer({ corridorId, position })

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  )
}

export default ClassShopTrigger
