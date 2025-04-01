import type { Task } from "@/hooks/types"
import type React from "react"

import { useCallback, useEffect, useMemo, useState } from "react"

import TaskConfirmDrawer from "./TaskConfirmDrawer"
import TaskItem from "./TaskItem"

import { useTaskStore } from "@/hooks/useTaskStore"

const TaskList: React.FC = () => {
  // Получение данных из store
  const { tasks, loading, error, completingTaskId } = useTaskStore()
  const { fetchTasks, completeTask } = useTaskStore((state) => state.actions)

  // Локальное состояние для управления TaskConfirmDrawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  // Получение задач при загрузке компонента
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Сортировка задач: незавершенные вверху, завершенные внизу
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((taskA, taskB) => {
      const isACompleted = taskA.status === "completed"
      const isBCompleted = taskB.status === "completed"

      if (isACompleted && !isBCompleted) return 1 // A выполнен, B нет → A ниже
      if (!isACompleted && isBCompleted) return -1 // A не выполнен, B выполнен → A выше
      return 0 // Порядок не меняется
    })
  }, [tasks])

  // Обработка клика по задаче для открытия drawer
  const handleTaskClick = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId)

      if (!task) {
        console.warn(`Task ${taskId} not found.`)
        return
      }

      if (task.isAvailable && task.status !== "completed") {
        setSelectedTask(task)
        setIsDrawerOpen(true)
      } else {
        console.warn(`Task ${taskId} unavailable or already completed.`)
      }
    },
    [tasks],
  )

  // Обработка запроса на получение награды
  const handleClaimReward = useCallback(
    async (taskId: string) => {
      // Проверки перед отправкой запроса
      if (!selectedTask) {
        console.warn("No task selected.")
        return
      }

      if (selectedTask.id !== taskId) {
        console.warn(
          `Task ID mismatch: selected=${selectedTask.id}, claiming=${taskId}.`,
        )
        return
      }

      console.log(`Completing task: ${taskId}`)

      try {
        const result = await completeTask(taskId)

        if (result?.success) {
          console.log(`Task completed! Reward: ${result.reward}`)
          setIsDrawerOpen(false)
        } else {
          console.error(
            `Failed to complete task: ${result?.message || "Unknown error"}`,
          )
        }
      } catch (err) {
        console.error("Error completing task:", err)
      }
    },
    [completeTask, selectedTask],
  )

  // Отображение состояний загрузки и ошибок
  if (loading && tasks.length === 0) {
    return <div className="p-4 text-center">Загрузка задач...</div>
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Ошибка: {error}</div>
  }

  if (tasks.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">Нет доступных задач.</div>
    )
  }

  // Основной UI компонента
  return (
    <div className="mx-auto w-full max-w-sm">
      {/* Список задач */}
      <div className="flex flex-col space-y-3">
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} {...task} onClick={handleTaskClick} />
        ))}
      </div>

      {/* Индикатор обновления списка задач */}
      {loading && tasks.length > 0 && (
        <div className="p-2 text-center text-sm text-gray-400">
          Обновление...
        </div>
      )}

      {/* Диалог подтверждения выполнения задачи */}
      <TaskConfirmDrawer
        isLoading={Boolean(
          completingTaskId && completingTaskId === selectedTask?.id,
        )}
        isOpen={isDrawerOpen}
        task={selectedTask}
        onClaim={handleClaimReward}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  )
}

export default TaskList
