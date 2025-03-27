import { memo } from "react"

import ClassShopMenu from "./ClassShopMenu"

import { CLASS_POSITIONS } from "@/constants"

const ClassMemo = ({
  classData,
  corridorId,
}: {
  classData: ClassLike
  corridorId: string
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
        {classData.name}
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
      <ClassShopMenu corridorId={corridorId} position={classData.position}>
        <div className="relative size-10">
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
        </div>
      </ClassShopMenu>
    </div>
  )
}

const Class = memo(ClassMemo)

export default Class
