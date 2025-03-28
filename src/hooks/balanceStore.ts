import { create } from "zustand"

type balanceStore = {
  balance: number
  income: number
  actions: {
    addIncome: () => void
    setIncome: (newRate: number) => void
    addBalance: (amount: number) => void
    substractBalance: (amount: number) => void
    canAfford: (cost: number) => boolean
  }
}

const useBalanceStore = create<balanceStore>((set, get) => ({
  balance: 0,
  income: 0,
  actions: {
    addIncome: () =>
      set((state) => ({
        balance: state.balance + state.income,
      })),
    setIncome: (newRate) => set({ income: Math.max(0, newRate) }),
    addBalance: (amount) => {
      if (amount <= 0) return

      set((state) => ({ balance: state.balance + amount }))
    },
    substractBalance: (amount) => {
      if (amount <= 0) return

      set((state) => ({ balance: Math.max(0, state.balance - amount) }))
    },
    canAfford: (cost) => get().balance >= cost,
  },
}))

setInterval(() => {
  useBalanceStore.getState().actions.addIncome()
}, 1000)

export default useBalanceStore
