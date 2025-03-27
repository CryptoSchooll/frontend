type Position = 1 | 2 | 3 | 4

type Side = "start" | "end"

type Class = {
  id: string
  position: Position
}

type ClassLike =
  | {
    isClass: boolean
    id: string
    position: Position
  }
  | {
    position: Position
    isClass: boolean
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
