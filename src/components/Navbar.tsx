import usePage from "@/hooks/usePage"

const Navbar = () => {
  const { switchPage } = usePage()

  return (
    <ul className="flex items-center justify-between bg-gray-600 p-1">
      <li className="size-8">
        <div
          className="size-8 rounded-full bg-gray-400"
          onClick={() => switchPage("quizzes")}
        />
      </li>
      <li className="size-8">
        <div
          className="size-8 rounded-full bg-gray-400"
          onClick={() => switchPage("broadcast")}
        />
      </li>
      <li className="size8 relative">
        <div
          className="absolute -right-6 bottom-0 size-12 rounded-full bg-gray-400"
          onClick={() => switchPage("home")}
        />
      </li>
      <li className="size-8">
        <div
          className="size-8 rounded-full bg-gray-400"
          onClick={() => switchPage("tasks")}
        />
      </li>
      <li className="size-8">
        <div
          className="size-8 rounded-full bg-gray-400"
          onClick={() => switchPage("clans")}
        />
      </li>
    </ul>
  )
}

export default Navbar
