import type { Task } from "@/hooks/types"
import type React from "react"

import { useCallback, useEffect, useMemo, useState } from "react" // Добавлен useMemo

import TaskConfirmDrawer from "./TaskConfirmDrawer"
import TaskItem from "./TaskItem"

import { useTaskStore } from "@/hooks/useTaskStore"

const TaskList: React.FC = () => {
  const { tasks, loading, error, fetchTasks, completeTask, completingTaskId } =
    useTaskStore()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // --- Сортировка задач: выполненные в конец ---
  const sortedTasks = useMemo(() => {
    // Создаем копию массива перед сортировкой, чтобы не мутировать состояние store
    return [...tasks].sort((taskA, taskB) => {
      const isACompleted = taskA.status === "completed"
      const isBCompleted = taskB.status === "completed"

      // Если A выполнен, а B нет, A должен идти после B
      if (isACompleted && !isBCompleted) {
        return 1
      }
      // Если B выполнен, а A нет, B должен идти после A (т.е. A раньше)
      if (!isACompleted && isBCompleted) {
        return -1
      }
      // Если оба выполнены или оба не выполнены, сохраняем их относительный порядок
      // (или можно добавить вторичную сортировку, например, по ID или типу)
      return 0
    })
  }, [tasks]) // Пересортировываем только если массив tasks изменился
  // ---------------------------------------------

  const handleTaskClick = useCallback(
    (taskId: string) => {
      // Используем исходный массив tasks для поиска, т.к. sortedTasks может еще не обновиться
      const task = tasks.find((t) => t.id === taskId)
      if (task && task.isAvailable && task.status !== "completed") {
        setSelectedTask(task)
        setIsDrawerOpen(true)
      } else {
        console.warn(
          `Task ${taskId} cannot be opened in drawer (unavailable or completed).`,
        )
      }
    },
    [tasks],
  ) // Зависимость от tasks

  const handleClaimReward = useCallback(
    async (taskId: string) => {
      if (!selectedTask || selectedTask.id !== taskId) return

      console.log(`Attempting to complete task via Drawer: ${taskId}`)
      try {
        const result = await completeTask(taskId)

        if (result?.success) {
          console.log(
            `Task ${taskId} completed successfully via Drawer! Reward: ${result.reward}`,
          )
          setIsDrawerOpen(false)
        } else {
          console.error(`Failed to complete task ${taskId} via Drawer.`)
        }
      } catch (err) {
        console.error(
          "Unexpected error during drawer task completion flow:",
          err,
        )
      }
    },
    [completeTask, selectedTask],
  )

  if (loading && tasks.length === 0) {
    return <div className="p-4 text-center">Loading tasks...</div>
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading tasks: {error}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No tasks available right now.
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="flex flex-col space-y-3">
        {/* --- Используем sortedTasks для рендеринга --- */}
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} {...task} onClick={handleTaskClick} />
        ))}
        {/* ------------------------------------------ */}
      </div>
      {loading && tasks.length > 0 && (
        <div className="p-2 text-center text-sm text-gray-400">Updating...</div>
      )}

      <TaskConfirmDrawer
        isLoading={!!completingTaskId && completingTaskId === selectedTask?.id}
        isOpen={isDrawerOpen}
        task={selectedTask}
        onClaim={handleClaimReward}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  )
}

export default TaskList
