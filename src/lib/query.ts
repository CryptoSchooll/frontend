import axios from "axios"

export const login = async (rawInitData: string) => {
  const endpoint = "api/v1/auth/token"

  const res = await axios.post<LoginResponse>(`http://localhost:3000/${endpoint}`, {
    initData: rawInitData,
  }, {
    headers: {
      "Content-Type": "application/json",
      "X-Telegram-Init-Data": rawInitData,
    },
  })

  return res.data
}

export const claim = async (token: string) => {
  const endpoint = "api/v1/incomes/claim"

  const res = await axios.post<ClaimResponse>(`http://localhost:3000/${endpoint}`, null, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  return res.data
}

export const getIncome = async (token: string) => {
  const endpoint = "api/v1/incomes"

  const res = await axios.get(`http://localhost:3000/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  return res.data
}

export const getElectricity = async (token: string) => {
  const endpoint = "api/v1/electricity/status"
  const res = await axios.get(`http://localhost:3000/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  return res.data
}

export const payElectricity = async (token: string) => {
  const endpoint = "api/v1/electricity/pay"

  const res = await axios.post(`http://localhost:/${endpoint}`, null, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })

  return res.data
}