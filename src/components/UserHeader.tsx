import type { FC } from "react"

const UserHeader: FC = () => {
  return (
    // Убираем left-[33px] top-[19px] и делаем контейнер relative + mx-auto
    <div className="relative mx-auto h-16 w-80">
      {/* Аватар */}
      <div className="absolute left-0 top-[2px] h-12 w-12 rounded-full bg-zinc-300" />

      {/* Имя пользователя */}
      <div className="absolute left-[72px] top-[1px] font-['Inter'] text-sm font-normal text-black">
        Pavel Durov
      </div>

      {/* Полоса/фон (вероятно, под счёт) */}
      <div className="absolute left-[72px] top-[20px] h-7 w-60 bg-zinc-300" />

      {/* Очки (счёт) */}
      <div className="absolute left-[139px] top-[25px] w-24 text-center font-['Intro_Regular'] text-xl font-normal leading-snug text-black">
        4.345.356
      </div>

      {/* Круг для множителя */}
      <div className="absolute left-[287px] top-0 h-10 w-10 rounded-full bg-zinc-500" />
      <div className="absolute left-[295px] top-[11px] text-center font-['Intro_Regular'] text-sm font-normal leading-snug text-white">
        x1.3
      </div>

      {/* Скорость (например, +1.2K/min) */}
      <div className="absolute left-[72px] top-[49px] text-center font-['Intro_Book'] text-xs font-normal leading-snug text-black">
        +1.2K/min
      </div>
    </div>
  )
}

export default UserHeader
