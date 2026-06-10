import { Dice5, X } from "lucide-react";
import { useState } from "react";
import type { Adventure, DiceRoll } from "@/lib/types";
import { uid } from "@/lib/templates";

function rollDie(sides: number) {
  return Math.floor(Math.random() * sides) + 1;
}

export function DiceSheet({
  adventure,
  context,
  sourceParagraph,
  onClose,
  onRoll,
}: {
  adventure: Adventure;
  context?: string;
  sourceParagraph?: number;
  onClose: () => void;
  onRoll: (roll: DiceRoll) => void;
}) {
  const config = adventure.diceConfig ?? { sides: 6, mode: "single", count: 1 };
  const [count, setCount] = useState(Math.max(1, config.count ?? 1));
  const [result, setResult] = useState<number | null>(null);
  const [details, setDetails] = useState<number[]>([]);

  const label = `${count}d${config.sides}`;

  const roll = () => {
    const rolls = Array.from({ length: count }, () => rollDie(config.sides));
    const total = rolls.reduce((sum, value) => sum + value, 0);
    const entry: DiceRoll = {
      id: uid(),
      createdAt: new Date().toISOString(),
      sides: config.sides,
      count,
      rolls,
      total,
      context,
      sourceParagraph,
    };
    setResult(total);
    setDetails(rolls);
    onRoll(entry);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 p-3 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        className="gold-frame w-full max-w-md rounded-t-3xl bg-night p-4 shadow-2xl sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-line" />
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-serif text-xs uppercase tracking-[.18em] text-gold2">
              {context ? `§${sourceParagraph ?? ""} · Test lié` : "Dés de l’aventure"}
            </p>
            <h2 className="mt-1 flex items-center gap-2 font-serif text-2xl text-parchment">
              <Dice5 className="text-gold" size={22} /> {context || label}
            </h2>
            {context && <p className="mt-1 text-xs text-muted">Lancer : {label}</p>}
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl border border-line text-muted active:bg-gold/10"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-3 flex items-center justify-between rounded-2xl border border-line/70 bg-black/20 px-3 py-2">
          <div>
            <p className="font-serif text-xs uppercase tracking-wide text-gold2">
              Nombre de dés
            </p>
            <p className="text-xs text-muted">Dé configuré : d{config.sides}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCount((value) => Math.max(1, value - 1))}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-lg text-gold active:bg-gold/10"
            >
              −
            </button>
            <span className="w-8 text-center text-xl font-black text-gold2">{count}</span>
            <button
              onClick={() => setCount((value) => Math.min(12, value + 1))}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-lg text-gold active:bg-gold/10"
            >
              +
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3">
          <button
            onClick={roll}
            className="rounded-2xl border border-gold/50 bg-gold/15 px-4 py-4 font-serif text-lg text-gold2 active:scale-[.99]"
          >
            Lancer
          </button>
          <div className="grid min-w-24 place-items-center rounded-2xl border border-line bg-black/25 px-4 py-3">
            <span className="text-xs uppercase tracking-wide text-muted">Résultat</span>
            <span className="text-3xl font-black text-gold2">{result ?? "—"}</span>
          </div>
        </div>

        {details.length > 0 && (
          <p className="mt-3 rounded-xl border border-line/70 bg-black/20 px-3 py-2 text-center text-sm text-muted">
            Détails : {details.join(" + ")}
          </p>
        )}
      </section>
    </div>
  );
}
