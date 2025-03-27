import { Camera, CameraPortal, Corridor } from "@core"

import { useGameStore } from "@/hooks/gameStore"

const Grid = () => (
  <div className="absolute top-0 grid size-full grid-cols-6 grid-rows-6 bg-cyan-400">
    {Array.from({ length: 36 }).map((_, index) => (
      <div key={index} className="size-full border border-cyan-500 bg-black" />
    ))}
  </div>
)

const Home = () => {
  const { corridors, filled } = useGameStore()
  return (
    <div className="relative h-screen bg-black">
      <CameraPortal>
        <Camera>
          <div className="relative size-[2400px] bg-cyan-700">
            {corridors.map((corridor, i) => (
              <Corridor key={i} corridorData={corridor} isFilled={filled} />
            ))}
          </div>
          <Grid />
        </Camera>
      </CameraPortal>
    </div>
  )
}

export default Home
