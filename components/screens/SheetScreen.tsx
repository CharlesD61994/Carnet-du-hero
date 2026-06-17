import type { Adventure } from "@/lib/types";
import { Header } from "@/components/ui/Header";
import { StickyHeaderGroup } from "@/components/ui/StickyHeaderGroup";
import { Panel } from "@/components/ui/Panel";
import { activeItemEffects, effectiveStatValue, itemEffectSummary, statBonus } from "@/lib/effects";

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
  const wornItems = adventure.items.filter((item) => item.worn);
  const activeEffects = activeItemEffects(adventure);

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
          {adventure.stats.map((s) => {
            const bonus = statBonus(adventure, s, "stats");
            const effective = effectiveStatValue(adventure, s, "stats");

            return (
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
                  {bonus ? <span className="ml-1 text-base text-emerald-200">{bonus > 0 ? `+${bonus}` : bonus}</span> : null}
                  {s.max ? ` / ${s.max}` : ""}
                </div>
                {bonus ? <div className="text-xs text-muted">Total {effective}</div> : null}
                <div className="mt-3 grid grid-cols-2 gap-1">
                  <button
                    onClick={() => updateStat(s.id, -1)}
                    className="rounded-lg border border-line py-1 text-gold"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateStat(s.id, 1)}
                    className="rounded-lg border border-line py-1 text-gold"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {adventure.resources.map((r) => {
            const bonus = statBonus(adventure, r, "resources");
            const effective = effectiveStatValue(adventure, r, "resources");

            return (
              <Panel key={r.id} className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{r.icon}</span>
                  <div>
                    <p className="font-serif text-sm uppercase text-gold2">
                      {r.name}
                    </p>
                    <p className="text-xl font-bold">
                      {r.current}
                      {bonus ? <span className="ml-1 text-base text-emerald-200">{bonus > 0 ? `+${bonus}` : bonus}</span> : null}
                      {r.max ? ` / ${r.max}` : ""}
                    </p>
                    {bonus ? <p className="text-xs text-muted">Total {effective}</p> : null}
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-1">
                  <button
                    onClick={() => updateResource(r.id, -1)}
                    className="rounded-lg border border-line py-1 text-gold"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateResource(r.id, 1)}
                    className="rounded-lg border border-line py-1 text-gold"
                  >
                    +
                  </button>
                </div>
              </Panel>
            );
          })}
        </div>
        <Panel className="p-4">
          <h2 className="mb-3 font-serif text-sm uppercase tracking-wide text-gold2">
            Équipement porté
          </h2>
          <div className="space-y-2">
            {wornItems.length === 0 ? (
              <p className="text-sm text-muted">Aucun équipement porté.</p>
            ) : (
              wornItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-line/70 bg-black/20 p-3 text-sm"
                >
                  <span className="min-w-0 truncate">{item.icon} {item.name}</span>
                  {itemEffectSummary(item) ? (
                    <span className="shrink-0 text-xs text-gold2">{itemEffectSummary(item)}</span>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </Panel>
        <Panel className="p-4">
          <h2 className="mb-3 font-serif text-sm uppercase tracking-wide text-gold2">
            Effets actifs
          </h2>
          <div className="space-y-2">
            {adventure.effects.length === 0 && activeEffects.length === 0 && (
              <p className="text-sm text-muted">Aucun effet actif.</p>
            )}
            {activeEffects.map((effect) => (
              <div
                key={`${effect.itemName}-${effect.id}`}
                className="flex items-center justify-between rounded-lg border border-line/70 bg-black/20 p-3 text-sm"
              >
                <span>✦ {effect.itemName}</span>
                <span className="text-xs text-gold2">
                  {effect.delta > 0 ? `+${effect.delta}` : effect.delta} {effect.statName}
                </span>
              </div>
            ))}
            {adventure.effects.map((e, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-line/70 bg-black/20 p-3 text-sm"
              >
                <span>✦ {e}</span>
                <span className="text-xs text-muted">Actif</span>
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
