import { ChevronRight, Flame, Plus, Settings } from "lucide-react";
import type { Adventure } from "@/lib/types";
import { Header } from "@/components/ui/Header";

export function HomeScreen({
  adventures,
  selectedId,
  select,
  create,
}: {
  adventures: Adventure[];
  selectedId: string;
  select: (id: string) => void;
  create: () => void;
}) {
  return (
    <div>
      <Header title="Carnet ✧ Héros" right={<Settings size={18} />} />
      <div className="space-y-5 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-sm uppercase tracking-[.16em] text-gold2">
            Mes aventures
          </h2>
          <button
            onClick={create}
            className="gold-frame grid h-11 w-11 place-items-center rounded-2xl border border-gold/40 bg-panel2 text-gold shadow-card active:scale-[0.98]"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>
        </div>
        <div className="space-y-2">
          {adventures.map((a) => (
            <button
              key={a.id}
              onClick={() => select(a.id)}
              className={`gold-frame flex w-full items-center gap-3 rounded-xl bg-panel/80 p-2 text-left ${selectedId === a.id ? "shadow-glow" : ""}`}
            >
              <div
                className={`grid h-20 w-20 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${a.cover} text-4xl shadow-inner`}
              >
                <Flame className="text-gold" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-serif text-[1rem] leading-tight text-parchment">
                  {a.title}
                </p>
                <p className="mt-1 text-xs text-muted">{a.series}</p>
                <p className="mt-2 text-xs text-gold">♙ {a.status}</p>
              </div>
              <div className="flex h-full flex-col items-end justify-between gap-5 text-muted">
                <ChevronRight size={18} />
                <span className="text-xs">§ {a.paragraph}</span>
              </div>
            </button>
          ))}
        </div>
        <button className="w-full rounded-lg border border-line py-3 font-serif text-sm uppercase tracking-wide text-gold2">
          Toutes les aventures
        </button>
      </div>
    </div>
  );
}
