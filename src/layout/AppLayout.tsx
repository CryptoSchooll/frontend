import { Navbar, UserHeader } from "@/components"
import { GlobalUI } from "@/components/GlobalUI"
import usePage from "@/hooks/usePage"
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
              Таблица лидеров
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

  // Общий layout для всех остальных страниц
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
