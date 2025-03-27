import type { GameStore } from "@/hooks/gameStore"

import { memo } from "react"

import { CLASS_POSITIONS } from "@/constants"

const ClassMemo = ({
  classData,
  corridorId,
  onAppendClass,
}: {
  classData: ClassLike
  corridorId: string
  onAppendClass: GameStore["appendClass"]
}) => {
  const posMeta = CLASS_POSITIONS[classData.position]

  if (classData.isClass) {
    return (
      <div
        className="size-21 absolute border bg-amber-600"
        style={{
          ...posMeta,
        }}
      >
        {classData.position}
      </div>
    )
  }

  return (
    <div
      className="size-21 absolute flex items-center justify-center"
      style={{
        ...posMeta,
      }}
    >
      <button
        className="relative size-10"
        onClick={() => onAppendClass(corridorId, classData.position)}
      >
        <div
          className="absolute top-1/2 h-2 w-full bg-amber-100"
          style={{
            transform: "translateY(-50%)",
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-full w-2 bg-amber-100"
          style={{
            transform: "translateX(-50%)",
          }}
        />
      </button>
    </div>
  )
}

const Class = memo(ClassMemo)

export default Class
