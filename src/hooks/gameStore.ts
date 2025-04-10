import { create } from "zustand"

import { DIRECTIONS, OPOSITE_DIRECTIONS } from "@/constants"

const MAX_CORRIDORS = 8
const MAX_COORDINATE = 3

const calculateFilledState = (corridors: Corridor[]): boolean => {
  if (corridors.length >= MAX_CORRIDORS) {
    return false
  }

  return corridors.every((corridor) => corridor.classes.length === 4)
}

export type GameStore = {
  corridors: Corridor[]
  filled: boolean
  actions: {
    appendClass: (corridorId: string, newClass: Class) => void
    removeClass: (corridorId: string, position: number) => void
    addCorridor: (
      previousCorridorId: string,
      direction: Direction,
      side: Side,
    ) => void
  }
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
      corridorNumber: 1,
      cost: 1000,
      classes: [],
      availableDirectionsStart: ["up", "down", "left"],
      availableDirectionsEnd: ["up", "down", "right"],
    },
  ],

  filled: false,

  actions: {
    appendClass: (corridorId: string, newClass: Class) =>
      set((state) => {
        let corridorFound = false
        const updatedCorridors = state.corridors.map((corridor) => {
          if (corridor.id !== corridorId) return corridor

          corridorFound = true
          const isPositionOccupied = corridor.classes.some(
            (cls) => cls.position === newClass.position,
          )

          if (isPositionOccupied) {
            console.warn(
              `Position ${newClass.position} is already occupied in corridor ${corridorId}`,
            )
            return corridor
          }

          if (corridor.classes.length >= 4) {
            console.warn(`Corridor ${corridorId} is already full.`)
            return corridor
          }

          const updatedClasses = [...corridor.classes, newClass]

          return {
            ...corridor,
            classes: updatedClasses,
          }
        })

        if (!corridorFound) {
          console.warn(
            `Corridor with ID ${corridorId} not found for appending class.`,
          )
          return state
        }

        const newFilled = calculateFilledState(updatedCorridors)

        return { corridors: updatedCorridors, filled: newFilled }
      }),

    removeClass: (corridorId: string, classPosition: number) =>
      set((state) => {
        let corridorFound = false
        const updatedCorridors = state.corridors.map((corridor) => {
          if (corridor.id !== corridorId) {
            return corridor
          }

          corridorFound = true
          const classExists = corridor.classes.some(
            (cls) => cls.position === classPosition,
          )

          if (!classExists) {
            console.warn(
              `Class at position ${classPosition} not found in corridor ${corridorId}`,
            )
            return corridor
          }

          const updatedClasses = corridor.classes.filter(
            (cls) => cls.position !== classPosition,
          )

          return {
            ...corridor,
            classes: updatedClasses,
          }
        })

        if (!corridorFound) {
          console.warn(
            `Corridor with ID ${corridorId} not found for removing class.`,
          )
          return state
        }

        const newFilled = calculateFilledState(updatedCorridors)

        return { corridors: updatedCorridors, filled: newFilled }
      }),

    addCorridor: (previousCorridorId, direction, side) => {
      const state = get()

      if (!state.filled) return

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
        side === "start"
          ? previousCorridor.availableDirectionsStart.includes(direction) &&
            previousCorridor.direction !== direction
          : previousCorridor.availableDirectionsEnd.includes(direction) &&
            OPOSITE_DIRECTIONS[previousCorridor.direction] !== direction

      if (!isValidDirection) {
        console.warn(
          `Direction ${direction} is not available for this corridor`,
        )
        return
      }

      const newCorridor = generateNewCorridor(previousCorridor, direction, side)

      const connCorridorEnd = state.corridors.find(
        (corridor) =>
          corridor.endX === newCorridor.endX &&
          corridor.endY === newCorridor.endY,
      )
      if (connCorridorEnd) {
        newCorridor.availableDirectionsEnd = []
      }

      const connCorridorStart = state.corridors.find(
        (corridor) =>
          corridor.startX === newCorridor.endX &&
          corridor.startY === newCorridor.endY,
      )
      if (connCorridorStart) {
        newCorridor.availableDirectionsEnd = []
      }

      // ADD NEW CORRIDOR TO DB

      set((state) => {
        const updatedCorridors = state.corridors.map((corridor) => {
          if (corridor.id === previousCorridorId) {
            const newDirectionsStart =
              side === "start"
                ? corridor.availableDirectionsStart.filter(
                    (dir) => dir !== direction,
                  )
                : corridor.availableDirectionsStart

            const newDirectionsEnd =
              side === "end"
                ? corridor.availableDirectionsEnd.filter(
                    (dir) => dir !== direction,
                  )
                : corridor.availableDirectionsEnd

            // UPDATE IN DB
            return {
              ...corridor,
              availableDirectionsStart: newDirectionsStart,
              availableDirectionsEnd: newDirectionsEnd,
            }
          } else if (connCorridorEnd?.id === corridor.id) {
            const newCorridorEnd = corridor.availableDirectionsEnd.filter(
              (dir) => dir !== OPOSITE_DIRECTIONS[direction],
            )

            // UPDATE IN DB
            return {
              ...corridor,
              availableDirectionsEnd: newCorridorEnd,
            }
          } else if (connCorridorStart?.id === corridor.id) {
            const newCorridorStart = corridor.availableDirectionsStart.filter(
              (dir) => dir !== OPOSITE_DIRECTIONS[direction],
            )

            // UPDATE IN DB
            return {
              ...corridor,
              availableDirectionsStart: newCorridorStart,
            }
          } else return corridor
        })

        return {
          corridors: [...updatedCorridors, newCorridor],
          filled: false,
        }
      })
    },
  },
}))

const generateNewCorridor = (
  previousCorridor: Corridor,
  direction: Direction,
  side: Side,
): Corridor => {
  let newStartX = previousCorridor.startX
  let newStartY = previousCorridor.startY
  let newEndX = previousCorridor.startX
  let newEndY = previousCorridor.startY

  if (side === "start") {
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

  let availableDirectionsEnd = DIRECTIONS.filter(
    (dir) => dir !== OPOSITE_DIRECTIONS[direction],
  )

  if (newEndX == MAX_COORDINATE) {
    availableDirectionsEnd = availableDirectionsEnd.filter(
      (dir) => dir !== "right",
    )
  }
  if (newEndX == -MAX_COORDINATE) {
    availableDirectionsEnd = availableDirectionsEnd.filter(
      (dir) => dir !== "left",
    )
  }
  if (newEndY == MAX_COORDINATE) {
    availableDirectionsEnd = availableDirectionsEnd.filter(
      (dir) => dir !== "up",
    )
  }
  if (newEndY == -MAX_COORDINATE) {
    availableDirectionsEnd = availableDirectionsEnd.filter(
      (dir) => dir !== "down",
    )
  }

  return {
    id: crypto.randomUUID(),
    startX: newStartX,
    startY: newStartY,
    endX: newEndX,
    endY: newEndY,
    direction: direction,
    corridorNumber: previousCorridor.corridorNumber + 1,
    cost: 1000,
    classes: [],
    availableDirectionsStart: [],
    availableDirectionsEnd: availableDirectionsEnd,
  }
}
