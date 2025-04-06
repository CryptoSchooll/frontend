import { create } from "zustand"

type UserStore = {
  user: LoginResponse["data"] | null
  requests: {
    list: {
      login: boolean
      claim: boolean
      balance: boolean
    }
    done: boolean
    success: boolean
  }

  setUser: (user: LoginResponse["data"]) => void
  checkRequest: (name: string) => void
  applyError: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  requests: {
    list: {
      login: false,
      claim: false,
      balance: false,
      electricity: false,
    },
    done: false,
    success: true,
  },
  setUser: (user) => set({ user }),
  checkRequest: (name) => {
    set((state) => {
      const requestsList = state.requests.list
      requestsList[name as keyof typeof requestsList] = true
      const requests = {
        list: requestsList,
        done: Object.values(requestsList).every((request) => request),
      }

      return {
        requests: {
          ...state.requests,
          ...requests,
        },
      }
    })
  },
  applyError: () =>
    set((state) => ({
      requests: {
        ...state.requests,
        success: false,
      },
    })),
}))
