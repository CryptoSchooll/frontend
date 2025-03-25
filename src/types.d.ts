type Class = {
  id: string
  position: number
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
  connected: boolean
  classes: Class[]
  availableDirectionsStart: Direction[]
  availableDirectionsEnd: Direction[]
  multi: boolean
}
