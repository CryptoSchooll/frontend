import { create } from "zustand"

type UserStore = {
  user: LoginResponse["data"] | null,
  auth: boolean,
  setUser: (user: LoginResponse["data"]) => void,
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  auth: false,
  setUser: (user) => set({ user, auth: true }),
}))