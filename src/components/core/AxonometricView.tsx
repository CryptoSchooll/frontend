import type { FC, ReactNode } from "react"

/**
 * Компонент для создания аксонометрической изометрии
 * Применяет изометрическую трансформацию к дочерним элементам
 */
interface AxonometricViewProps {
  scale?: number
  children: ReactNode
}

const AxonometricView: FC<AxonometricViewProps> = ({
  children, scale = 1,
}) => {
  return (
    <div
      className="relative origin-center"
      style={{
        // Стандартные углы для изометрической проекции
        transform: `scale(${scale}) rotateX(30deg) rotateZ(-45deg)`,
        transformStyle: "preserve-3d",
        perspective: "1200px", // Оставляем перспективу для 3D-эффекта
      }}
    >
      {children}
    </div>
  )
}

export default AxonometricView 