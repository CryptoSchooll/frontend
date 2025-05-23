import { memo } from "react"

import ClassInfoTrigger from "./ClassInfoTrigger"
import ClassShopTrigger from "./ClassShopTrigger"

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
        <ClassInfoTrigger classData={classData} corridorId={corridorId}>
          {classData.name}
        </ClassInfoTrigger>
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
      <ClassShopTrigger corridorId={corridorId} position={classData.position}>
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
      </ClassShopTrigger>
    </div>
  )
}

const Class = memo(ClassMemo)

export default Class
