import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { Adventure, CombatRound, Monster } from "@/lib/types";
import { Fighter } from "@/components/ui/Fighter";
import { Header } from "@/components/ui/Header";
import { AdventureStatusBar } from "@/components/ui/AdventureStatusBar";
import { StickyHeaderGroup } from "@/components/ui/StickyHeaderGroup";
import { Panel } from "@/components/ui/Panel";
import { uid } from "@/lib/templates";

function rollDie(sides: number) {
  return Math.floor(Math.random() * sides) + 1;
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function findAttackStat(adventure: Adventure) {
  return (
    adventure.stats.find((stat) => /habileté|habilete|attaque|combat|force/i.test(stat.name)) ??
    adventure.stats[0]
  );
}

function findLifeStat(adventure: Adventure) {
  return (
    adventure.stats.find((stat) => /endurance|vie|vitalité|vitalite|santé|sante|pv/i.test(stat.name)) ??
    adventure.stats[1] ??
    adventure.stats[0]
  );
}

export function CombatScreen({
  adventure,
  onHeroClick,
  onLibrary,
  onOptions,
  addMonster,
  editMonster,
  deleteMonster,
  updateMonsterEndurance,
  validateCombatRound,
}: {
  adventure: Adventure;
  onHeroClick: () => void;
  onLibrary: () => void;
  onOptions: () => void;
  addMonster: () => void;
  editMonster: (monster: Monster) => void;
  deleteMonster: (id: string) => void;
  updateMonsterEndurance: (id: string, delta: number) => void;
  validateCombatRound: (monsterId: string, round: CombatRound) => void;
}) {
  const attackStat = findAttackStat(adventure);
  const lifeStat = findLifeStat(adventure);
  const diceConfig = adventure.diceConfig ?? { sides: 6, mode: "multiple", count: 2 };
  const diceCount = Math.max(1, diceConfig.count ?? 2);
  const diceSides = diceConfig.sides ?? 6;
  const [pending, setPending] = useState<Record<string, CombatRound>>({});

  const startAssault = (monster: Monster) => {
    const heroRolls = Array.from({ length: diceCount }, () => rollDie(diceSides));
    const monsterRolls = Array.from({ length: diceCount }, () => rollDie(diceSides));
    const heroScore = (attackStat?.current ?? 0) + sum(heroRolls);
    const monsterScore = monster.skill + sum(monsterRolls);
    const winner: CombatRound["winner"] =
      heroScore > monsterScore ? "hero" : monsterScore > heroScore ? "monster" : "tie";
    const defaultDamage = 2;

    setPending((current) => ({
      ...current,
      [monster.id]: {
        id: uid(),
        createdAt: new Date().toISOString(),
        heroStatName: attackStat?.name ?? "Attaque",
        monsterStatName: "Attaque",
        diceCount,
        diceSides,
        heroRolls,
        monsterRolls,
        heroScore,
        monsterScore,
        winner,
        damageToMonster: winner === "hero" ? defaultDamage : 0,
        damageToHero: winner === "monster" ? defaultDamage : 0,
        note: "",
      },
    }));
  };

  const updatePending = (monsterId: string, patch: Partial<CombatRound>) => {
    setPending((current) => ({
      ...current,
      [monsterId]: { ...current[monsterId], ...patch },
    }));
  };

  const confirmAssault = (monsterId: string) => {
    const round = pending[monsterId];
    if (!round) return;
    validateCombatRound(monsterId, round);
    setPending((current) => {
      const copy = { ...current };
      delete copy[monsterId];
      return copy;
    });
  };

  return (
    <div>
      <StickyHeaderGroup>
        <Header
          title="Combat"
          back={onLibrary}
          onOptions={onOptions}
          right={
            <button
              onClick={addMonster}
              className="grid h-9 w-9 place-items-center rounded-xl text-gold active:bg-gold/10"
            >
              <Plus size={20} />
            </button>
          }
        />
        <AdventureStatusBar adventure={adventure} onHeroClick={onHeroClick} />
      </StickyHeaderGroup>

      <div className="space-y-4 p-4">
        <p className="text-center font-serif text-xs uppercase tracking-widest text-gold2">
          Combat semi-automatique
        </p>

        <Fighter
          name={adventure.hero.name}
          portrait={adventure.hero.portrait}
          skill={attackStat?.current ?? 0}
          end={lifeStat?.current ?? 0}
          max={lifeStat?.max ?? lifeStat?.current ?? 20}
        />

        <Panel className="p-4">
          <h2 className="mb-2 font-serif text-sm uppercase tracking-wide text-gold2">
            Règle utilisée
          </h2>
          <p className="text-sm leading-6 text-muted">
            Assaut : {attackStat?.name ?? "Attaque"} + {diceCount}d{diceSides}. Dégâts par défaut : 2, ajustables avant validation.
          </p>
        </Panel>

        <div className="text-center font-serif text-gold">VS</div>

        {adventure.monsters.length === 0 ? (
          <Panel className="p-4 text-sm text-muted">
            Aucun monstre. Appuie sur + pour en ajouter un.
          </Panel>
        ) : (
          adventure.monsters.map((m) => {
            const round = pending[m.id];
            return (
              <Panel key={m.id} className="space-y-3 p-3">
                <Fighter
                  name={m.name}
                  portrait="👺"
                  skill={m.skill}
                  end={m.endurance}
                  max={m.maxEndurance}
                />

                {m.combatResult && m.combatResult !== "pending" && (
                  <p className="rounded-xl border border-gold/30 bg-gold/10 px-3 py-2 text-center font-serif text-sm text-gold2">
                    {m.combatResult === "victory" ? "Victoire" : "Défaite"}
                  </p>
                )}

                {m.note && (
                  <p className="rounded-lg border border-line/60 bg-black/20 p-3 text-sm text-muted">
                    {m.note}
                  </p>
                )}

                {!round ? (
                  <button
                    onClick={() => startAssault(m)}
                    disabled={m.endurance <= 0 || (lifeStat?.current ?? 0) <= 0}
                    className="w-full rounded-2xl border border-gold/50 bg-gold/15 px-4 py-4 font-serif text-lg text-gold2 disabled:opacity-50 active:scale-[.99]"
                  >
                    🎲 Assaut
                  </button>
                ) : (
                  <div className="space-y-3 rounded-2xl border border-line/70 bg-black/20 p-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="rounded-xl border border-line/60 bg-black/25 p-3">
                        <p className="font-serif text-xs uppercase tracking-wide text-gold2">
                          Héros
                        </p>
                        <p className="mt-1 text-parchment">
                          {attackStat?.current ?? 0} + {round.heroRolls.join(" + ")}
                        </p>
                        <p className="text-2xl font-black text-gold2">{round.heroScore}</p>
                      </div>
                      <div className="rounded-xl border border-line/60 bg-black/25 p-3">
                        <p className="font-serif text-xs uppercase tracking-wide text-gold2">
                          {m.name}
                        </p>
                        <p className="mt-1 text-parchment">
                          {m.skill} + {round.monsterRolls.join(" + ")}
                        </p>
                        <p className="text-2xl font-black text-gold2">{round.monsterScore}</p>
                      </div>
                    </div>

                    <p className="rounded-xl border border-gold/20 bg-gold/10 px-3 py-2 text-center text-sm text-gold2">
                      {round.winner === "hero"
                        ? "Le héros gagne l’assaut"
                        : round.winner === "monster"
                          ? `${m.name} gagne l’assaut`
                          : "Égalité : aucun dégât automatique"}
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <DamageStepper
                        label={`Dégâts à ${m.name}`}
                        value={round.damageToMonster}
                        onChange={(value) => updatePending(m.id, { damageToMonster: value })}
                      />
                      <DamageStepper
                        label="Dégâts au héros"
                        value={round.damageToHero}
                        onChange={(value) => updatePending(m.id, { damageToHero: value })}
                      />
                    </div>

                    <textarea
                      value={round.note ?? ""}
                      onChange={(event) => updatePending(m.id, { note: event.target.value })}
                      placeholder="Note optionnelle : chance utilisée, arme magique, sort, règle spéciale…"
                      rows={3}
                      className="w-full resize-y rounded-xl border border-line bg-black/25 px-3 py-2 text-sm text-parchment outline-none placeholder:text-muted focus:border-gold/50"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPending((current) => {
                          const copy = { ...current };
                          delete copy[m.id];
                          return copy;
                        })}
                        className="rounded-xl border border-line py-3 text-sm text-muted"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={() => confirmAssault(m.id)}
                        className="rounded-xl border border-gold/40 bg-gold/20 py-3 font-semibold text-gold2"
                      >
                        Valider
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateMonsterEndurance(m.id, -1)}
                    className="rounded-lg border border-line py-2 text-gold"
                  >
                    − Vie
                  </button>
                  <button
                    onClick={() => updateMonsterEndurance(m.id, 1)}
                    className="rounded-lg border border-line py-2 text-gold"
                  >
                    + Vie
                  </button>
                  <button
                    onClick={() => editMonster(m)}
                    className="rounded-lg border border-line py-2 text-sm text-gold"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteMonster(m.id)}
                    className="rounded-lg border border-red-900/60 py-2 text-sm text-red-200"
                  >
                    Supprimer
                  </button>
                </div>

                {(m.combatLog ?? []).length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-serif text-xs uppercase tracking-wide text-gold2">
                      Historique
                    </h3>
                    {(m.combatLog ?? []).slice(0, 5).map((entry, index) => (
                      <div key={entry.id} className="rounded-xl border border-line/60 bg-black/20 p-3 text-xs text-muted">
                        <p className="font-semibold text-parchment">Tour {(m.combatLog ?? []).length - index}</p>
                        <p>
                          Héros {entry.heroScore} — {m.name} {entry.monsterScore}
                        </p>
                        <p>
                          Dégâts : {m.name} -{entry.damageToMonster} · Héros -{entry.damageToHero}
                        </p>
                        {entry.note ? <p className="mt-1 text-gold2">{entry.note}</p> : null}
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
            );
          })
        )}
      </div>
    </div>
  );
}

function DamageStepper({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-xl border border-line/60 bg-black/25 p-3">
      <p className="mb-2 font-serif text-[10px] uppercase tracking-wide text-gold2">
        {label}
      </p>
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="grid h-8 w-8 place-items-center rounded-lg border border-line text-gold"
        >
          −
        </button>
        <span className="text-xl font-black text-gold2">{value}</span>
        <button
          onClick={() => onChange(value + 1)}
          className="grid h-8 w-8 place-items-center rounded-lg border border-line text-gold"
        >
          +
        </button>
      </div>
    </div>
  );
}
