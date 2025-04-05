import { create } from "zustand"

type balanceStore = {
  balance: number
  income: number
  electricityPaidUntil: Date | null
  electricityCost: number
  electricityOn: boolean
  incomeMultiplier: number
  multiplierExpiresAt: Date | null

  actions: {
    updateBalance: () => void
    addIncome: (rate: number) => void
    setBalance: (amount: number) => void
    setIncome: (amount: number) => void
    substractIncome: (rate: number) => void
    addBalance: (amount: number) => void
    substractBalance: (amount: number) => void
    canAfford: (cost: number) => boolean
    setElectricityDate: (date: Date) => void
    setElectricityCost: (cost: number) => void
    payForElectricity: () => boolean
    checkForElectricity: () => void
    activateMultiplier: (multiplier: number, durationHours: number) => void
    checkForMultiplier: () => void
  }
}

const ELECTRICITY_DURATION_HOURS = 4
const ELECTRICITY_COST = 50
const DEFAULT_INCOME_MULTIPLIER = 1

const useBalanceStore = create<balanceStore>((set, get) => ({
  balance: ELECTRICITY_COST + 10000,
  income: 10,
  electricityPaidUntil: null,
  electricityCost: ELECTRICITY_COST,
  electricityOn: false,
  incomeMultiplier: DEFAULT_INCOME_MULTIPLIER,
  multiplierExpiresAt: null,

  actions: {
    updateBalance: () => {
      const { electricityOn, income, incomeMultiplier, multiplierExpiresAt } =
        get()
      let currentMultiplier = DEFAULT_INCOME_MULTIPLIER
      if (multiplierExpiresAt && new Date() < multiplierExpiresAt) {
        currentMultiplier = incomeMultiplier
      }

      const effectiveIncome = income * currentMultiplier

      if (electricityOn) {
        set((state) => {
          return {
            balance: Math.floor(state.balance + effectiveIncome),
          }
        })
      }
    },
    setBalance: (amount) => {
      if (amount < 0) return
      set({ balance: amount })
    },
    setIncome: (amount) => {
      if (amount < 0) return
      set({ income: amount })
    },
    addIncome: (rate) => {
      if (rate <= 0) return

      set((state) => ({ income: Math.floor(state.income + rate) }))
    },
    substractIncome: (rate) => {
      if (rate <= 0) return

      set((state) => ({ income: Math.floor(Math.max(0, state.income - rate)) }))
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
    setElectricityDate: (date) => {
      set({ electricityPaidUntil: date })
    },
    setElectricityCost: (cost) => {
      set({ electricityCost: cost })
    },
    payForElectricity: () => {
      const { balance, electricityCost } = get()
      if (balance < electricityCost) return false

      const now = new Date()
      const expiryDate = new Date(
        now.getTime() + ELECTRICITY_DURATION_HOURS * 60 * 60 * 1000,
      )

      set((state) => ({
        balance: state.balance - electricityCost,
        electricityPaidUntil: expiryDate,
        electricityOn: true,
      }))

      return true
    },
    checkForElectricity: () => {
      const { electricityPaidUntil } = get()

      const now = new Date()
      set({
        electricityOn:
          Boolean(electricityPaidUntil) && now < electricityPaidUntil!,
      })
    },
    activateMultiplier: (multiplier, durationHours) => {
      if (multiplier <= DEFAULT_INCOME_MULTIPLIER || durationHours <= 0) return
      const now = new Date()
      const expiryDate = new Date(
        now.getTime() + durationHours * 60 * 60 * 1000,
      )

      set({
        incomeMultiplier: multiplier,
        multiplierExpiresAt: expiryDate,
      })
    },
    checkForMultiplier: () => {
      const { multiplierExpiresAt, incomeMultiplier } = get()
      const now = new Date()

      if (multiplierExpiresAt && now >= multiplierExpiresAt) {
        if (incomeMultiplier !== DEFAULT_INCOME_MULTIPLIER) {
          set({
            incomeMultiplier: DEFAULT_INCOME_MULTIPLIER,
            multiplierExpiresAt: null,
          })
        }
      }
    },
  },
}))

// setInterval(() => {
//   useBalanceStore.getState().actions.updateBalance()
// }, 1000)

// setInterval(() => {
//   useBalanceStore.getState().actions.checkForElectricity()
// }, 1000)

// setInterval(() => {
//   useBalanceStore.getState().actions.checkForMultiplier()
// }, 1000)

export default useBalanceStore
