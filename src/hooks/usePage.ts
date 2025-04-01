import { create } from "zustand"

type PageType =
  | "home"
  | "quizzes"
  | "broadcast"
  | "tasks"
  | "club"
  | "leaderboard"

interface PageStore {
  currentPage: PageType
  switchPage: (page: PageType) => void
}

const usePage = create<PageStore>((set) => ({
  currentPage: "home",
  switchPage: (page) => set({ currentPage: page }),
}))

export default usePage
