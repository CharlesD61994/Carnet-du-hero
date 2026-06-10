import { Dice5 } from "lucide-react";
import { useState } from "react";
import type { Adventure } from "@/lib/types";
import { Header } from "@/components/ui/Header";
import { AdventureStatusBar } from "@/components/ui/AdventureStatusBar";
import { StickyHeaderGroup } from "@/components/ui/StickyHeaderGroup";
import { Panel } from "@/components/ui/Panel";

function rollDie(sides: number) {
  return Math.floor(Math.random() * sides) + 1;
}

export function DiceScreen({
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
  const [result, setResult] = useState<string>("—");
  const [history, setHistory] = useState<string[]>([]);

  const roll = (label: string, value: number) => {
    const next = `${label} : ${value}`;
    setResult(next);
    setHistory((items) => [next, ...items].slice(0, 12));
  };

  return (
    <div>
      <StickyHeaderGroup>
        <Header title="Dés" back={onLibrary} onOptions={onOptions} />
        <AdventureStatusBar adventure={adventure} onHeroClick={onHeroClick} />
      </StickyHeaderGroup>

      <div className="space-y-4 p-4">
        <Panel className="p-4 text-center">
          <p className="font-serif text-xs uppercase tracking-widest text-gold2">Résultat</p>
          <p className="mt-3 text-5xl font-black text-gold2">{result}</p>
        </Panel>

        <div className="grid grid-cols-2 gap-2">
          <DiceButton label="1d6" onClick={() => roll("1d6", rollDie(6))} />
          <DiceButton label="2d6" onClick={() => roll("2d6", rollDie(6) + rollDie(6))} />
          <DiceButton label="1d10" onClick={() => roll("1d10", rollDie(10))} />
          <DiceButton label="1d12" onClick={() => roll("1d12", rollDie(12))} />
          <DiceButton label="1d20" onClick={() => roll("1d20", rollDie(20))} />
          <DiceButton label="Table 0-9" onClick={() => roll("Table 0-9", Math.floor(Math.random() * 10))} />
        </div>

        <Panel className="p-4">
          <h2 className="mb-3 font-serif text-sm uppercase tracking-wide text-gold2">Historique</h2>
          {history.length === 0 ? (
            <p className="text-sm text-muted">Aucun lancer pour l’instant.</p>
          ) : (
            <div className="space-y-2 text-sm text-muted">
              {history.map((item, index) => (
                <p key={`${item}-${index}`}>{item}</p>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}

function DiceButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="gold-frame rounded-2xl bg-panel/85 p-4 text-center font-serif text-gold2 shadow-card active:scale-[0.98]"
    >
      <Dice5 className="mx-auto mb-2" />
      {label}
    </button>
  );
}
