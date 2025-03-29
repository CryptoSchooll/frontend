import ClassShopDrawer from "./core/ClassShopDrawer"
import CorridorConfirmDrawer from "./core/CorridorConfirmDrawer"

import { useDrawerStore } from "@/hooks/drawerStore"

export function GlobalDrawers() {
  const {
    isShopDrawerOpen,
    shopDrawerContext,
    isConfirmDrawerOpen,
    confirmDrawerContext,
  } = useDrawerStore()
  const { closeShopDrawer, closeConfirmDrawer } = useDrawerStore(
    (state) => state.actions,
  )
  return (
    <>
      <ClassShopDrawer
        closeShopDrawer={closeShopDrawer}
        isShopDrawerOpen={isShopDrawerOpen}
        shopDrawerContext={shopDrawerContext}
      />

      <CorridorConfirmDrawer
        closeConfirmDrawer={closeConfirmDrawer}
        confirmDrawerContext={confirmDrawerContext}
        isConfirmDrawerOpen={isConfirmDrawerOpen}
      />
    </>
  )
}
