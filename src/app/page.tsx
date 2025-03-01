"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import type { Match, MatchStatus } from "@/lib/types";
import { fetchMatches } from "@/lib/api";
import StatusFilter from "@/components/status-filter";
import MatchCard from "@/components/match-card";
import ErrorMessage from "@/components/error-message";

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<MatchStatus | "ALL">("ALL");

  const loadMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMatches();
      setMatches(data.matches);
    } catch (err) {
      console.error(err);
      setError("Ошибка: не удалось загрузить информацию");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const filteredMatches =
    statusFilter === "ALL"
      ? matches
      : matches.filter((match) => match.status === statusFilter);

  const mapStatusToRussian = (status: MatchStatus) => {
    switch (status) {
      case "Ongoing":
        return "Live";
      case "Finished":
        return "Finished";
      case "Scheduled":
        return "Match preparing";
      default:
        return status;
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-white p-4 sm:p-6">
      <div className="w-full max-w-lg mx-auto sm:max-w-full">
        {/* Шапка */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Match Tracker</h1>
          <div className="flex items-center gap-4">
            {error && <ErrorMessage message={error} />}
            <button
              onClick={loadMatches}
              disabled={loading}
              className={`flex items-center justify-center px-4 py-2 rounded-md text-white transition-all duration-300 w-full sm:w-auto cursor-pointer ${
                loading ? "bg-[#EB0237]" : "bg-[#FF1744] hover:bg-[#701328]"
              }`}
            >
              Обновить
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-2 ${loading ? "animate-spin" : ""}`}
              >
                <path
                  d="M17.3583 4.17502C15.8416 2.34169 13.6583 1.16669 11.2499 1.00002C6.82492 0.658354 2.99992 4.07502 2.99992 8.33335H0.833252L4.16659 11.6667L7.49992 8.33335H5.33325C5.33325 5.30002 7.94992 2.83335 11.0833 3.00835C12.8333 3.10835 14.3749 4.00835 15.3749 5.34169C17.3166 7.85002 16.8749 11.4334 14.4166 13.3834C12.9999 14.5 11.1666 14.8334 9.41659 14.4167C8.28325 14.1417 7.28325 13.5584 6.49992 12.775L4.94992 14.325C6.04992 15.425 7.44992 16.2 9.03325 16.5834C10.1999 16.8584 11.3666 16.8584 12.5333 16.6C13.6999 16.3417 14.7833 15.8 15.7166 15.0334C18.9166 12.4334 19.4999 7.60002 17.3583 4.17502Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Фильтр */}
        <div className="mb-4 w-full sm:w-64">
          <StatusFilter
            currentStatus={statusFilter}
            onChange={setStatusFilter}
          />
        </div>

        {/* Список матчей */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#FF1744]" />
            </div>
          ) : (
            filteredMatches.map((match, index) => (
              <MatchCard
                key={index}
                match={match}
                statusLabel={mapStatusToRussian(match.status)}
              />
            ))
          )}

          {!loading && filteredMatches.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              Нет матчей для отображения
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
