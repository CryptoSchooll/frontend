import ClassInfoDialog from "./core/ClassInfoDialog"
import ClassShopDrawer from "./core/ClassShopDrawer"
import CorridorConfirmDrawer from "./core/CorridorConfirmDrawer"
import QuizBoxDialog from "./Quiz/QuizBoxDialog"
import QuizConfirmDialog from "./Quiz/QuizConfirmDialog"

import { useUIStore } from "@/hooks/uiStore"

export function GlobalUI() {
  const {
    isShopDrawerOpen,
    shopDrawerContext,
    isConfirmDrawerOpen,
    confirmDrawerContext,
    isClassInfoOpen,
    classInfoContext,
    isQuizActive,
    quizContext,
    isQuizConfirmOpen,
    quizConfirmContext,
  } = useUIStore()
  const {
    closeShopDrawer,
    closeConfirmDrawer,
    closeClassInfo,
    closeQuiz,
    closeQuizConfirm,
  } = useUIStore((state) => state.actions)
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

      {/* Компоненты викторин */}
      <QuizConfirmDialog
        closeQuizConfirm={closeQuizConfirm}
        isQuizConfirmOpen={isQuizConfirmOpen}
        quizConfirmContext={quizConfirmContext}
      />

      <QuizBoxDialog
        closeQuiz={closeQuiz}
        isQuizActive={isQuizActive}
        quizContext={quizContext}
      />
    </>
  )
}
