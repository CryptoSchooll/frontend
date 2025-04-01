import type { FC } from "react"
import { CheckCircle, Crown, Lock, TrendingUp } from "lucide-react"

interface QuizItemProps {
  id: string
  title: string
  tasksCount: number
  isAvailable: boolean
  solved: boolean
  correctAnswers: number
}

const QuizItem: FC<QuizItemProps> = ({
  id,
  title,
  tasksCount,
  isAvailable,
  solved,
  correctAnswers,
}) => {
  // Визуальные флаги
  const isLocked = !isAvailable
  const isCompleted = solved

  // Определяем стили контейнера в зависимости от состояния
  const getContainerStyles = () => {
    if (isCompleted) {
      return "border-green-500/30 bg-gradient-to-br from-black/30 to-green-900/20"
    }
    if (isLocked) {
      return "border-gray-600/30 bg-gradient-to-br from-black/40 to-gray-800/10"
    }
    return "border-purple-500/30 bg-gradient-to-br from-black/20 to-purple-900/20 hover:border-purple-400/50 hover:from-black/30 hover:to-purple-800/30 active:scale-[0.98]"
  }

  // Определяем иконку статуса
  const StatusIcon = () => {
    if (isCompleted) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
    if (isLocked) {
      return <Lock className="h-5 w-5 text-yellow-500" />
    }
    return <Crown className="h-5 w-5 text-purple-400" />
  }

  // Отображаем полосу прогресса для завершенных викторин
  const ProgressBar = () => {
    if (!isCompleted) return null
    
    const percent = (correctAnswers / tasksCount) * 100
    
    return (
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-black/30">
        <div 
          className="h-full rounded-full bg-green-500" 
          style={{ width: `${percent}%` }}
        />
      </div>
    )
  }

  return (
    <div className={`
      mb-2 rounded-lg border p-3 shadow-lg backdrop-blur-sm
      ${getContainerStyles()}
      transition-all duration-200
    `}>
      <div className="flex items-center justify-between">
        {/* Левая часть - иконка и название */}
        <div className="flex items-center space-x-3 min-w-0">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-black/40 backdrop-blur-sm">
            <StatusIcon />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white">
              {title || `Викторина ${id}`}
            </div>
            <div className="text-xs text-purple-300">
              {isCompleted ? (
                <span>Ответов: {correctAnswers}/{tasksCount}</span>
              ) : isLocked ? (
                <span>Заблокировано</span>
              ) : (
                <span>Вопросов: {tasksCount}</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Правая часть - статус или стрелка */}
        <div className="ml-2 flex-shrink-0">
          {!isLocked && !isCompleted && (
            <TrendingUp className="h-5 w-5 text-purple-400" />
          )}
          {isCompleted && (
            <div className="rounded-full bg-green-900/20 px-2 py-0.5 text-2xs font-medium text-green-400">
              Пройдено
            </div>
          )}
        </div>
      </div>
      
      {/* Полоса прогресса */}
      <ProgressBar />
    </div>
  )
}

export default QuizItem
