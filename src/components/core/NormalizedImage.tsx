import type { FC } from "react"

/**
 * Компонент для нормализации изображений в изометрическом пространстве
 * Применяет обратную изометрическую трансформацию к изображению
 */
interface NormalizedImageProps {
  alt: string
  className?: string
  rotate?: number // 2D поворот после нормализации
  scale?: number // 2D масштаб после нормализации
  src: string
  // Добавляем style для прямого управления позицией и размером
  style?: React.CSSProperties
}

const NormalizedImage: FC<NormalizedImageProps> = ({
  alt,
  className = "",
  rotate = 0,
  scale = 1, // Масштаб по умолчанию 1
  src,
  style, // Принимаем style извне
}) => {
  // Трансформация в AxonometricView: rotateX(30deg) rotateZ(-45deg)
  // Точная обратная трансформация (порядок и знаки инвертированы):
  const inverseIsometricTransform = "rotateZ(45deg) rotateX(-30deg)"

  // Комбинируем обратную изометрическую трансформацию с желаемым 2D масштабом и поворотом
  const finalTransform = `${inverseIsometricTransform} scale(${scale}) ${rotate ? `rotate(${rotate}deg)` : ""}`.trim()

  return (
    <div
      className="absolute inset-0"
      style={{
        transformStyle: "preserve-3d", // Сохраняем 3D для применения обратной трансформации
        transformOrigin: "center center",
        transform: finalTransform,
      }}
    >
      <img
        alt={alt}
        className={`h-full w-full object-contain ${className}`}
        src={src}
        style={{
          transformStyle: "flat", // Само изображение делаем плоским
          transformOrigin: "center center",
          // Применяем внешние стили (для top, left, width, height)
          ...style,
        }}
      />
    </div>
  )
}

export default NormalizedImage 