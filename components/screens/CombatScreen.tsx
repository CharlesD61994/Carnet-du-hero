import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import type { Adventure, CombatAction, CombatRound, DiceRoll, Item, Monster, Stat } from "@/lib/types";
import { Fighter } from "@/components/ui/Fighter";
import { Header } from "@/components/ui/Header";
import { AdventureStatusBar } from "@/components/ui/AdventureStatusBar";
import { StickyHeaderGroup } from "@/components/ui/StickyHeaderGroup";
import { Panel } from "@/components/ui/Panel";
import { uid } from "@/lib/templates";

type CombatDraft = CombatRound;

type DialogState =
  | { type: "roll"; monster: Monster; action?: boolean }
  | { type: "stat"; monster: Monster }
  | { type: "item"; monster: Monster }
  | { type: "note"; monster: Monster }
  | { type: "quit"; monster: Monster }
  | null;

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

function actionSummary(action: CombatAction) {
  if (action.type === "stat") {
    const sign = action.delta > 0 ? "+" : "";
    return `❤️ ${action.target === "monster" ? "Monstre" : "Héros"} · ${action.statName} ${sign}${action.delta}${action.note ? ` · ${action.note}` : ""}`;
  }
  if (action.type === "item") {
    return `🎒 ${action.itemName}${action.note ? ` · ${action.note}` : ""}`;
  }
  if (action.type === "dice") {
    return `🎲 ${action.note || "Relancer les dés"} · ${action.roll.count}d${action.roll.sides} = ${action.roll.total}`;
  }
  return `📝 ${action.note}`;
}

