type Position = 1 | 2 | 3 | 4

type Side = "start" | "end"

type LanguageCode = "en" | "ru"

type Class = {
  id: string
  position: Position
  name: string
  cost: number
  income: number
}

type ClassLike =
  | ({
    isClass: true
  } & Class)
  | {
    position: Position
    isClass: false
  }

type Direction = "up" | "down" | "left" | "right"

type Corridor = {
  id: string
  cost: number
  corridorNumber: number
  startX: number
  startY: number
  endX: number
  endY: number
  direction: Direction
  classes: Class[]
  availableDirectionsStart: Direction[]
  availableDirectionsEnd: Direction[]
}

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
      },
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