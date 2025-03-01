"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Match } from "@/lib/types";
import TeamLogo from "./team-logo";
import StatusBadge from "./status-badge";
import PlayerStats from "./player-stats";
import TeamStats from "./team-stats";

interface MatchCardProps {
  match: Match;
  statusLabel: string;
}

export default function MatchCard({ match, statusLabel }: MatchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Проверяем ширину экрана при загрузке и при изменении размера окна
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    checkViewport();

    window.addEventListener("resize", checkViewport);

    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Анимация для обеих версий - мобильной и десктопной
  const expandedContentClass = `overflow-hidden transition-all duration-300 ${
    isExpanded ? "max-h-[1000px]" : "max-h-0"
  }`;

  return (
    <div className="bg-[var(--foreground)] hover:bg-[#0B0F13] rounded-lg overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          <TeamLogo />
          <span className="ml-2 text-sm">{match.homeTeam.name}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-1">
            {match.homeScore} : {match.awayScore}
          </div>
          <StatusBadge status={match.status} label={statusLabel} />
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-sm">{match.awayTeam.name}</span>
          <TeamLogo />
          {!isMobile &&
            (isExpanded ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            ))}
        </div>
      </div>

      {/* Раскрывающийся контент для мобильных */}
      {isMobile ? (
        <div className={expandedContentClass}>
          <div className="p-4 ">
            <div className="space-y-4">
              <div className="space-y-3">
                {match.homeTeam.players.map((player, index) => (
                  <PlayerStats key={index} player={player} />
                ))}
              </div>
              <TeamStats
                points={match.homeTeam.points}
                place={match.homeTeam.place}
                totalKills={match.homeTeam.total_kills}
              />

              <div className="text-center text-gray-400 text-sm py-2">VS</div>

              <div className="space-y-3">
                {match.awayTeam.players.map((player, index) => (
                  <PlayerStats key={index} player={player} />
                ))}
              </div>
              <TeamStats
                points={match.awayTeam.points}
                place={match.awayTeam.place}
                totalKills={match.awayTeam.total_kills}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Раскрывающийся контент для десктопа */
        <div className={expandedContentClass}>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="flex gap-6">
                  {match.homeTeam.players.map((player, index) => (
                    <PlayerStats key={index} player={player} />
                  ))}
                </div>
                <TeamStats
                  points={match.homeTeam.points}
                  place={match.homeTeam.place}
                  totalKills={match.homeTeam.total_kills}
                />
              </div>
              <div>
                <div className="flex gap-6">
                  {match.awayTeam.players.map((player, index) => (
                    <PlayerStats key={index} player={player} />
                  ))}
                </div>
                <TeamStats
                  points={match.awayTeam.points}
                  place={match.awayTeam.place}
                  totalKills={match.awayTeam.total_kills}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Нижняя стрелка только для мобильных */}
      {isMobile && (
        <div
          className="flex justify-center p-2 cursor-pointer"
          onClick={toggleExpand}
        >
          {isExpanded ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6" />
          )}
        </div>
      )}
    </div>
  );
}