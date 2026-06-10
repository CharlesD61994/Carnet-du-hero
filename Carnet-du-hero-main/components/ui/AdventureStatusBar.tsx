import type { Adventure, Stat } from "@/lib/types";

const preferredStatNames = ["Endurance", "Vie", "Vitalité", "Habileté", "Combat", "Force", "Chance", "Destin"];

function orderedDefaultStats(adventure: Adventure) {
  const picked: Stat[] = [];

  for (const name of preferredStatNames) {
    const found = adventure.stats.find(
      (stat) =>
        !picked.some((item) => item.id === stat.id) &&
        stat.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (found) picked.push(found);
    if (picked.length >= 3) break;
  }

  for (const stat of adventure.stats) {
    if (picked.length >= 3) break;
    if (!picked.some((item) => item.id === stat.id)) picked.push(stat);
  }

  return picked;
}

function StatPill({ stat }: { stat: Stat }) {
  return (
    <div className="gold-frame min-w-[6.75rem] shrink-0 rounded-2xl bg-panel/85 px-3 py-2 shadow-card">
      <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
        <span className="text-[1.35rem] leading-none">{stat.icon}</span>
        <span className="text-[1.15rem] font-black leading-none text-parchment">
          {stat.current}
          {stat.max !== undefined ? `/${stat.max}` : ""}
        </span>
      </div>
      <p className="mt-1 truncate text-center font-serif text-[0.62rem] uppercase tracking-[.10em] text-gold2">
        {stat.name}
      </p>
    </div>
  );
}

export function AdventureStatusBar({
  adventure,
  onHeroClick,
}: {
  adventure: Adventure;
  onHeroClick: () => void;
}) {
  const chosenStats =
    adventure.heroBarStatIds && adventure.heroBarStatIds.length > 0
      ? adventure.heroBarStatIds
          .map((id) => adventure.stats.find((stat) => stat.id === id))
          .filter((stat): stat is Stat => Boolean(stat))
      : orderedDefaultStats(adventure);

  return (
    <div className="border-b border-line/70 bg-night/95 px-3 py-2 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <button
          onClick={onHeroClick}
          className="gold-frame grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-panel/85 text-[1.85rem] shadow-card active:scale-[0.98]"
          aria-label="Ouvrir la fiche du héros"
        >
          {adventure.hero.portrait}
        </button>

        <div className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto overscroll-x-contain pb-1">
          {chosenStats.map((stat) => (
            <StatPill key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
}
