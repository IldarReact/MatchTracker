import Image from "next/image";
import type { Player } from "@/lib/types";
import { useEffect, useState } from "react";

interface PlayerStatsProps {
  player: Player;
}

export default function PlayerStats({ player }: PlayerStatsProps) {
  // Отслеживаем категории размеров экрана (только маленький и большой сейчас)
  const [screenSize, setScreenSize] = useState<"small" | "large">("large");

  // Проверяем размер экрана и обновляем состояние
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 1500) {
        setScreenSize("small");
      } else {
        setScreenSize("large");
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Устанавливаем компоновку в зависимости от размера экрана
  const containerLayout =
    screenSize === "small"
      ? "flex-col items-center"
      : "items-center justify-between";

  const playerInfoLayout =
    screenSize === "small"
      ? "flex justify-center mb-2"
      : "flex-none 2xl:flex items-center";

  const killsInfoLayout =
    screenSize === "small" ? "justify-center" : "items-center";

  return (
    <div
      className={`flex ${containerLayout} bg-[var(--content)] w-full px-3 py-2 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80`}
    >
      <div className={playerInfoLayout}>
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#2A2A2A] rounded-full flex items-center justify-center overflow-hidden mr-1">
          <Image
            src="/avatar_global.png"
            alt={player.username}
            width={36}
            height={36}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <span className="text-sm whitespace-nowrap">{player.username}</span>
      </div>

      <div className={`flex ${killsInfoLayout} text-sm`}>
        <span className="text-gray-400">Убийств:</span>
        <span className="ml-1 text-white">{player.kills}</span>
      </div>
    </div>
  );
}