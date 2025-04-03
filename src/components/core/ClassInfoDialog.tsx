import type { UIStore } from "@/hooks/uiStore"

import { motion } from "framer-motion"
import { DollarSign, Trash2 } from "lucide-react"

import { Dialog, DialogContent } from "../ui/Dialog"

import useBalanceStore from "@/hooks/balanceStore"
import { useGameStore } from "@/hooks/gameStore"

// Иконки для классов
const CLASS_ICONS: Record<string, string> = {
  Математика: "/images/classes/math.svg",
  Физика: "/images/classes/physics.svg",
  Химия: "/images/classes/chemistry.svg",
  Биология: "/images/classes/biology.svg",
  История: "/images/classes/history.svg",
  Информатика: "/images/classes/cs.svg",
  Литература: "/images/classes/literature.svg",
  Английский: "/images/classes/english.svg",
}

// Фолбэк иконка если нет соответствия
const DEFAULT_ICON = "/images/classes/default.svg"

// Описания классов
function getClassDescription(className: string): string {
  const descriptions: Record<string, string> = {
    Математика:
      "Развивает логическое мышление и аналитические способности. Высокая доходность при правильном подходе.",
    Физика:
      "Изучение законов природы и материального мира. Средняя сложность для большинства студентов.",
    Химия: "Наука о веществах, их составе, строении, свойствах и превращениях.",
    Биология:
      "Изучение живых организмов и их взаимодействий с окружающей средой.",
    История:
      "Исследование прошлого человечества через события, даты и исторические процессы.",
    Информатика:
      "Изучение компьютерных технологий, программирования и обработки информации.",
    Литература: "Знакомство с художественными произведениями и их анализ.",
    Английский:
      "Изучение международного языка общения, необходимого в современном мире.",
  }

  return (
    descriptions[className] ||
    "Образовательная дисциплина для развития интеллектуальных способностей."
  )
}

const ClassInfoDialog = ({
  classInfoContext,
  closeClassInfo,
  isClassInfoOpen,
}: {
  classInfoContext: UIStore["classInfoContext"]
  closeClassInfo: UIStore["actions"]["closeClassInfo"]
  isClassInfoOpen: UIStore["isClassInfoOpen"]
}) => {
  const { removeClass } = useGameStore((state) => state.actions)
  const { substractIncome } = useBalanceStore((state) => state.actions)

  // Функция удаления класса
  const handleDeleteClass = () => {
    if (!classInfoContext) return

    removeClass(
      classInfoContext.corridorId,
      classInfoContext.classData.position,
    )
    substractIncome(classInfoContext.classData.income)
    closeClassInfo()
  }

  // Получение иконки класса
  const getIconPath = () => {
    if (!classInfoContext) return DEFAULT_ICON
    return CLASS_ICONS[classInfoContext.classData.name] || DEFAULT_ICON
  }

  return (
    <Dialog
      open={isClassInfoOpen}
      onOpenChange={(open) => !open && closeClassInfo()}
    >
      <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-indigo-950 p-0">
        {classInfoContext ? (
          <>
            {/* Верхняя часть с фоновым градиентом */}
            <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-r from-indigo-700 to-violet-800 px-6 py-8">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/20 blur-xl"></div>
              <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full bg-indigo-500/20 blur-xl"></div>

              <div className="relative flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <img
                    alt={classInfoContext.classData.name}
                    className="h-14 w-14"
                    src={getIconPath()}
                  />
                </div>
              </div>

              <h2 className="mt-4 text-center text-2xl font-bold text-white">
                {classInfoContext.classData.name}
              </h2>
            </div>

            {/* Основное содержимое */}
            <div className="p-6">
              <div className="rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm">
                <h3 className="text-center font-medium text-white">
                  О предмете
                </h3>
                <p className="mt-3 text-center text-sm text-gray-300">
                  {getClassDescription(classInfoContext.classData.name)}
                </p>
              </div>

              {/* Информация о доходности */}
              <div className="mt-5 rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-400" />
                  <span className="text-lg font-medium text-gray-200">
                    Доход предмета
                  </span>
                </div>
                <p className="mt-2 text-center text-2xl font-bold text-green-400">
                  {classInfoContext.classData.income}/сек
                </p>
              </div>

              {/* Кнопка удаления класса */}
              <motion.button
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-red-800/50 bg-red-900/20 py-3 text-sm font-medium text-red-300 transition-colors hover:bg-red-900/40 hover:text-red-200"
                onClick={handleDeleteClass}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 className="h-4 w-4" />
                <span>Удалить кабинет</span>
              </motion.button>
            </div>
          </>
        ) : (
          // Плейсхолдер если контекст не загружен
          <div className="flex flex-col items-center justify-center p-8">
            <div className="h-20 w-20 rounded-full bg-gray-800/80"></div>
            <div className="mt-4 h-6 w-40 rounded bg-gray-800/80"></div>
            <div className="mt-6 h-24 w-full rounded-lg bg-gray-800/30"></div>
            <div className="mt-4 h-20 w-full rounded-lg bg-gray-800/30"></div>
            <div className="mt-6 h-12 w-full rounded-lg bg-gray-800/30"></div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ClassInfoDialog
