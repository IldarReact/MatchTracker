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

  // Check viewport width on mount and when window resizes
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    // Initial check
    checkViewport();

    // Add resize listener
    window.addEventListener("resize", checkViewport);

    // Cleanup
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Mobile version uses transition animation, desktop version doesn't
  const expandedContentClass = isMobile
    ? `overflow-hidden transition-all duration-300 ${
        isExpanded ? "max-h-[1000px]" : "max-h-0"
      }`
    : "";

  return (
    <div className="bg-[var(--foreground)] rounded-lg overflow-hidden">
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

      {/* Mobile expanded content with animation */}
      {isMobile ? (
        <div className={expandedContentClass}>
          <div className="p-4 bg-[#141414]">
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
        /* Desktop expanded content without animation */
        isExpanded && (
          <div className="p-4 bg-[var(--foreground)]">
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
        )
      )}

      {/* Mobile-only bottom chevron */}
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
