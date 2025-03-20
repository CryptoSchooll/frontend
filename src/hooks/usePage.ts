import { create } from "zustand"

type PageStore = {
  currentPage: string
  switchPage: (page: string) => void
}

const usePage = create<PageStore>((set) => ({
  currentPage: "home",
  switchPage: (page) => set({ currentPage: page }),
}))

export default usePage
