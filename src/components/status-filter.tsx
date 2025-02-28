"use client";

import { useState } from "react";
import type { MatchStatus } from "@/lib/types";

interface StatusFilterProps {
  currentStatus: MatchStatus | "ALL";
  onChange: (status: MatchStatus | "ALL") => void;
}

export default function StatusFilter({
  currentStatus,
  onChange,
}: StatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (status: MatchStatus | "ALL") => {
    onChange(status);
    setIsOpen(false);
  };

  const getStatusLabel = (status: MatchStatus | "ALL") => {
    switch (status) {
      case "ALL":
        return "Все статусы";
      case "Ongoing":
        return "Live";
      case "Finished":
        return "Finished";
      case "Scheduled":
        return "Match preparing";
      default:
        return "Неизвестный статус";
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      {/* Кнопка для открытия/закрытия dropdown */}
      <button
        onClick={toggleDropdown}
        className="w-full bg-[var(--content)] text-white px-4 py-2 rounded-lg flex items-center justify-between text-sm transition-colors"
      >
        <span>{getStatusLabel(currentStatus)}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Выпадающий список */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-[var(--content)] rounded-lg shadow-lg">
          <ul className="py-1 text-white">
            <li
              onClick={() => handleSelect("ALL")}
              className="px-4 py-2 text-sm hover:bg-[var(--content)] cursor-pointer transition-colors"
            >
              Все статусы
            </li>
            <li
              onClick={() => handleSelect("Ongoing")}
              className="px-4 py-2 text-sm hover:bg-[var(--content)] cursor-pointer transition-colors"
            >
              Live
            </li>
            <li
              onClick={() => handleSelect("Finished")}
              className="px-4 py-2 text-sm hover:bg-[var(--content)] cursor-pointer transition-colors"
            >
              Finished
            </li>
            <li
              onClick={() => handleSelect("Scheduled")}
              className="px-4 py-2 text-sm hover:bg-[var(--content)] cursor-pointer transition-colors"
            >
              Match preparing
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}