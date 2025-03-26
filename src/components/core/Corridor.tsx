import type { GameStore } from "@/hooks/gameStore"

import { memo, useMemo } from "react"

import Class from "./Class"

import { BUTTONS_POSITIONS, CORRIDOR_POSITIONS } from "@/constants"

const validateClasses = (classes: Class[]): ClassLike[] => {
  const result = []
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
        position: i + 1,
        isClass: false,
      }
    }
  }

  return result as ClassLike[]
}

const CorridorMemo = ({
  corridorData,
  onAddCorridor,
  onAppendClass,
  isFilled,
}: {
  corridorData: Corridor
  onAddCorridor: GameStore["addCorridor"]
  onAppendClass: GameStore["appendClass"]
  isFilled: boolean
}) => {
  const posMeta = CORRIDOR_POSITIONS[corridorData.direction]
  const validatedClasses = useMemo(
    () => validateClasses(corridorData.classes),
    [corridorData.classes],
  )

  return (
    <div
      className="z-1 absolute h-[40px] w-[400px] bg-amber-400"
      style={{
        top: `${(3 + -corridorData.startY) * 400 - 20 + posMeta.top}px`,
        left: `${(3 + corridorData.startX) * 400 + posMeta.left}px`,
        transform: `rotate(${posMeta.rotate})`,
      }}
    >
      {isFilled && (
        <>
          <div className="relative">
            <div
              className="absolute size-[40px]"
              style={{
                transform: `rotate(${-parseFloat(posMeta.rotate)}deg)`,
              }}
            >
              {corridorData.availableDirectionsStart.map((direction) => (
                <button
                  key={`start-${direction}`}
                  className="absolute size-8 rounded bg-green-500 text-white"
                  style={{
                    ...BUTTONS_POSITIONS[direction],
                  }}
                  onClick={() =>
                    onAddCorridor(corridorData.id, direction, "start")
                  }
                >
                  {direction[0].toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute right-0 size-[40px]"
              style={{
                transform: `rotate(${-parseFloat(posMeta.rotate)}deg)`,
              }}
            >
              {corridorData.availableDirectionsEnd.map((direction) => (
                <button
                  key={`start-${direction}`}
                  className="absolute size-8 rounded bg-green-500 text-white"
                  style={{
                    ...BUTTONS_POSITIONS[direction],
                  }}
                  onClick={() =>
                    onAddCorridor(corridorData.id, direction, "end")
                  }
                >
                  {direction[0].toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="relative">
        {validatedClasses.map((classData, i) => (
          <Class
            key={i}
            classData={classData}
            corridorId={corridorData.id}
            onAppendClass={onAppendClass}
          />
        ))}
      </div>
    </div>
  )
}

const Corridor = memo(CorridorMemo)

export default Corridor
