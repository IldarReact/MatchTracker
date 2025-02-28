interface TeamStatsProps {
  points: number;
  place: number;
  totalKills: number;
}

export default function TeamStats({
  points,
  place,
  totalKills,
}: TeamStatsProps) {
  return (
    <div className="flex justify-between text-sm text-gray-400 bg-[var(--content)] px-4 sm:px-6 py-3 rounded-lg md:justify-around md:mt-2 transition-all duration-300 hover:bg-opacity-80">
      <div className="mb-2 sm:mb-0 sm:mr-4">
        <span>Points:</span>
        <span className="ml-1 text-[16px] font-bold">
          +{points}
        </span>
      </div>

      <div className="mb-2 sm:mb-0 sm:mr-4">
        <span>Место:</span>
        <span className="ml-1 text-[16px] font-bold text-white">{place}</span>
      </div>

      <div>
        <span>Всего убийств:</span>
        <span className="ml-1 text-[16px] font-bold text-white">
          {totalKills}
        </span>
      </div>
    </div>
  );
}
