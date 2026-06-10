import { Dice5, X } from "lucide-react";
import { useState } from "react";

function rollDie(sides: number) {
  return Math.floor(Math.random() * sides) + 1;
}

export function DiceFab() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<string>("—");
  const [history, setHistory] = useState<string[]>([]);

  const roll = (label: string, value: number) => {
    const next = `${label} : ${value}`;
    setResult(next);
    setHistory((items) => [next, ...items].slice(0, 6));
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-4 z-[60] grid h-14 w-14 place-items-center rounded-full border border-gold/60 bg-gold text-2xl text-night shadow-glow active:scale-95"
        aria-label="Ouvrir les dés"
      >
        🎲
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 px-4 pb-4 backdrop-blur-sm">
          <div className="gold-frame w-full max-w-md rounded-3xl bg-panel p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-serif text-sm uppercase tracking-[.18em] text-gold2">Dés rapides</p>
                <p className="text-xs text-muted">Toujours accessible pendant la partie.</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-line text-gold"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-4 rounded-2xl border border-line bg-black/25 p-4 text-center">
              <p className="text-xs uppercase tracking-widest text-muted">Résultat</p>
              <p className="mt-1 text-3xl font-black text-gold2">{result}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => roll("1d6", rollDie(6))} className="rounded-xl border border-line bg-panel2 p-3 font-serif text-gold2"><Dice5 className="mx-auto mb-1" />1d6</button>
              <button onClick={() => roll("1d10", rollDie(10))} className="rounded-xl border border-line bg-panel2 p-3 font-serif text-gold2"><Dice5 className="mx-auto mb-1" />1d10</button>
              <button onClick={() => roll("1d12", rollDie(12))} className="rounded-xl border border-line bg-panel2 p-3 font-serif text-gold2"><Dice5 className="mx-auto mb-1" />1d12</button>
              <button onClick={() => roll("2d6", rollDie(6) + rollDie(6))} className="rounded-xl border border-line bg-panel2 p-3 font-serif text-gold2"><Dice5 className="mx-auto mb-1" />2d6</button>
            </div>

            {history.length > 0 && (
              <div className="mt-4 rounded-2xl border border-line/70 bg-black/20 p-3">
                <p className="mb-2 font-serif text-xs uppercase tracking-wide text-gold2">Historique</p>
                <div className="space-y-1 text-sm text-muted">
                  {history.map((item, index) => (
                    <p key={`${item}-${index}`}>{item}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
