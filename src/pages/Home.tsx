import Camera from "../components/core/Camera"
import CameraPortal from "../components/core/CameraPortal"

const pos: Record<
  string,
  {
    rotate: number
    top: number
    left: number
  }
> = {
  right: {
    rotate: 0,
    top: 0,
    left: 0,
  },
  left: {
    rotate: 180,
    top: 0,
    left: -200,
  },
  up: {
    rotate: -90,
    top: -100,
    left: -100,
  },
  down: {
    rotate: 90,
    top: 100,
    left: -100,
  },
}

type Class = {
  id: string
  position: number
}

type Corridor = {
  id: string
  cost: number
  corridorNumber: number
  startX: number
  startY: number
  endX: number
  endY: number
  direction: "up" | "down" | "left" | "right"
  connected: boolean
  classes: Class[]
}

const data: Corridor[] = [
  {
    id: "1",
    startX: 0,
    startY: 0,
    endX: 0,
    endY: -1,
    direction: "down",
    connected: false,
    corridorNumber: 1,
    cost: 1000,
    classes: [
      {
        id: "10",
        position: 1,
      },
    ],
  },
]

const Home = () => {
  return (
    <div className="relative h-full">
      <CameraPortal>
        <Camera>
          <div className="relative size-[1200px] bg-green-400">
            {data.map((corridor, i) => {
              const posMeta = pos[corridor.direction]

              return (
                <div
                  key={i}
                  className="z-1 absolute h-[20px] w-[200px] bg-amber-400"
                  style={{
                    top: `${(3 + -corridor.startY) * 200 - 10 + posMeta.top}px`,
                    left: `${(3 + corridor.startX) * 200 + posMeta.left}px`,
                    transform: `rotate(${posMeta.rotate}deg)`,
                  }}
                ></div>
              )
            })}
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

export default Home
