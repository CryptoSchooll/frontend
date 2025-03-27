import type { FC } from "react";
import TaskList from "../components/Tasks/TaskList"; // <-- Измените путь, если TaskList лежит в другой папке

/**
 * Компонент страницы для отображения списка задач.
 */
const TasksPage: FC = () => {
  return (
    // Используем те же стили для основного контейнера страницы,
    // что и в Quizzes для консистентности.
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center bg-gray-50 p-4">
      {/* Заголовок страницы (опционально) */}
      <h1 className="text-2xl font-bold mb-6 text-zinc-800">Tasks</h1> {/* Пример заголовка */}

      {/* Рендерим компонент списка задач */}
      <TaskList />

      {/* Здесь можно добавить другие элементы страницы при необходимости */}
    </div>
  );
};

export default TasksPage;