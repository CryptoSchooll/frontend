/* eslint-disable @typescript-eslint/no-explicit-any */

type LoginResponse = {
  success: boolean
  data: {
    token: string
    refreshToken: string
    tmaData: {
      user: {
        id: number
        first_name: string
        last_name: string
        username: string
        language_code: string
        allows_write_to_pm: boolean
        photo_url: string
      }
      startParam: any
      queryId: any
      authDate: string
      hash: string
    }
  }
}

type ClaimResponse = {
  success: boolean
  data: {
    claimedAmount: string
    newBalance: string
    lastCalculation: string
  }
}

type ElectricityResponse = {
  success: boolean
  data: {
    status: string
    lastPaymentTime: string
    nextPaymentDue: string
    timeRemaining: string
    estimatedCost: string
  }
}

type IncomeResponse = {
  success: boolean
  data: {
    currentBalance: string
    totalPassiveIncomePerSecond: number
    basePassiveIncomePerSecond: number
    potentialUnclaimedIncome: number
    lastCalculation: string
    lastPaymentTime: string
    nextPaymentDue: string
    activeMultiplier: number
    storedUnclaimedIncome: string
  }
}

type payElectricityResponse = {
  success: boolean
  data: {
    paymentAmount: string
    newStatus: string
    nextPaymentDue: string
    newBalance: string
    transactionId: null
  }
}
