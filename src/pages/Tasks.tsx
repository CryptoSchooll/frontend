import type { FC } from "react";
import TaskList from "../components/Tasks/TaskList"; // <-- Измените путь, если TaskList лежит в другой папке

/**
 * Компонент страницы для отображения списка задач.
 */
const Tasks: FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-b from-[#0d0d1a] via-[#121218] to-[#1a0c2e] p-2 text-white">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 right-0 h-64 w-64 rounded-full bg-purple-700/10 blur-3xl"></div>
        <div className="absolute -left-10 bottom-20 h-72 w-72 rounded-full bg-blue-700/10 blur-3xl"></div>
      </div>
      
      {/* Заголовок и описание */}
      <div className="relative mb-4 text-center">
        <h1 className="text-2xl font-bold text-white">Ежедневные задания</h1>
        <p className="mt-1 text-sm text-purple-300">Выполняйте задания и получайте награды</p>
      </div>
      
      {/* Статистика - адаптирован для мобильного вида */}
      <div className="relative mb-4 grid grid-cols-3 gap-2 rounded-xl bg-white/5 p-3 backdrop-blur-sm">
        <div className="text-center">
          <p className="text-xs text-purple-300">Выполнено</p>
          <p className="text-xl font-bold text-white">2/5</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-purple-300">Токены</p>
          <p className="text-xl font-bold text-white">150</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-purple-300">До сброса</p>
          <p className="text-lg font-medium text-white">12:00</p>
        </div>
      </div>
      
      {/* Список заданий */}
      <div className="relative flex-1 overflow-y-auto pb-16">
        <TaskList />
      </div>
    </div>
  );
};

export default Tasks;