export function CombatScreen({
  adventure,
  onHeroClick,
  onLibrary,
  onOptions,
  onReturnToJourney,
  addMonster,
  editMonster,
  deleteMonster,
  updateMonsterEndurance,
  validateCombatRound,
  quitCombat,
}: {
  adventure: Adventure;
  onHeroClick: () => void;
  onLibrary: () => void;
  onOptions: () => void;
  onReturnToJourney: () => void;
  addMonster: () => void;
  editMonster: (monster: Monster) => void;
  deleteMonster: (id: string) => void;
  updateMonsterEndurance: (id: string, delta: number) => void;
  validateCombatRound: (monsterId: string, round: CombatRound) => void;
  quitCombat: (monsterId: string, reason: string) => void;
}) {
  const attackStat = findAttackStat(adventure);
  const lifeStat = findLifeStat(adventure);
  const diceConfig = adventure.diceConfig ?? { sides: 6, mode: "multiple", count: 2 };
  const diceSides = diceConfig.sides ?? 6;
  const [pending, setPending] = useState<Record<string, CombatDraft>>({});
  const [dialog, setDialog] = useState<DialogState>(null);

  const heroPools = useMemo(
    () => [
      ...adventure.stats.map((stat) => ({ ...stat, collection: "stats" as const })),
      ...adventure.resources.map((stat) => ({ ...stat, collection: "resources" as const })),
    ],
    [adventure.stats, adventure.resources],
  );

  const startRoll = (monster: Monster, count: number) => {
    const rolls = Array.from({ length: count }, () => rollDie(diceSides));
    setPending((current) => ({
      ...current,
      [monster.id]: {
        id: uid(),
        createdAt: new Date().toISOString(),
        diceCount: count,
        diceSides,
        rolls,
        total: sum(rolls),
        context: `Combat contre ${monster.name}`,
        actions: [],
      },
    }));
    setDialog(null);
  };

  const addReroll = (monster: Monster, count: number, note: string) => {
    const rolls = Array.from({ length: count }, () => rollDie(diceSides));
    const roll: DiceRoll = {
      id: uid(),
      createdAt: new Date().toISOString(),
      sides: diceSides,
      count,
      rolls,
      total: sum(rolls),
      context: note || `Relancer les dés contre ${monster.name}`,
      sourceParagraph: monster.sourceParagraph,
      sourceNodeId: monster.sourceNodeId,
    };
    addAction(monster.id, {
      id: uid(),
      type: "dice",
      roll,
      note: note || "Relancer les dés",
    });
    setDialog(null);
  };

  const addAction = (monsterId: string, action: CombatAction) => {
    setPending((current) => {
      const round = current[monsterId];
      if (!round) return current;
      return {
        ...current,
        [monsterId]: { ...round, actions: [...round.actions, action] },
      };
    });
  };

  const removeAction = (monsterId: string, actionId: string) => {
    setPending((current) => {
      const round = current[monsterId];
      if (!round) return current;
      return {
        ...current,
        [monsterId]: { ...round, actions: round.actions.filter((action) => action.id !== actionId) },
      };
    });
  };

  const confirmTurn = (monsterId: string) => {
    const round = pending[monsterId];
    if (!round) return;
    validateCombatRound(monsterId, round);
    setPending((current) => {
      const copy = { ...current };
      delete copy[monsterId];
      return copy;
    });
  };

  const cancelTurn = (monsterId: string) => {
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
            Principe
          </h2>
          <p className="text-sm leading-6 text-muted">
            Lance les dés, puis ajoute les actions du tour : modifier une statistique, utiliser un objet, ajouter une note ou relancer les dés. Le dé utilisé est celui configuré pour l’aventure : d{diceSides}.
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
            const ended = m.combatResult && m.combatResult !== "pending";
            return (
              <Panel key={m.id} className="space-y-3 p-3">
                <Fighter
                  name={m.name}
                  portrait="👺"
                  skill={m.skill}
                  end={m.endurance}
                  max={m.maxEndurance}
                />

                {ended && (
                  <p className="rounded-xl border border-gold/30 bg-gold/10 px-3 py-2 text-center font-serif text-sm text-gold2">
                    {m.combatResult === "victory"
                      ? "Victoire"
                      : m.combatResult === "defeat"
                        ? "Défaite"
                        : "Combat interrompu"}
                  </p>
                )}

                {m.note && (
                  <p className="rounded-lg border border-line/60 bg-black/20 p-3 text-sm text-muted">
                    {m.note}
                  </p>
                )}

                {!round ? (
                  <div className="grid gap-2">
                    <button
                      onClick={() => setDialog({ type: "roll", monster: m })}
                      disabled={ended}
                      className="w-full rounded-2xl border border-gold/50 bg-gold/15 px-4 py-4 font-serif text-lg text-gold2 disabled:opacity-50 active:scale-[.99]"
                    >
                      🎲 Lancer les dés
                    </button>
                    {!ended && (
                      <button
                        onClick={() => setDialog({ type: "quit", monster: m })}
                        className="w-full rounded-xl border border-line bg-black/20 px-4 py-3 text-sm text-muted active:scale-[.99]"
                      >
                        Quitter le combat
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 rounded-2xl border border-line/70 bg-black/20 p-3">
                    <div className="rounded-xl border border-line/60 bg-black/25 p-3 text-center">
                      <p className="font-serif text-xs uppercase tracking-wide text-gold2">
                        Lancer principal
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {round.diceCount}d{round.diceSides}
                      </p>
                      <p className="mt-1 text-parchment">{round.rolls.join(" + ")}</p>
                      <p className="text-4xl font-black text-gold2">{round.total}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setDialog({ type: "stat", monster: m })}
                        className="rounded-xl border border-line bg-black/20 px-3 py-3 text-sm text-gold2"
                      >
                        ❤️ Modifier une statistique
                      </button>
                      <button
                        onClick={() => setDialog({ type: "item", monster: m })}
                        className="rounded-xl border border-line bg-black/20 px-3 py-3 text-sm text-gold2"
                      >
                        🎒 Utiliser un objet
                      </button>
                      <button
                        onClick={() => setDialog({ type: "note", monster: m })}
                        className="rounded-xl border border-line bg-black/20 px-3 py-3 text-sm text-gold2"
                      >
                        📝 Ajouter une note
                      </button>
                      <button
                        onClick={() => setDialog({ type: "roll", monster: m, action: true })}
                        className="rounded-xl border border-line bg-black/20 px-3 py-3 text-sm text-gold2"
                      >
                        🎲 Relancer les dés
                      </button>
                    </div>

                    {round.actions.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-serif text-xs uppercase tracking-wide text-gold2">
                          Actions du tour
                        </h3>
                        {round.actions.map((action) => (
                          <div key={action.id} className="flex items-start justify-between gap-2 rounded-xl border border-line/60 bg-black/25 p-3 text-xs text-muted">
                            <span>{actionSummary(action)}</span>
                            <button
                              onClick={() => removeAction(m.id, action.id)}
                              className="shrink-0 text-red-200"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => cancelTurn(m.id)}
                        className="rounded-xl border border-line py-3 text-sm text-muted"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={() => confirmTurn(m.id)}
                        className="rounded-xl border border-gold/40 bg-gold/20 py-3 font-semibold text-gold2"
                      >
                        Valider le tour
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateMonsterEndurance(m.id, -1)}
                    disabled={ended}
                    className="rounded-lg border border-line py-2 text-gold disabled:opacity-50"
                  >
                    − Vie
                  </button>
                  <button
                    onClick={() => updateMonsterEndurance(m.id, 1)}
                    disabled={ended}
                    className="rounded-lg border border-line py-2 text-gold disabled:opacity-50"
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
                          Lancer : {entry.diceCount}d{entry.diceSides} = {entry.total}
                        </p>
                        {entry.actions.length > 0 ? (
                          <div className="mt-1 space-y-1">
                            {entry.actions.map((action) => (
                              <p key={action.id}>{actionSummary(action)}</p>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-1">Aucune action ajoutée.</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
            );
          })
        )}
      </div>

      {dialog?.type === "roll" && (
        <RollDialog
          diceSides={diceSides}
          title={dialog.action ? "Relancer les dés" : "Lancer les dés"}
          description={dialog.action ? "Ce lancer sera ajouté aux actions du tour." : "Choisis seulement le nombre de dés. Le type de dé vient de la feuille."}
          onCancel={() => setDialog(null)}
          onConfirm={(count, note) =>
            dialog.action
              ? addReroll(dialog.monster, count, note)
              : startRoll(dialog.monster, count)
          }
          askNote={dialog.action}
        />
      )}

      {dialog?.type === "stat" && (
        <StatActionDialog
          heroPools={heroPools}
          monster={dialog.monster}
          lifeStat={lifeStat}
          onCancel={() => setDialog(null)}
          onConfirm={(action) => {
            addAction(dialog.monster.id, action);
            setDialog(null);
          }}
        />
      )}

      {dialog?.type === "item" && (
        <ItemActionDialog
          items={adventure.items}
          onCancel={() => setDialog(null)}
          onConfirm={(action) => {
            addAction(dialog.monster.id, action);
            setDialog(null);
          }}
        />
      )}

      {dialog?.type === "note" && (
        <NoteActionDialog
          onCancel={() => setDialog(null)}
          onConfirm={(action) => {
            addAction(dialog.monster.id, action);
            setDialog(null);
          }}
        />
      )}

      {dialog?.type === "quit" && (
        <QuitCombatDialog
          monster={dialog.monster}
          onCancel={() => setDialog(null)}
          onConfirm={(reason) => {
            quitCombat(dialog.monster.id, reason);
            setDialog(null);
            onReturnToJourney();
          }}
        />
      )}
    </div>
  );
}

function ModalShell({
  title,
  description,
  children,
  onCancel,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-end bg-black/70 px-4 pb-4 pt-20 backdrop-blur-sm">
      <section className="w-full max-h-[82vh] overflow-auto rounded-t-3xl border border-gold/25 bg-night p-4 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-parchment">{title}</h2>
            {description ? <p className="mt-1 text-sm leading-6 text-muted">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="shrink-0 rounded-full border border-line bg-black/20 px-3 py-2 text-sm text-muted active:scale-[0.98]"
          >
            ×
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

function RollDialog({
  diceSides,
  title,
  description,
  askNote,
  onCancel,
  onConfirm,
}: {
  diceSides: number;
  title: string;
  description: string;
  askNote?: boolean;
  onCancel: () => void;
  onConfirm: (count: number, note: string) => void;
}) {
  const [count, setCount] = useState(2);
  const [note, setNote] = useState("");

  return (
    <ModalShell title={title} description={description} onCancel={onCancel}>
      <div className="space-y-4">
        <div className="rounded-2xl border border-line/70 bg-black/20 p-3">
          <p className="font-serif text-xs uppercase tracking-wide text-gold2">Nombre de dés</p>
          <p className="mt-1 text-xs text-muted">Dé configuré : d{diceSides}</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              onClick={() => setCount((value) => Math.max(1, value - 1))}
              className="grid h-11 w-11 place-items-center rounded-xl border border-line text-xl text-gold"
            >
              −
            </button>
            <span className="text-3xl font-black text-gold2">{count}</span>
            <button
              onClick={() => setCount((value) => Math.min(12, value + 1))}
              className="grid h-11 w-11 place-items-center rounded-xl border border-line text-xl text-gold"
            >
              +
            </button>
          </div>
        </div>

        {askNote && (
          <label className="block">
            <span className="mb-2 block font-serif text-xs uppercase tracking-wide text-gold2">Contexte</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={4}
              placeholder="Ex. Vérifier si l’arme magique s’active, gagner un dé supplémentaire…"
              className="w-full resize-y rounded-2xl border border-line bg-black/25 px-4 py-3 text-sm text-parchment outline-none placeholder:text-muted focus:border-gold/50"
            />
          </label>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button onClick={onCancel} className="rounded-2xl border border-line bg-black/25 px-4 py-3 font-semibold text-muted">
            Annuler
          </button>
          <button onClick={() => onConfirm(count, note.trim())} className="rounded-2xl border border-gold/40 bg-gold/20 px-4 py-3 font-semibold text-gold2">
            Lancer
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function StatActionDialog({
  heroPools,
  monster,
  lifeStat,
  onCancel,
  onConfirm,
}: {
  heroPools: Array<Stat & { collection: "stats" | "resources" }>;
  monster: Monster;
  lifeStat?: Stat;
  onCancel: () => void;
  onConfirm: (action: CombatAction) => void;
}) {
  const [target, setTarget] = useState<"hero" | "monster">("monster");
  const [heroStatId, setHeroStatId] = useState(heroPools[0]?.id ?? "");
  const [delta, setDelta] = useState(-2);
  const [note, setNote] = useState("");

  const selectedStat = heroPools.find((stat) => stat.id === heroStatId) ?? heroPools[0];

  return (
    <ModalShell title="Modifier une statistique" description="Utilise cette action pour les dégâts, la chance, la magie, la peur ou toute autre ressource." onCancel={onCancel}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setTarget("monster")}
            className={`rounded-xl border px-3 py-3 text-sm ${target === "monster" ? "border-gold bg-gold/10 text-gold2" : "border-line bg-black/20 text-muted"}`}
          >
            Monstre
          </button>
          <button
            onClick={() => setTarget("hero")}
            className={`rounded-xl border px-3 py-3 text-sm ${target === "hero" ? "border-gold bg-gold/10 text-gold2" : "border-line bg-black/20 text-muted"}`}
          >
            Héros
          </button>
        </div>

        {target === "hero" ? (
          <label className="block">
            <span className="mb-2 block font-serif text-xs uppercase tracking-wide text-gold2">Statistique</span>
            <select
              value={heroStatId}
              onChange={(event) => setHeroStatId(event.target.value)}
              className="w-full rounded-2xl border border-line bg-black/25 px-4 py-3 text-sm text-parchment outline-none focus:border-gold/50"
            >
              {heroPools.map((stat) => (
                <option key={stat.id} value={stat.id} className="bg-night text-parchment">
                  {stat.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <div className="rounded-2xl border border-line/70 bg-black/20 p-3">
            <p className="font-serif text-xs uppercase tracking-wide text-gold2">Statistique</p>
            <p className="mt-1 text-parchment">Vie de {monster.name}</p>
          </div>
        )}

        <div className="rounded-2xl border border-line/70 bg-black/20 p-3">
          <p className="font-serif text-xs uppercase tracking-wide text-gold2">Variation</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              onClick={() => setDelta((value) => value - 1)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-line text-xl text-gold"
            >
              −
            </button>
            <span className="text-3xl font-black text-gold2">{delta > 0 ? `+${delta}` : delta}</span>
            <button
              onClick={() => setDelta((value) => value + 1)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-line text-xl text-gold"
            >
              +
            </button>
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block font-serif text-xs uppercase tracking-wide text-gold2">Note optionnelle</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="Ex. dégâts, chance utilisée, sort lancé…"
            className="w-full resize-y rounded-2xl border border-line bg-black/25 px-4 py-3 text-sm text-parchment outline-none placeholder:text-muted focus:border-gold/50"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={onCancel} className="rounded-2xl border border-line bg-black/25 px-4 py-3 font-semibold text-muted">
            Annuler
          </button>
          <button
            onClick={() => onConfirm({
              id: uid(),
              type: "stat",
              target,
              statId: target === "hero" ? selectedStat?.id : undefined,
              statName: target === "hero" ? selectedStat?.name ?? "Statistique" : "Vie",
              statCollection: target === "hero" ? selectedStat?.collection : undefined,
              delta,
              note: note.trim(),
            })}
            className="rounded-2xl border border-gold/40 bg-gold/20 px-4 py-3 font-semibold text-gold2"
          >
            Ajouter
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function ItemActionDialog({
  items,
  onCancel,
  onConfirm,
}: {
  items: Item[];
  onCancel: () => void;
  onConfirm: (action: CombatAction) => void;
}) {
  const [itemId, setItemId] = useState(items[0]?.id ?? "");
  const [note, setNote] = useState("");
  const item = items.find((candidate) => candidate.id === itemId) ?? items[0];

  return (
    <ModalShell title="Utiliser un objet" description="L'objet sera noté dans le journal du combat." onCancel={onCancel}>
      <div className="space-y-4">
        {items.length > 0 ? (
          <label className="block">
            <span className="mb-2 block font-serif text-xs uppercase tracking-wide text-gold2">Objet</span>
            <select
              value={itemId}
              onChange={(event) => setItemId(event.target.value)}
              className="w-full rounded-2xl border border-line bg-black/25 px-4 py-3 text-sm text-parchment outline-none focus:border-gold/50"
            >
              {items.map((option) => (
                <option key={option.id} value={option.id} className="bg-night text-parchment">
                  {option.icon} {option.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <p className="rounded-2xl border border-line/70 bg-black/20 p-3 text-sm text-muted">
            Aucun objet dans l’inventaire.
          </p>
        )}

        <label className="block">
          <span className="mb-2 block font-serif text-xs uppercase tracking-wide text-gold2">Note</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={4}
            placeholder="Ex. potion de guérison, arme magique, flèche empoisonnée…"
            className="w-full resize-y rounded-2xl border border-line bg-black/25 px-4 py-3 text-sm text-parchment outline-none placeholder:text-muted focus:border-gold/50"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={onCancel} className="rounded-2xl border border-line bg-black/25 px-4 py-3 font-semibold text-muted">
            Annuler
          </button>
          <button
            disabled={!item}
            onClick={() => item && onConfirm({
              id: uid(),
              type: "item",
              itemId: item.id,
              itemName: item.name,
              note: note.trim(),
            })}
            className="rounded-2xl border border-gold/40 bg-gold/20 px-4 py-3 font-semibold text-gold2 disabled:opacity-50"
          >
            Ajouter
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function NoteActionDialog({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: (action: CombatAction) => void;
}) {
  const [note, setNote] = useState("");

  return (
    <ModalShell title="Ajouter une note" onCancel={onCancel}>
      <div className="space-y-4">
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={6}
          placeholder="Écris ce qui s’est passé pendant ce tour…"
          className="w-full resize-y rounded-2xl border border-line bg-black/25 px-4 py-3 text-sm text-parchment outline-none placeholder:text-muted focus:border-gold/50"
        />
        <div className="grid grid-cols-2 gap-3">
          <button onClick={onCancel} className="rounded-2xl border border-line bg-black/25 px-4 py-3 font-semibold text-muted">
            Annuler
          </button>
          <button
            onClick={() => note.trim() && onConfirm({ id: uid(), type: "note", note: note.trim() })}
            className="rounded-2xl border border-gold/40 bg-gold/20 px-4 py-3 font-semibold text-gold2"
          >
            Ajouter
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function QuitCombatDialog({
  monster,
  onCancel,
  onConfirm,
}: {
  monster: Monster;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  return (
    <ModalShell title={`Quitter le combat contre ${monster.name}`} description="La raison sera enregistrée dans le résumé du combat." onCancel={onCancel}>
      <div className="space-y-4">
        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          rows={5}
          placeholder="Ex. Le vampire s’enfuit, le livre demande d’aller au §142, combat interrompu…"
          className="w-full resize-y rounded-2xl border border-line bg-black/25 px-4 py-3 text-sm text-parchment outline-none placeholder:text-muted focus:border-gold/50"
        />
        <div className="grid grid-cols-2 gap-3">
          <button onClick={onCancel} className="rounded-2xl border border-line bg-black/25 px-4 py-3 font-semibold text-muted">
            Annuler
          </button>
          <button
            onClick={() => onConfirm(reason.trim() || "Combat quitté manuellement.")}
            className="rounded-2xl border border-gold/40 bg-gold/20 px-4 py-3 font-semibold text-gold2"
          >
            Confirmer
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
