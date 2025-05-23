import { Camera, CameraPortal, Corridor } from "@core"
import { useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useState } from "react"

import useBalanceStore from "@/hooks/balanceStore"
import { useGameStore } from "@/hooks/gameStore"
import { useUserStore } from "@/hooks/userStore"
import { useTranslationStore } from "@/hooks/useTranslationStore"
import { payElectricity } from "@/lib/query"

const Grid = ({ scale }: { scale: number }) => (
  <div
    className="absolute top-0 grid size-full grid-cols-6 grid-rows-6 border-2 border-neutral-700"
    style={{
      transform: `scale(${scale})`,
    }}
  >
    {Array.from({ length: 36 }).map((_, index) => (
      <div key={index} className="size-full border border-neutral-700" />
    ))}
  </div>
)

const Home = () => {
  const [scale, setScale] = useState(1)
  const { corridors, filled } = useGameStore()
  const { electricityOn, electricityCost, actions } = useBalanceStore()
  const { translations } = useTranslationStore()
  const { user } = useUserStore()

  const payElectricityMutation = useMutation({
    mutationFn: payElectricity,
    onSuccess: (data) => {
      const { newBalance, paymentAmount, nextPaymentDue } = data.data
      console.log(newBalance, paymentAmount, nextPaymentDue)

      actions.setElectricityCost(Number(paymentAmount))
      actions.setElectricityDate(new Date(nextPaymentDue))
      actions.setBalance(Number(newBalance))
    },
  })

  const handlePayElectricity = async () => {
    await payElectricityMutation.mutateAsync(user!.token)
  }

  return (
    <div className="relative h-screen bg-black">
      <CameraPortal>
        <Camera>
          <div
            className="z-1 relative size-[2400px]"
            style={{
              transform: `scale(${scale})`,
            }}
          >
            {corridors.map((corridor, i) => (
              <Corridor key={i} corridorData={corridor} isFilled={filled} />
            ))}
          </div>
          <Grid scale={scale} />
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
                  {translations.electricityHeading}
                </h1>
              </div>

              <div className="mb-6 space-y-3">
                <p className="text-gray-300">
                  {translations.electricityDescription}
                </p>
                <p className="text-sm text-gray-400">
                  {translations.electricitySolution}
                </p>
              </div>

              <motion.button
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 py-3 font-medium text-white shadow-lg"
                whileHover={{
                  backgroundColor: "rgba(239, 68, 68, 0.8)",
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayElectricity}
              >
                <span className="text-sm font-medium">
                  {translations.elecricityAction}
                </span>
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-sm backdrop-blur-sm">
                  {electricityCost} EDt
                </span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}

      <div className="z-1 fixed bottom-24 right-5 flex flex-col gap-3">
        <button
          className="bg-black p-3 text-white"
          onClick={() => setScale(scale + 0.2 <= 1.5 ? scale + 0.2 : 1.5)}
        >
          +
        </button>
        <button
          className="bg-black p-3 text-white"
          onClick={() => setScale(scale - 0.2 >= 0.5 ? scale - 0.2 : 0.5)}
        >
          -
        </button>
      </div>
    </div>
  )
}

export default Home
