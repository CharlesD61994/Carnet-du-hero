import type { Adventure } from "@/lib/types";
import { Header } from "@/components/ui/Header";
import { StickyHeaderGroup } from "@/components/ui/StickyHeaderGroup";
import { Panel } from "@/components/ui/Panel";

export function SheetScreen({
  adventure,
  updateStat,
  updateResource,
  edit,
  onLibrary,
  onOptions,
}: {
  adventure: Adventure;
  updateStat: (id: string, delta: number) => void;
  updateResource: (id: string, delta: number) => void;
  edit: () => void;
  onLibrary: () => void;
  onOptions: () => void;
}) {
  return (
    <div>
      <StickyHeaderGroup>
        <Header title="Héros" back={onLibrary} onOptions={onOptions} />
      </StickyHeaderGroup>
      <div className="space-y-4 p-4">
        <div className="flex gap-4">
          <div className="grid h-24 w-24 place-items-center rounded-full border border-gold/50 bg-gradient-to-br from-slate-900 to-stone-800 text-5xl shadow-glow">
            {adventure.hero.portrait}
          </div>
          <div className="flex-1 pt-2">
            <h1 className="font-serif text-3xl text-gold2">
              {adventure.hero.name}
            </h1>
            <p className="text-sm text-muted">Niveau {adventure.hero.level}</p>
            <p className="text-sm text-muted">{adventure.hero.origin}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {adventure.stats.map((s) => (
            <div
              key={s.id}
              className="gold-frame rounded-xl bg-panel/80 p-3 text-center shadow-card"
            >
              <div className="font-serif text-[.70rem] uppercase tracking-wide text-gold2">
                {s.name}
              </div>
              <div className={`my-2 text-3xl ${s.color ?? ""}`}>{s.icon}</div>
              <div className="text-xl font-bold text-gold2">
                {s.current}
                {s.max ? ` / ${s.max}` : ""}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-1">
                <button
                  onClick={() => updateStat(s.id, -1)}
                  className="rounded-lg border border-line py-1 text-gold"
                >
                  −
                </button>
                <button
                  onClick={() => updateStat(s.id, 1)}
                  className="rounded-lg border border-line py-1 text-gold"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {adventure.resources.map((r) => (
            <Panel key={r.id} className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <p className="font-serif text-sm uppercase text-gold2">
                    {r.name}
                  </p>
                  <p className="text-xl font-bold">
                    {r.current}
                    {r.max ? ` / ${r.max}` : ""}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-1">
                <button
                  onClick={() => updateResource(r.id, -1)}
                  className="rounded-lg border border-line py-1 text-gold"
                >
                  −
                </button>
                <button
                  onClick={() => updateResource(r.id, 1)}
                  className="rounded-lg border border-line py-1 text-gold"
                >
                  +
                </button>
              </div>
            </Panel>
          ))}
        </div>
        <Panel className="p-4">
          <h2 className="mb-3 font-serif text-sm uppercase tracking-wide text-gold2">
            Effets actifs
          </h2>
          <div className="space-y-2">
            {adventure.effects.length === 0 && (
              <p className="text-sm text-muted">Aucun effet actif.</p>
            )}
            {adventure.effects.map((e, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-line/70 bg-black/20 p-3 text-sm"
              >
                <span>✦ {e}</span>
                <span className="text-xs text-muted">⌛</span>
              </div>
            ))}
          </div>
        </Panel>
        <button
          onClick={edit}
          className="w-full rounded-xl border border-gold/40 bg-gold/10 py-3 font-serif text-gold2"
        >
          Modifier la feuille
        </button>
      </div>
    </div>
  );
}
