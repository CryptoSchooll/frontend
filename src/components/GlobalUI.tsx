import ClassInfoDialog from "./core/ClassInfoDialog"
import ClassShopDrawer from "./core/ClassShopDrawer"
import CorridorConfirmDrawer from "./core/CorridorConfirmDrawer"

import { useUIStore } from "@/hooks/uiStore"

export function GlobalUI() {
  const {
    isShopDrawerOpen,
    shopDrawerContext,
    isConfirmDrawerOpen,
    confirmDrawerContext,
    isClassInfoOpen,
    classInfoContext,
  } = useUIStore()
  const { closeShopDrawer, closeConfirmDrawer, closeClassInfo } = useUIStore(
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

      <ClassInfoDialog
        classInfoContext={classInfoContext}
        closeClassInfo={closeClassInfo}
        isClassInfoOpen={isClassInfoOpen}
      />
    </>
  )
}
