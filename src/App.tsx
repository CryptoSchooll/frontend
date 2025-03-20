import Navbar from "./components/Navbar"
import usePage from "./hooks/usePage"
import Broadcast from "./pages/Broadcast"
import Clans from "./pages/Clans"
import Home from "./pages/Home"
import Quizzes from "./pages/Quizzes"
import Tasks from "./pages/Tasks"

const renderPage = (page: string) => {
  switch (page) {
    case "home":
      return <Home />
    case "quizzes":
      return <Quizzes />
    case "tasks":
      return <Tasks />
    case "broadcast":
      return <Broadcast />
    case "clans":
      return <Clans />
    default:
      return <Home />
  }
}

const App: React.FC = () => {
  const { currentPage } = usePage()
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1">{renderPage(currentPage)}</div>
      <Navbar />
    </div>
  )
}

export default App
