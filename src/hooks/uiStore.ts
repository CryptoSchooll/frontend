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
  classData: Class
  corridorId: string
}

export type UIStore = {
  isShopDrawerOpen: boolean
  shopDrawerContext: ShopDrawerContext | null

  isConfirmDrawerOpen: boolean
  confirmDrawerContext: ConfirmDrawerContext | null

  isClassInfoOpen: boolean
  classInfoContext: ClassInfoContext | null

  actions: {
    openShopDrawer: (context: ShopDrawerContext) => void
    closeShopDrawer: () => void
    openConfirmDrawer: (context: ConfirmDrawerContext) => void
    closeConfirmDrawer: () => void
    openClassInfo: (context: ClassInfoContext) => void
    closeClassInfo: () => void
  }
}

export const useUIStore = create<UIStore>((set) => ({
  isShopDrawerOpen: false,
  shopDrawerContext: null,
  isConfirmDrawerOpen: false,
  confirmDrawerContext: null,
  isClassInfoOpen: false,
  classInfoContext: null,

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

    // closeAllDrawers: () =>
    //   set({
    //     isShopDrawerOpen: false,
    //     shopDrawerContext: null,
    //     isConfirmDrawerOpen: false,
    //     confirmDrawerContext: null,
    //   }),
  },
}))
