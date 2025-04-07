import { useQuery } from "@tanstack/react-query"
import { initData } from "@telegram-apps/sdk-react"
import { useEffect } from "react"

import { Navbar, UserHeader } from "@/components"
import { GlobalUI } from "@/components/GlobalUI"
import useBalanceStore from "@/hooks/balanceStore"
import usePage from "@/hooks/usePage"
import { useUserStore } from "@/hooks/userStore"
import { useTranslationStore } from "@/hooks/useTranslationStore"
import {
  claim,
  getCorridors,
  getElectricity,
  getIncome,
  getMultiplier,
  login,
} from "@/lib/query"
import {
  Broadcast,
  Club,
  DonationShop,
  Home,
  Leaderboard,
  Quizzes,
  Tasks,
} from "@/pages"

const AppLayout: React.FC = () => {
  const { currentPage } = usePage()
  const { translations } = useTranslationStore()
  const { user, setUser, requests, applyError, checkRequest } = useUserStore()
  const { setBalance, setIncome, setElectricityCost, setElectricityDate } =
    useBalanceStore((state) => state.actions)

  const initDataRaw =
    "user=%7B%22id%22%3A1229587009%2C%22first_name%22%3A%22%D0%B2%D0%BB%D0%B0%D0%B4%D0%BA%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22vshakitskiy%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FVeOA9IfDQFf05Q-qkFLlZYnegZn_78alSWgArBIeKQ8.svg%22%7D&chat_instance=8718946310627105826&chat_type=private&auth_date=1743849707&signature=4wiyTHCu3rhcucuhcsYYJgDYCy1ufJgfX6v1-IOHUX3kurqLoTONICYf-BTDNGZqO_3HqQwJBqC7covXzLHrBw&hash=d76545ece7bc19cded210f5b79cc469e94950cf23a07843339a82b3988bd8539"

  const {
    data: loginResult,
    isLoading: isLoginLoading,
    isError: isLoginError,
  } = useQuery({
    queryKey: ["auth", initDataRaw],
    queryFn: () => login(initDataRaw),
    retry: false,
  })

  const {
    data: claimResult,
    isLoading: isClaimLoading,
    isError: isClaimError,
  } = useQuery({
    queryKey: ["claims"],
    queryFn: () => claim(user!.token),
    retry: false,
    enabled: Boolean(user?.token) && requests.success,
  })

  const {
    data: balanceResult,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: () => getIncome(user!.token),
    retry: false,
    enabled:
      Boolean(user?.token) &&
      !isClaimLoading &&
      !isClaimError &&
      requests.success,
  })

  const {
    data: electricityResult,
    isLoading: isElectricityLoading,
    isError: isElectricityError,
  } = useQuery({
    queryKey: ["electricity"],
    queryFn: () => getElectricity(user!.token),
    retry: false,
    enabled: Boolean(user?.token) && requests.success,
  })

  const {
    data: corridorsResult,
    isLoading: isCorridorsLoading,
    isError: isCorridorsError,
  } = useQuery({
    queryKey: ["corridors"],
    queryFn: () => getCorridors(user!.token),
    retry: false,
    enabled: Boolean(user?.token) && requests.success,
  })

  const {
    data: multiplierResult,
    isLoading: isMultiplierLoading,
    isError: isMultiplierError,
  } = useQuery({
    queryKey: ["multiplier"],
    queryFn: () => getMultiplier(user!.token),
    retry: false,
    enabled: Boolean(user?.token) && requests.success,
  })

  useEffect(() => {
    if (isLoginError) {
      applyError()
      return
    }
    if (!loginResult || isLoginLoading) return
    setUser(loginResult.data)
    checkRequest("login")
  }, [
    loginResult,
    setUser,
    applyError,
    checkRequest,
    isLoginLoading,
    isLoginError,
  ])

  useEffect(() => {
    if (isClaimError) {
      applyError()
      return
    }
    if (!claimResult || isClaimLoading) return
    checkRequest("claim")
  }, [
    claimResult,
    isClaimError,
    isClaimLoading,
    setUser,
    applyError,
    checkRequest,
  ])

  useEffect(() => {
    if (isBalanceError) {
      applyError()
      return
    }
    if (!balanceResult || isBalanceLoading) return

    setBalance(Number(balanceResult.data.currentBalance))
    setIncome(balanceResult.data.basePassiveIncomePerSecond)

    checkRequest("balance")
  }, [
    balanceResult,
    isBalanceError,
    isBalanceLoading,
    setUser,
    applyError,
    checkRequest,
    setBalance,
    setIncome,
  ])

  useEffect(() => {
    if (isElectricityError) {
      applyError()
      return
    }
    if (!electricityResult || isElectricityLoading) return

    setElectricityDate(new Date(electricityResult.data.nextPaymentDue))
    setElectricityCost(electricityResult.data.estimatedCost)
    checkRequest("electricity")
  }, [
    electricityResult,
    isElectricityError,
    isElectricityLoading,
    setUser,
    applyError,
    checkRequest,
    setElectricityDate,
    setElectricityCost,
  ])

  useEffect(() => {
    if (isCorridorsError) {
      applyError()
      return
    }
    if (!corridorsResult || isCorridorsLoading) return

    checkRequest("corridors")
  }, [
    corridorsResult,
    isCorridorsError,
    isCorridorsLoading,
    setUser,
    applyError,
    checkRequest,
  ])

  useEffect(() => {
    if (isMultiplierError) {
      applyError()
      return
    }
    if (!multiplierResult || isMultiplierLoading) return

    console.log(multiplierResult.data)
    checkRequest("multiplier")
  }, [
    multiplierResult,
    isMultiplierError,
    isMultiplierLoading,
    setUser,
    applyError,
    checkRequest,
  ])

  if (isLoginLoading && !isLoginError && !requests.done) {
    return <div>Loading</div>
  }

  if (isLoginError || !requests.success) {
    return <div>Internal Server Error</div>
  }

  // Специальный layout для сцены игры (Home)
  if (currentPage === "home") {
    return (
      <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
        {/* Сцена */}
        <Home />
        {/* Интерфейс (HUD) поверх сцены */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {/* Хедер поверх */}
          <div className="pointer-events-auto absolute left-0 right-0 top-0 z-20">
            <UserHeader />
          </div>

          {/* Кнопка перехода к лидерборду */}
          <div className="pointer-events-auto absolute left-1/2 top-20 z-20 -translate-x-1/2 transform">
            <button
              className="rounded-full bg-purple-600 px-6 py-2 font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-purple-500 active:scale-95"
              onClick={() => usePage.getState().switchPage("leaderboard")}
            >
              {translations.leaderboardButton}
            </button>
          </div>

          {/* Нижний navbar поверх */}
          <div className="pointer-events-auto absolute bottom-0 left-0 right-0 z-20">
            <Navbar />
          </div>
        </div>

        <GlobalUI />
      </div>
    )
  }

  let pageContent
  switch (currentPage) {
    case "quizzes":
      pageContent = <Quizzes />
      break
    case "broadcast":
      pageContent = <Broadcast />
      break
    case "tasks":
      pageContent = <Tasks />
      break
    case "club":
      pageContent = <Club />
      break
    case "leaderboard":
      pageContent = <Leaderboard />
      break
    case "donationShop":
      pageContent = <DonationShop />
      break
    default:
      pageContent = <div>Страница не найдена</div>
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-[#0e0e1a] via-[#121212] to-[#1a0c2e] text-white">
      {/* Фиксированный хедер */}
      <header className="z-10">
        <UserHeader />
      </header>

      {/* Прокручиваемое содержимое */}
      <main className="scrollbar-none flex-1 overflow-y-auto px-4">
        <div className="mx-auto w-full max-w-md pb-24">{pageContent}</div>
      </main>

      {/* Фиксированный футер */}
      <footer className="z-10 bg-black/80 shadow-lg backdrop-blur-lg">
        <Navbar />
      </footer>

      <GlobalUI />
    </div>
  )
}

export default AppLayout
