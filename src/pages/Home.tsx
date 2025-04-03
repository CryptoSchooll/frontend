import { Camera, CameraPortal, Corridor } from "@core"
import { motion } from "framer-motion"

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
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="bottom-30 z-1 fixed left-1/2 w-full max-w-md -translate-x-1/2 overflow-hidden rounded-xl bg-gradient-to-b from-gray-900 to-red-950 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            initial={{ opacity: 0, y: 50 }}
          >
            {/* Декоративные элементы */}
            <div className="absolute -left-10 top-1/2 h-32 w-32 rounded-full bg-red-700/20 blur-xl"></div>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-500/10 blur-xl"></div>

            <div className="relative px-8 py-6">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 backdrop-blur-sm">
                  <svg
                    className="text-red-300"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <path d="M16 14a4 4 0 0 1-8 0"></path>
                    <path d="M12 18v2"></path>
                    <path d="M2 6h20"></path>
                    <path d="M18 14c0-4.5-6-3.5-6-8"></path>
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-red-300">
                  Электропитание отключено!
                </h1>
              </div>

              <div className="mb-6 space-y-3">
                <p className="text-gray-300">
                  Школа не работает из-за отсутствия электричества. Без
                  электропитания невозможно продолжить обучение.
                </p>
                <p className="text-sm text-gray-400">
                  Необходимо оплатить счет за электроэнергию, чтобы восстановить
                  работу.
                </p>
              </div>

              <motion.button
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 py-3 font-medium text-white shadow-lg"
                whileHover={{
                  backgroundColor: "rgba(239, 68, 68, 0.8)",
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => actions.payForElectricity()}
              >
                <span className="text-sm font-medium">
                  Оплатить электричество
                </span>
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-sm backdrop-blur-sm">
                  {electricityCost} EDt
                </span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}

export default Home
