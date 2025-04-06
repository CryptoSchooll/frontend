import axios from "axios"

const API_URL = "http://localhost:3000/api/v1"

const ENDPOINTS = {
  login: "auth/token",
  claim: "incomes/claim",
  getIncome: "incomes",
  getElectricity: "electricity/status",
  payElectricity: "electricity/pay",
} as const

const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const login = async (rawInitData: string) => {
  const res = await client.post<LoginResponse>(
    ENDPOINTS.login,
    {
      initData: rawInitData,
    },
    {
      headers: {
        "X-Telegram-Init-Data": rawInitData,
      },
    },
  )

  return res.data
}

export const claim = async (token: string) => {
  const res = await client.post<ClaimResponse>(ENDPOINTS.claim, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

export const getIncome = async (token: string) => {
  const res = await client.get(ENDPOINTS.getIncome, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

export const getElectricity = async (token: string) => {
  const res = await client.get(ENDPOINTS.getElectricity, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

export const payElectricity = async (token: string) => {
  const res = await client.post(ENDPOINTS.payElectricity, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}
