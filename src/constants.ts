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

// !TEMP
export const CLASSES = [
  {
    id: "class1",
    name: "Литература",
  },
  {
    id: "class2",
    name: "Русский язык",
  },
  {
    id: "class3",
    name: "География",
  },
  {
    id: "class4",
    name: "История",
  },
  {
    id: "class5",
    name: "Математика",
  },
  {
    id: "class6",
    name: "Биология",
  },
  {
    id: "class7",
    name: "Английский",
  },
  {
    id: "class8",
    name: "Информатика",
  },
  {
    id: "class9",
    name: "Физика",
  },
  {
    id: "class10",
    name: "Химия",
  },
]
