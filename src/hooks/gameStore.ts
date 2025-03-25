import { create } from "zustand"

const DIRECTIONS = ["up", "down", "left", "right"] as const

type GameStore = {
  corridors: Corridor[]
  filled: boolean
  appendClass: (corridorId: string, position: number) => void
  addCorridor: (
    previousCorridorId: string,
    direction: Direction,
    position: "start" | "end",
  ) => void
}

export const useGameStore = create<GameStore>((set, get) => ({
  corridors: [
    {
      id: "1",
      startX: 0,
      startY: 0,
      endX: 1,
      endY: 0,
      direction: "right",
      connected: false,
      corridorNumber: 1,
      cost: 1000,
      classes: [],
      availableDirectionsStart: ["up", "down", "left"],
      availableDirectionsEnd: ["up", "down", "right"],
      multi: true,
    },
  ],

  filled: false,

  appendClass: (corridorId, position) =>
    set((state) => {
      let filled = false
      const updatedCorridors = state.corridors.map((corridor) => {
        if (corridor.id !== corridorId) return corridor

        const isPositionOccupied = corridor.classes.some(
          (cls) => cls.position === position,
        )

        if (isPositionOccupied) {
          console.warn(
            `Position ${position} is already occupied in corridor ${corridorId}`,
          )
          return corridor
        }

        // Generate a new unique ID for the class
        const newClassId = crypto.randomUUID()
        const classes = [
          ...corridor.classes,
          {
            id: newClassId,
            position: position,
          },
        ]

        if (classes.length === 4) filled = true

        // Add the new class to the corridor
        return {
          ...corridor,
          classes,
        }
      })

      return { corridors: updatedCorridors, filled }
    }),

  addCorridor: (previousCorridorId, direction, position) => {
    const state = get()
    const previousCorridor = state.corridors.find(
      (corridor) => corridor.id === previousCorridorId,
    )
    if (!previousCorridor) {
      console.warn(`Corridor with ID ${previousCorridorId} not found`)
      return
    }
    if (previousCorridor.classes.length !== 4) {
      console.warn(
        "Cannot add corridor. Previous corridor must have all 4 classes.",
      )
      return
    }

    const isValidDirection =
      position === "start"
        ? previousCorridor.availableDirectionsStart.includes(direction) &&
        previousCorridor.direction !== direction
        : previousCorridor.availableDirectionsEnd.includes(direction) &&
        opositeDirections[previousCorridor.direction] !== direction

    if (!isValidDirection) {
      console.warn(`Direction ${direction} is not available for this corridor`)
      return
    }

    const newCorridor = generateNewCorridor(
      previousCorridor,
      direction,
      position,
    )

    console.log(previousCorridor, newCorridor)

    set((state) => ({
      corridors: [
        ...state.corridors.map((corridor) =>
          corridor.id === previousCorridorId
            ? {
              ...corridor,
              availableDirectionsStart:
                corridor.multi && position === "start"
                  ? corridor.availableDirectionsStart.filter(
                    (dir) => dir !== direction,
                  )
                  : corridor.availableDirectionsStart,
              availableDirectionsEnd:
                position === "end"
                  ? corridor.availableDirectionsEnd.filter(
                    (dir) => dir !== direction,
                  )
                  : corridor.availableDirectionsEnd,
              connected: true,
            }
            : corridor,
        ),
        newCorridor,
      ],
      filled: false,
    }))
  },
}))

const generateNewCorridor = (
  previousCorridor: Corridor,
  direction: Direction,
  position: "start" | "end",
): Corridor => {
  let newStartX = previousCorridor.startX
  let newStartY = previousCorridor.startY
  let newEndX = previousCorridor.startX
  let newEndY = previousCorridor.startY

  if (position === "start") {
    switch (direction) {
      case "right":
        newStartX = previousCorridor.startX
        newEndX = newStartX + 1
        break
      case "left":
        newStartX = previousCorridor.startX
        newEndX = newStartX - 1
        break
      case "up":
        newStartY = previousCorridor.startY
        newEndY = newStartY + 1
        break
      case "down":
        newStartY = previousCorridor.startY
        newEndY = newStartY - 1
        break
    }
  } else {
    switch (direction) {
      case "right":
        newStartX = previousCorridor.endX
        newEndX = newStartX + 1
        newStartY = previousCorridor.endY
        newEndY = previousCorridor.endY
        break
      case "left":
        newStartX = previousCorridor.endX
        newEndX = newStartX - 1
        newStartY = previousCorridor.endY
        newEndY = previousCorridor.endY
        break
      case "up":
        newStartY = previousCorridor.endY
        newEndY = newStartY + 1
        newStartX = previousCorridor.endX
        newEndX = previousCorridor.endX
        break
      case "down":
        newStartY = previousCorridor.endY
        newEndY = newStartY - 1
        newStartX = previousCorridor.endX
        newEndX = previousCorridor.endX
        break
    }
  }

  return {
    id: crypto.randomUUID(),
    startX: newStartX,
    startY: newStartY,
    endX: newEndX,
    endY: newEndY,
    direction: direction,
    connected: true,
    corridorNumber: previousCorridor.corridorNumber + 1,
    cost: 1000,
    classes: [],
    multi: false,
    availableDirectionsStart: [],
    availableDirectionsEnd: DIRECTIONS.filter(
      (dir) => dir !== opositeDirections[direction],
    ),
  }
}

const opositeDirections: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
}
