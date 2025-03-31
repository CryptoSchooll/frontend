import type { FC, PropsWithChildren } from "react"

import { useUIStore } from "@/hooks/uiStore"

const ClassShopTrigger: FC<
  PropsWithChildren<{ position: Position; corridorId: string }>
> = ({ children, position, corridorId }) => {
  const { openShopDrawer } = useUIStore((state) => state.actions)

  const handleClick = () => openShopDrawer({ corridorId, position })

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  )
}

export default ClassShopTrigger
