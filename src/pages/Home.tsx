import Camera from "../components/core/Camera"
import CameraPortal from "../components/core/CameraPortal"

import { useGameStore } from "@/hooks/gameStore"

const corridorPosition: Record<
  Direction,
  {
    rotate: string
    top: number
    left: number
  }
> = {
  right: {
    rotate: "0deg",
    top: 0,
    left: 0,
  },
  left: {
    rotate: "180deg",
    top: 0,
    left: -400,
  },
  up: {
    rotate: "-90deg",
    top: -200,
    left: -200,
  },
  down: {
    rotate: "90deg",
    top: 200,
    left: -200,
  },
}

const classPosition: Record<
  number,
  {
    top?: string
    left?: string
    right?: string
    bottom?: string
  }
> = {
  1: {
    bottom: "0px",
    left: "110px",
  },
  2: {
    bottom: "0px",
    right: "110px",
  },
  3: {
    top: "40px",
    left: "110px",
  },
  4: {
    top: "40px",
    right: "110px",
  },
}

const opositeDirections: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
}
const directions: Direction[] = ["up", "down", "left", "right"]

const Corridor = ({
  corridorData,
  appendClass,
  addCorridor,
}: {
  corridorData: Corridor
  appendClass: (corridorId: string, position: number) => void
  addCorridor: (
    previousCorridorId: string,
    direction: Direction,
    position: "start" | "end",
  ) => void
}) => {
  const posMeta = corridorPosition[corridorData.direction]
  const isFull = isCorridorFull(corridorData)
  const possibleDirectionsStart = directions.filter(
    (dir) => dir !== corridorData.direction,
  )
  const possibleDirectionsEnd = directions.filter(
    (dir) => opositeDirections[dir] !== corridorData.direction,
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
      {isFull && (
        <div
          className="absolute left-[-50px] top-0 flex flex-col gap-1"
          style={{
            transform: `rotate(${-parseFloat(posMeta.rotate)}deg)`,
          }}
        >
          {possibleDirectionsStart.map((direction) => (
            <button
              key={`start-${direction}`}
              className="size-8 rounded bg-green-500 text-white"
              onClick={() => addCorridor(corridorData.id, direction, "start")}
            >
              {direction[0].toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {isFull && (
        <div
          className="absolute right-[-50px] top-0 flex flex-col gap-1"
          style={{
            transform: `rotate(${-parseFloat(posMeta.rotate)}deg)`,
          }}
        >
          {possibleDirectionsEnd.map((direction) => (
            <button
              key={`end-${direction}`}
              className="size-8 rounded bg-green-500 text-white"
              onClick={() => addCorridor(corridorData.id, direction, "end")}
            >
              {direction[0].toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        {validateClasses(corridorData.classes).map((classData, i) => {
          const posMeta = classPosition[classData.position]

          return classData.isClass ? (
            <div
              key={i}
              className="size-21 absolute border bg-amber-600"
              style={{
                ...posMeta,
              }}
            >
              {classData.position}
            </div>
          ) : (
            <div
              key={i}
              className="size-21 absolute flex items-center justify-center"
              style={{
                ...posMeta,
              }}
            >
              <button
                className="relative size-10"
                onClick={() => appendClass(corridorData.id, classData.position)}
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
        })}
      </div>
    </div>
  )
}

const validateClasses = (classes: Class[]) => {
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

  return result
}

const Home = () => {
  const { corridors, appendClass, addCorridor } = useGameStore()
  console.log(corridors)
  return (
    <div className="relative h-full">
      <CameraPortal>
        <Camera>
          <div className="relative size-[2400px] bg-green-400">
            {corridors.map((corridor, i) => (
              <Corridor
                key={i}
                addCorridor={addCorridor}
                appendClass={appendClass}
                corridorData={corridor}
              />
            ))}
            <div className="absolute top-0 grid size-full grid-cols-6 grid-rows-6 bg-green-400">
              {Array.from({ length: 36 }).map((_, index) => (
                <div
                  key={index}
                  className="size-full border border-green-500 bg-black"
                />
              ))}
            </div>
          </div>
        </Camera>
      </CameraPortal>
    </div>
  )
}

const isCorridorFull = (corridor: Corridor) => {
  return corridor.classes.length === 4
}

export default Home
