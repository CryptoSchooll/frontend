import { create } from "zustand"

type balanceStore = {
  balance: number
  income: number
  actions: {
    updateBalance: () => void
    addIncome: (rate: number) => void
    substractIncome: (rate: number) => void
    addBalance: (amount: number) => void
    substractBalance: (amount: number) => void
    canAfford: (cost: number) => boolean
  }
}

const useBalanceStore = create<balanceStore>((set, get) => ({
  balance: 0,
  income: 10,
  actions: {
    updateBalance: () =>
      set((state) => ({
        balance: state.balance + state.income,
      })),
    addIncome: (rate) => {
      if (rate <= 0) return

      set((state) => ({ income: state.income + rate }))
    },
    substractIncome: (rate) => {
      if (rate <= 0) return

      set((state) => ({ income: Math.max(0, state.income - rate) }))
    },
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
  useBalanceStore.getState().actions.updateBalance()
}, 1000)

export default useBalanceStore
