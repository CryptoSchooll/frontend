import type { FC } from "react"

// Тип для данных пользователя в таблице лидеров
interface LeaderboardEntry {
  id: string
  position: number
  username: string
  score: number
  avatar: string
}

// Моковые данные для таблицы лидеров
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: "user-1",
    position: 1,
    username: "Александр",
    score: 9850,
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "user-2",
    position: 2,
    username: "Мария",
    score: 8730,
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "user-3",
    position: 3,
    username: "Дмитрий",
    score: 7600,
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "user-4",
    position: 4,
    username: "Елена",
    score: 6450,
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "user-5",
    position: 5,
    username: "Иван",
    score: 5320,
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "user-6",
    position: 6,
    username: "Анна",
    score: 4980,
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "user-7",
    position: 7,
    username: "Сергей",
    score: 4250,
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "user-8",
    position: 8,
    username: "Наталья",
    score: 3710,
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "user-9",
    position: 9,
    username: "Павел",
    score: 3100,
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "user-10",
    position: 10,
    username: "Татьяна",
    score: 2840,
    avatar: "https://via.placeholder.com/40",
  },
]

// Компонент для отображения одной строки в таблице лидеров
const LeaderboardRow: FC<{
  entry: LeaderboardEntry
  isCurrentUser: boolean
}> = ({ entry, isCurrentUser }) => (
  <div
    className={`mb-2 flex items-center justify-between rounded-lg p-3 ${
      isCurrentUser ? "bg-purple-900/50" : "bg-zinc-800/50"
    }`}
  >
    <div className="flex items-center space-x-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
        {entry.position}
      </div>
      <img
        alt={`${entry.username}'s avatar`}
        className="h-10 w-10 rounded-full border border-purple-400"
        src={entry.avatar}
      />
      <span className="font-medium text-white">{entry.username}</span>
    </div>
    <div className="font-bold text-purple-300">{entry.score}</div>
  </div>
)

const Leaderboard: FC = () => {
  // В реальном приложении эти данные могли бы загружаться с сервера
  const leaderboardData = MOCK_LEADERBOARD
  const currentUserId = "user-5" // Предполагаем, что это текущий пользователь

  return (
    <div className="flex flex-col p-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-white">
        Таблица лидеров
      </h1>

      {/* Top 3 */}
      <div className="mb-6 flex justify-center space-x-6">
        {/* 2-е место */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              alt={leaderboardData[1].username}
              className="h-16 w-16 rounded-full border-2 border-gray-300"
              src={leaderboardData[1].avatar}
            />
            <div className="absolute -bottom-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-800">
              2
            </div>
          </div>
          <p className="mt-2 text-sm font-medium text-white">
            {leaderboardData[1].username}
          </p>
          <p className="text-xs text-gray-400">{leaderboardData[1].score}</p>
        </div>

        {/* 1-е место */}
        <div className="-mt-4 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
              <svg
                className="h-8 w-8 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <img
              alt={leaderboardData[0].username}
              className="h-20 w-20 rounded-full border-2 border-yellow-400"
              src={leaderboardData[0].avatar}
            />
            <div className="absolute -bottom-2 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-gray-800">
              1
            </div>
          </div>
          <p className="mt-2 text-sm font-medium text-white">
            {leaderboardData[0].username}
          </p>
          <p className="text-xs text-yellow-400">{leaderboardData[0].score}</p>
        </div>

        {/* 3-е место */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              alt={leaderboardData[2].username}
              className="h-16 w-16 rounded-full border-2 border-amber-700"
              src={leaderboardData[2].avatar}
            />
            <div className="absolute -bottom-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">
              3
            </div>
          </div>
          <p className="mt-2 text-sm font-medium text-white">
            {leaderboardData[2].username}
          </p>
          <p className="text-xs text-amber-700">{leaderboardData[2].score}</p>
        </div>
      </div>

      {/* Полный список */}
      <div className="rounded-lg bg-black/30 p-4 backdrop-blur-md">
        <h2 className="mb-4 text-lg font-semibold text-white">Все участники</h2>
        <div className="max-h-80 overflow-y-auto pr-2">
          {leaderboardData.map((entry) => (
            <LeaderboardRow
              key={entry.id}
              entry={entry}
              isCurrentUser={entry.id === currentUserId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
