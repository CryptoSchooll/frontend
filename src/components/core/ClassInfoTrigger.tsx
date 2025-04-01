import type { FC, PropsWithChildren } from "react"

import { useUIStore } from "@/hooks/uiStore"

const ClassInfoTrigger: FC<
  PropsWithChildren<{ classData: Class; corridorId: string }>
> = ({ children, classData, corridorId }) => {
  const { openClassInfo } = useUIStore((state) => state.actions)

  const handleClick = () => openClassInfo({ classData, corridorId })

  return (
    <button className="h-full w-full" type="button" onClick={handleClick}>
      {children}
    </button>
  )
}

export default ClassInfoTrigger
