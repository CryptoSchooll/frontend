import { Navbar, UserHeader } from "@/components"
import usePage from "@/hooks/usePage"
import { Broadcast, Clans, Home, Quizzes, Tasks } from "@/pages"

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
    case "clans":
      pageContent = <Clans />
      break
    default:
      pageContent = <div>Страница не найдена</div>
  }

  return (
    <div className="relative min-h-screen">
      {/* Фиксированный хедер без фона и лишних отступов */}
      <header className="fixed left-0 right-0 top-4 z-10">
        <UserHeader />
      </header>

      {/* Основное содержимое страницы с отступами, чтобы не пересекаться с хедером и навбаром */}
      <main className={currentPage !== "home" && "mt-24"}>{pageContent}</main>

      {/* Фиксированный нижний навбар (если нужен именно фиксированный) */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 bg-white p-4 shadow">
        <Navbar />
      </footer>
    </div>
  )
}

export default AppLayout
