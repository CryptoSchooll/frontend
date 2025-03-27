export const DIRECTIONS = ["up", "down", "left", "right"] as const

export const OPOSITE_DIRECTIONS = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
} as const

export const CORRIDOR_POSITIONS = {
  right: { rotate: "0deg", top: 0, left: 0 },
  left: { rotate: "180deg", top: 0, left: -400 },
  up: { rotate: "-90deg", top: -200, left: -200 },
  down: { rotate: "90deg", top: 200, left: -200 },
}

export const CLASS_POSITIONS = {
  1: { bottom: "0px", left: "110px" },
  2: { bottom: "0px", right: "110px" },
  3: { top: "40px", left: "110px" },
  4: { top: "40px", right: "110px" },
}

export const BUTTONS_POSITIONS = {
  up: { left: "3px", top: "-40px" },
  down: { left: "3px", bottom: "-40px" },
  left: { top: "3px", left: "-40px" },
  right: { top: "3px", right: "-40px" },
}
