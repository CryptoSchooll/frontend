import { memo, useMemo } from "react"

import Class from "./Class"
import CorridorConfirmTrigger from "./CorridorConfirmTrigger"

import { BUTTONS_POSITIONS, CORRIDOR_POSITIONS } from "@/constants"

const ExpansionButtons = ({
  posMeta,
  directions,
  corridorId,
  side,
}: {
  posMeta: typeof CORRIDOR_POSITIONS.up
  directions: Direction[]
  corridorId: string
  side: "start" | "end"
}) => {
  return (
    <div className="relative">
      <div
        className={`absolute ${side === "end" && "right-0"} size-[40px]`}
        style={{
          transform: `rotate(${-parseFloat(posMeta.rotate)}deg)`,
        }}
      >
        {directions.map((direction) => (
          <CorridorConfirmTrigger
            key={`${side}-${direction}`}
            corridorId={corridorId}
            direction={direction}
            side={side}
          >
            <div
              className="absolute size-8 rounded bg-green-500 text-white shadow-md hover:bg-green-400 active:bg-green-600"
              style={{
                ...BUTTONS_POSITIONS[direction],
              }}
            >
              {direction[0].toUpperCase()}
            </div>
          </CorridorConfirmTrigger>
        ))}
      </div>
    </div>
  )
}

const CorridorMemo = ({
  corridorData,
  isFilled,
}: {
  corridorData: Corridor
  isFilled: boolean
}) => {
  const posMeta = CORRIDOR_POSITIONS[corridorData.direction]
  const validatedClasses = useMemo(
    () => validateClasses(corridorData.classes),
    [corridorData.classes],
  )

  return (
    <div
      className="z-1 absolute h-[40px] w-[400px] bg-amber-400/90 shadow-lg"
      style={{
        top: `${(3 + -corridorData.startY) * 400 - 20 + posMeta.top}px`,
        left: `${(3 + corridorData.startX) * 400 + posMeta.left}px`,
        transform: `rotate(${posMeta.rotate})`,
        borderRadius: "2px",
      }}
    >
      {isFilled && (
        <>
          <ExpansionButtons
            key="start"
            corridorId={corridorData.id}
            directions={corridorData.availableDirectionsStart}
            posMeta={posMeta}
            side="start"
          />
          <ExpansionButtons
            key="end"
            corridorId={corridorData.id}
            directions={corridorData.availableDirectionsEnd}
            posMeta={posMeta}
            side="end"
          />
        </>
      )}

      <div className="relative">
        {validatedClasses.map((classData, i) => (
          <Class key={i} classData={classData} corridorId={corridorData.id} />
        ))}
      </div>
    </div>
  )
}
const Corridor = memo(CorridorMemo)
export default Corridor

const validateClasses = (classes: Class[]): ClassLike[] => {
  const result: ClassLike[] = []
  const exists = []

  for (let i = 0; i < classes.length; i++) {
    result[classes[i].position - 1] = {
      ...classes[i],
      isClass: true,
    }
    exists.push(classes[i].position - 1)
  }

  for (let i = 0; i < 4; i++) {
    if (!exists.includes(i)) {
      result[i] = {
        position: (i + 1) as Position,
        isClass: false,
      }
    }
  }

  return result
}
