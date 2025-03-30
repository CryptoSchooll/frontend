import { Camera, CameraPortal, Corridor } from "@core"

import useBalanceStore from "@/hooks/balanceStore"
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
  const { electricityOn, electricityCost, actions } = useBalanceStore()

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
      {!electricityOn && (
        <>
          <div className="z-1 fixed h-screen w-screen bg-black/80" />
          <div className="bottom-30 z-1 fixed left-1/2 -translate-x-1/2 bg-white px-10 py-2">
            <h1 className="text-center text-xl font-bold">Light is off!</h1>
            <p className="mt-2 text-center">school has quit working.</p>
            <p className="text-center">fix the lights</p>
            <button
              className="mx-auto mt-4 block bg-gray-700 px-20 py-2 text-white"
              onClick={() => actions.payForElectricity()}
            >
              fix - {electricityCost}EDt
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
