import { create } from "zustand"

type ShopDrawerContext = {
  corridorId: string
  position: Position
}

type ConfirmDrawerContext = {
  corridorId: string
  direction: Direction
  side: Side
}

type DrawerStore = {
  isShopDrawerOpen: boolean
  shopDrawerContext: ShopDrawerContext | null

  isConfirmDrawerOpen: boolean
  confirmDrawerContext: ConfirmDrawerContext | null

  actions: {
    openShopDrawer: (context: ShopDrawerContext) => void
    closeShopDrawer: () => void
    openConfirmDrawer: (context: ConfirmDrawerContext) => void
    closeConfirmDrawer: () => void
  }
}

export const useDrawerStore = create<DrawerStore>((set) => ({
  isShopDrawerOpen: false,
  shopDrawerContext: null,
  isConfirmDrawerOpen: false,
  confirmDrawerContext: null,

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

    closeAllDrawers: () =>
      set({
        isShopDrawerOpen: false,
        shopDrawerContext: null,
        isConfirmDrawerOpen: false,
        confirmDrawerContext: null,
      }),
  },
}))
