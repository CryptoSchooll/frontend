import type { UIStore } from "@/hooks/uiStore"

import { DollarSign, Star } from "lucide-react"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer"
import { CLASSES } from "@/constants"
import useBalanceStore from "@/hooks/balanceStore"
import { useGameStore } from "@/hooks/gameStore"
import { cn } from "@/lib/utils"

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

const ClassShopDrawer = ({
  shopDrawerContext,
  closeShopDrawer,
  isShopDrawerOpen,
}: {
  shopDrawerContext: UIStore["shopDrawerContext"]
  closeShopDrawer: UIStore["actions"]["closeShopDrawer"]
  isShopDrawerOpen: UIStore["isShopDrawerOpen"]
}) => {
  const { appendClass } = useGameStore((state) => state.actions)
  const { balance, actions } = useBalanceStore()

  const handleSelectClass = (classData: Omit<Class, "id" | "position">) => {
    if (!shopDrawerContext) return

    if (!actions.canAfford(classData.cost)) {
      console.warn("Cant afford that")
      return
    }

    const newClass: Class = {
      ...classData,
      id: crypto.randomUUID(),
      position: shopDrawerContext.position,
    }
    appendClass(shopDrawerContext.corridorId, newClass)
    actions.substractBalance(classData.cost)
    actions.addIncome(classData.income)
    closeShopDrawer()
  }

  return (
    <Drawer
      open={isShopDrawerOpen}
      onOpenChange={(open) => !open && closeShopDrawer()}
    >
      <DrawerContent className="max-h-[70vh] pb-5 text-white">
        {shopDrawerContext && (
          <>
            <DrawerHeader className="mt-2 p-0 text-white">
              <div className="flex items-center justify-between px-6">
                <DrawerTitle className="text-2xl font-bold">
                  Магазин классов
                </DrawerTitle>
                <div className="flex items-center space-x-1 rounded-full bg-gradient-to-r from-purple-900/60 to-indigo-900/60 px-3 py-1.5">
                  <DollarSign className="mr-1 h-4 w-4 text-green-400" />
                  <span className="font-medium text-green-300">{balance}</span>
                </div>
              </div>
              <DrawerDescription className="px-6 text-gray-400">
                Выберите класс для установки в слот {shopDrawerContext.position}
              </DrawerDescription>
            </DrawerHeader>

            {/* Список классов с вертикальной прокруткой */}
            <div className="scrollbar-none mt-4 space-y-4 overflow-y-auto px-6 pb-2">
              {CLASSES.map((classData, i) => {
                const canAfford = classData.cost <= balance
                const classIcon = CLASS_ICONS[classData.name] || DEFAULT_ICON

                return (
                  <div
                    key={i}
                    className={cn(
                      "relative overflow-hidden rounded-lg border bg-gradient-to-br p-5 transition-all",
                      canAfford
                        ? "cursor-pointer border-purple-700/50 from-gray-900 to-purple-950/40 hover:border-purple-600/70 hover:shadow-md hover:shadow-purple-900/20"
                        : "border-gray-700/30 from-gray-900 to-gray-900/40 opacity-60",
                    )}
                    onClick={() => canAfford && handleSelectClass(classData)}
                  >
                    {/* Декоративный фоновый элемент */}
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-600/10 blur-2xl"></div>

                    <div className="mb-5 flex">
                      {/* Изображение класса */}
                      <div className="mr-4 h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-3">
                        <img
                          alt={classData.name}
                          className="h-full w-full object-contain"
                          src={classIcon}
                          onError={(e) => {
                            e.currentTarget.src = DEFAULT_ICON
                          }}
                        />
                      </div>

                      <div className="flex flex-col justify-between">
                        <h3 className="mb-2 text-xl font-bold text-white">
                          {classData.name}
                        </h3>

                        {/* Плашки цены и доходности */}
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center rounded-full bg-green-900/30 px-3 py-1 text-sm font-medium text-green-400">
                            <DollarSign className="mr-1.5 h-4 w-4" />
                            <span>Цена: {classData.cost}</span>
                          </div>
                          <div className="flex items-center rounded-full bg-yellow-900/30 px-3 py-1 text-sm font-medium text-yellow-400">
                            <Star className="mr-1.5 h-4 w-4" />
                            <span>Доход: +{classData.income}/сек</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!canAfford && (
                      <div className="mb-3 rounded-full bg-red-900/20 px-3 py-1.5 text-center text-sm font-medium text-red-400">
                        Недостаточно средств
                      </div>
                    )}

                    <div className="space-y-3 text-sm">
                      <div className="text-gray-400">
                        <p className="text-sm">
                          {getClassDescription(classData.name)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        className={cn(
                          "rounded-lg px-5 py-2 text-sm font-medium transition-colors",
                          canAfford
                            ? "bg-gradient-to-r from-purple-700 to-indigo-700 text-white hover:from-purple-600 hover:to-indigo-600"
                            : "bg-gray-800 text-gray-500",
                        )}
                        disabled={!canAfford}
                      >
                        {canAfford ? "Установить" : "Недоступно"}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <DrawerFooter className="mt-4">
              <DrawerClose asChild>
                <button className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-700 hover:text-gray-300">
                  Отмена
                </button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}

// Функция для генерации описания класса
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

export default ClassShopDrawer
