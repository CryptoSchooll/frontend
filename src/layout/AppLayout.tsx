import { Navbar, UserHeader } from "@/components"
import { GlobalDrawers } from "@/components/GlobalDrawer"
import usePage from "@/hooks/usePage"
import { Broadcast, Club, Home, Quizzes, Tasks } from "@/pages"

const AppLayout: React.FC = () => {
  const { currentPage } = usePage()

  let pageContent
  switch (currentPage) {
    case "home":
      pageContent = <Home />
      break
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
    default:
      pageContent = <div>Страница не найдена</div>
  }

  return (
    <div className="relative min-h-screen">
      {/* Фиксированный хедер без фона и лишних отступов */}
      <header className="fixed left-0 right-0 top-0 z-10">
        <UserHeader />
      </header>

      {/* Основное содержимое страницы с отступами, чтобы не пересекаться с хедером и навбаром */}
      <main className={currentPage !== "home" ? "mt-24" : undefined}>
        {pageContent}
      </main>

      {/* Фиксированный нижний навбар (если нужен именно фиксированный) */}
      <footer className="bg-black shadow">
        <Navbar />
      </footer>

      <GlobalDrawers />
    </div>
  )
}

export default AppLayout
