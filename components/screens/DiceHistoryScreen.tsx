import type { Adventure } from "@/lib/types";
import { Header } from "@/components/ui/Header";
import { AdventureStatusBar } from "@/components/ui/AdventureStatusBar";
import { StickyHeaderGroup } from "@/components/ui/StickyHeaderGroup";
import { Panel } from "@/components/ui/Panel";

function formatDateTime(value: string) {
  try {
    return new Intl.DateTimeFormat("fr-CA", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function DiceHistoryScreen({
  adventure,
  onHeroClick,
  onLibrary,
  onOptions,
}: {
  adventure: Adventure;
  onHeroClick: () => void;
  onLibrary: () => void;
  onOptions: () => void;
}) {
  const history = adventure.diceHistory ?? [];

  return (
    <div>
      <StickyHeaderGroup>
        <Header title="Historique des dés" back={onLibrary} onOptions={onOptions} />
        <AdventureStatusBar adventure={adventure} onHeroClick={onHeroClick} />
      </StickyHeaderGroup>

      <div className="space-y-3 p-4">
        {history.length === 0 && (
          <Panel className="p-4 text-sm text-muted">
            Aucun lancer enregistré pour cette aventure.
          </Panel>
        )}

        {history.map((roll) => (
          <Panel key={roll.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-serif text-lg text-parchment">
                  {roll.context ? roll.context : `${roll.count}d${roll.sides}`} → <span className="text-gold2">{roll.total}</span>
                </p>
                <p className="mt-1 text-xs text-muted">
                  {roll.sourceParagraph ? `§${roll.sourceParagraph} · ` : ""}{formatDateTime(roll.createdAt)}
                </p>
              </div>
              <div className="rounded-xl border border-line bg-black/20 px-3 py-2 text-sm text-gold">
                🎲
              </div>
            </div>
            {roll.rolls.length > 0 && (
              <p className="mt-3 rounded-xl border border-line/70 bg-black/20 px-3 py-2 text-sm text-muted">
                Détails : {roll.count}d{roll.sides} · {roll.rolls.join(" + ")}
              </p>
            )}
          </Panel>
        ))}
      </div>
    </div>
  );
}
