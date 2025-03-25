import { create } from "zustand"

type GameStore = {
  corridors: Corridor[]
  appendClass: (corridorId: string, position: number) => void
  addCorridor: (
    previousCorridorId: string,
    direction: Direction,
    position: "start" | "end",
  ) => void
}

export const useGameStore = create<GameStore>((set) => ({
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
    },
  ],

  appendClass: (corridorId, position) =>
    set((state) => {
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

        // Add the new class to the corridor
        return {
          ...corridor,
          classes: [
            ...corridor.classes,
            {
              id: newClassId,
              position: position,
            },
          ],
        }
      })

      return { corridors: updatedCorridors }
    }),

  addCorridor: (previousCorridorId, direction, position) =>
    set((state) => {
      const previousCorridor = state.corridors.find(
        (corridor) => corridor.id === previousCorridorId,
      )

      if (!previousCorridor) {
        console.warn(`Corridor with ID ${previousCorridorId} not found`)
        return state
      }

      const newCorridor = generateNewCorridor(
        previousCorridor,
        direction,
        position,
      )

      return {
        corridors: [...state.corridors, newCorridor],
      }
    }),
}))

const generateNewCorridor = (
  previousCorridor: Corridor,
  direction: Direction,
  position: "start" | "end",
) => {
  let newStartX = previousCorridor.startX
  let newStartY = previousCorridor.startY
  let newEndX = previousCorridor.endX
  let newEndY = previousCorridor.endY

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
    connected: false,
    corridorNumber: previousCorridor.corridorNumber + 1,
    cost: 1000,
    classes: [],
  }
}
