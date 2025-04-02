import { create } from "zustand"

export type ShopDrawerContext = {
  corridorId: string
  position: Position
}

export type ConfirmDrawerContext = {
  corridorId: string
  direction: Direction
  side: Side
}

export type ClassInfoContext = {
  classId: string
}

export type QuizContext = {
  quizId: string
}

export type QuizConfirmContext = {
  quizId: string
  title: string
  actionType: "start" | "continue" | "exit"
}

export type UIStore = {
  isShopDrawerOpen: boolean
  shopDrawerContext: ShopDrawerContext | null

  isConfirmDrawerOpen: boolean
  confirmDrawerContext: ConfirmDrawerContext | null

  isClassInfoOpen: boolean
  classInfoContext: ClassInfoContext | null

  isQuizActive: boolean
  quizContext: QuizContext | null

  isQuizConfirmOpen: boolean
  quizConfirmContext: QuizConfirmContext | null

  actions: {
    openShopDrawer: (context: ShopDrawerContext) => void
    closeShopDrawer: () => void
    openConfirmDrawer: (context: ConfirmDrawerContext) => void
    closeConfirmDrawer: () => void
    openClassInfo: (context: ClassInfoContext) => void
    closeClassInfo: () => void
    openQuiz: (context: QuizContext) => void
    closeQuiz: () => void
    openQuizConfirm: (context: QuizConfirmContext) => void
    closeQuizConfirm: () => void
  }
}

export const useUIStore = create<UIStore>((set) => ({
  isShopDrawerOpen: false,
  shopDrawerContext: null,
  isConfirmDrawerOpen: false,
  confirmDrawerContext: null,
  isClassInfoOpen: false,
  classInfoContext: null,
  isQuizActive: false,
  quizContext: null,
  isQuizConfirmOpen: false,
  quizConfirmContext: null,

  actions: {
    openShopDrawer: (context) =>
      set({
        isShopDrawerOpen: true,
        shopDrawerContext: context,
      }),
    closeShopDrawer: () =>
      set({ isShopDrawerOpen: false, shopDrawerContext: null }),

    openConfirmDrawer: (context) =>
      set({
        isConfirmDrawerOpen: true,
        confirmDrawerContext: context,
      }),
    closeConfirmDrawer: () =>
      set({ isConfirmDrawerOpen: false, confirmDrawerContext: null }),

    openClassInfo: (context) =>
      set({ isClassInfoOpen: true, classInfoContext: context }),
    closeClassInfo: () =>
      set({ isClassInfoOpen: false, classInfoContext: null }),

    openQuiz: (context) => set({ isQuizActive: true, quizContext: context }),
    closeQuiz: () => set({ isQuizActive: false, quizContext: null }),

    openQuizConfirm: (context) =>
      set({ isQuizConfirmOpen: true, quizConfirmContext: context }),
    closeQuizConfirm: () =>
      set({ isQuizConfirmOpen: false, quizConfirmContext: null }),

    // closeAllDrawers: () =>
    //   set({
    //     isShopDrawerOpen: false,
    //     shopDrawerContext: null,
    //     isConfirmDrawerOpen: false,
    //     confirmDrawerContext: null,
    //   }),
  },
}))
