import type { FC } from "react"

/**
 * Компонент для нормализации изображений в изометрическом пространстве
 * Применяет обратную изометрическую трансформацию к изображению
 */
interface NormalizedImageProps {
  alt: string
  className?: string
  rotate?: number // Только 2D поворот
  scale?: number // Только 2D масштаб
  src: string
  // Добавляем style для прямого управления позицией и размером
  style?: React.CSSProperties
}

const NormalizedImage: FC<NormalizedImageProps> = ({
  alt,
  className = "",
  rotate = 0,
  scale = 1,
  src,
  style, // Принимаем style извне
}) => {
  // Только 2D трансформации
  const transform = `scale(${scale}) ${rotate ? `rotate(${rotate}deg)` : ""}`.trim()

  return (
    <img
      alt={alt}
      // object-contain чтобы сохранить пропорции
      // absolute позиционирование будет управляться через style
      className={`absolute object-contain ${className}`}
      src={src}
      style={{
        transformOrigin: "center center",
        transform: transform || undefined,
        // Применяем внешние стили (для top, left, width, height)
        ...style,
      }}
    />
  )
}

export default NormalizedImage 