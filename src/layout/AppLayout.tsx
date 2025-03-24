import type React from "react"

import Navbar from "../components/Navbar"
import UserHeader from "../components/UserHeader"
import usePage from "../hooks/usePage"
import Broadcast from "../pages/Broadcast"
import Clans from "../pages/Clans"
import Home from "../pages/Home"
import Quizzes from "../pages/Quizzes"
import Tasks from "../pages/Tasks"

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
      {/* Фиксированный хедер */}
      <header className="fixed left-0 right-0 top-0 z-10 bg-white p-4 shadow">
        <UserHeader />
      </header>

      {/* Основное содержимое страницы с отступами, чтобы не пересекаться с хедером и навбаром */}
      <main className="mt-24">{pageContent}</main>

      {/* Фиксированный нижний навбар */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 bg-white p-4 shadow">
        <Navbar />
      </footer>
    </div>
  )
}

export default AppLayout
