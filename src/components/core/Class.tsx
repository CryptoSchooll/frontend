import { memo, useMemo } from "react"

import ClassInfoTrigger from "./ClassInfoTrigger"
import ClassShopTrigger from "./ClassShopTrigger"
import NormalizedImage from "./NormalizedImage"

import { CLASS_POSITIONS } from "@/constants"

const parsePixelValue = (value: string | undefined): number => {
  if (!value) return 0
  return parseFloat(value.replace("px", "")) || 0
}

type PositionStyle = {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

const ClassMemo = ({
  classData,
  corridorId,
}: {
  classData: ClassLike
  corridorId: string
}) => {
  const posMeta = CLASS_POSITIONS[classData.position] as PositionStyle

  const screenCoordinates = useMemo(() => {
    const baseTop = parsePixelValue(posMeta.top)
    const baseLeft = parsePixelValue(posMeta.left)

    const verticalOffset = -45
    const imageTop = baseTop + verticalOffset
    const imageLeft = baseLeft

    const imageWidth = 80
    const imageHeight = 80

    return { imageTop, imageLeft, imageWidth, imageHeight }
  }, [posMeta])

  const { imageTop, imageLeft, imageWidth, imageHeight } = screenCoordinates

  if (classData.isClass) {
    return (
      <>
        <div
          className="absolute"
          style={{
            ...posMeta,
            width: `${imageWidth}px`,
            height: `${imageHeight * 0.7}px`,
            transform: "translateZ(5px)",
            opacity: 0,
            pointerEvents: "auto",
            zIndex: 5,
          }}
        >
          <ClassInfoTrigger classData={classData} corridorId={corridorId}>
            <div className="h-full w-full" />
          </ClassInfoTrigger>
        </div>

        <NormalizedImage
          alt="Classroom"
          rotate={0}
          scale={2}
          src="/assets/classroom.png"
          style={{
            top: `${imageTop}px`,
            left: `${imageLeft}px`,
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        <div
          className="pointer-events-none absolute z-20"
          style={{
            top: `${imageTop + imageHeight / 2}px`,
            left: `${imageLeft + imageWidth / 2}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className="whitespace-nowrap rounded bg-black/60 px-1.5 py-0.5 text-xs font-semibold text-white shadow-md">
            {classData.name}
          </span>
        </div>
      </>
    )
  }

  return (
    <div
      className="size-21 absolute flex items-center justify-center"
      style={{ ...posMeta }}
    >
      <ClassShopTrigger corridorId={corridorId} position={classData.position}>
        <div className="relative size-10 transition-transform hover:scale-110">
          <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 bg-amber-100 shadow-sm" />
          <div className="absolute left-1/2 h-full w-2 -translate-x-1/2 bg-amber-100 shadow-sm" />
        </div>
      </ClassShopTrigger>
    </div>
  )
}

const Class = memo(ClassMemo)
export default Class
