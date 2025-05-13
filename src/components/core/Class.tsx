import { memo } from "react"

import ClassInfoTrigger from "./ClassInfoTrigger"
import ClassShopTrigger from "./ClassShopTrigger"

import Literature from "@/assets/Literature_class.png"

import { CLASS_POSITIONS } from "@/constants"

const TILE = 85

const ClassMemo = ({
  classData,
  corridorId,
  coridorDirection,
}: {
  classData: ClassLike
  corridorId: string
  coridorDirection: string
}) => {
  const posMeta = CLASS_POSITIONS[classData.position]

  const paramsForClassTransform = {
    right: `translate(-50%,-50%) rotate(-45deg) scaleY(2) scaleX(1.15) scale(1.5)`,
    down: `translate(-50%, 10%) rotate(225deg) scaleY(2) scaleX(1.15) scale(1.5)`,
    left: `translate(10%, 10%) rotate(135deg) scaleY(2) scaleX(1.15) scale(1.5)`,
  }

  if (classData.isClass) {
    return (
      <div
        className="absolute"
        style={{
          ...posMeta,
          width: TILE,
          height: TILE,
        }}
      >
        <ClassInfoTrigger classData={classData} corridorId={corridorId}>
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            {/* {coridorDirection} */}
            {/* {classData.position} */}
            <img
              alt={classData.name}
              draggable={false}
              height={TILE}
              src={Literature}
              style={{
                position: "absolute",
                top: "20%",
                right: "-20%",
                transformOrigin: "center center",
                transform: paramsForClassTransform[coridorDirection],
              }}
              width={TILE}
            />
          </div>
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
