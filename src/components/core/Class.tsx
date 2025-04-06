import { memo } from "react"

import ClassInfoTrigger from "./ClassInfoTrigger"
import ClassShopTrigger from "./ClassShopTrigger"
import NormalizedImage from "./NormalizedImage"

import { CLASS_POSITIONS } from "@/constants"

// Helper для безопасного извлечения числовых значений из CSS строк
// (Оставим на случай, если понадобится для более сложных расчетов)
/*
const parsePixelValue = (value: string | undefined): number => {
  if (!value) return 0
  return parseFloat(value.replace("px", "")) || 0
}
*/

const ClassMemo = ({
  classData,
  corridorId,
}: {
  classData: ClassLike
  corridorId: string
}) => {
  const posMeta = CLASS_POSITIONS[classData.position]

  if (classData.isClass) {
    return (
      <div
        className="absolute"
        style={{
          ...posMeta, // Используем исходные CSS top/left/bottom/right
          width: "84px", // Подбираем размер под картинку NormalizedImage
          height: "84px",
          transform: "translateZ(10px)", // Поднимаем немного над коридором
          marginTop: "-15px", // Смещение для визуального отдаления
          // Добавим смещение влево/вправо, если картинка позиционируется по right
          // Это значение нужно будет подбирать или рассчитывать точнее
          // marginLeft: posMeta.right ? '-42px' : undefined,
        }}
      >
        <ClassInfoTrigger classData={classData} corridorId={corridorId}>
          <div className="relative h-full w-full">
            <NormalizedImage
              alt="Classroom"
              rotate={0} // Без дополнительного поворота
              scale={1} // Масштаб 1:1
              src="/assets/classroom.png"
            />
            {/* Текст позиционируем поверх NormalizedImage */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <span className="whitespace-nowrap rounded bg-black/60 px-1.5 py-0.5 text-xs font-semibold text-white shadow-md">
                {classData.name}
              </span>
            </div>
          </div>
        </ClassInfoTrigger>
      </div>
    )
  }

  // Логика для ClassShopTrigger (плюсик)
  return (
    <div
      className="size-21 absolute flex items-center justify-center"
      style={{ ...posMeta }} // Используем исходные posMeta для плюсика
    >
      <ClassShopTrigger corridorId={corridorId} position={classData.position}>
        <div className="relative size-10 transition-transform hover:scale-110">
          <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 bg-amber-100 shadow-sm" />
          <div className="absolute left-1/2 h-full w-2 -translate-x-1/2 bg-amber-100 shadow-sm" />
        </div>
      </ClassShopTrigger>
    </div>
  )
}

const Class = memo(ClassMemo)
export default Class
