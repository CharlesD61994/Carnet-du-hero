import { CheckCircle2, Plus, Skull, Swords } from "lucide-react";
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

function findLuckStat(adventure: Adventure) {
  return adventure.stats.find((stat) => /chance|luck/i.test(stat.name));
}

function damageActionIds(round?: CombatDraft) {
  if (!round) return [];
  return round.actions
    .filter((action) => action.type === "stat" && action.note?.includes("dégâts standards"))
    .map((action) => action.id);
}

function alreadyTriedLuck(round?: CombatDraft) {
  return Boolean(round?.actions.some((action) => action.type === "dice" && action.note?.startsWith("Chance en combat")));
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
  const luckStat = findLuckStat(adventure);
  const diceConfig = adventure.diceConfig ?? { sides: 6, mode: "multiple", count: 2 };
  const diceSides = diceConfig.sides ?? 6;
  const [pending, setPending] = useState<Record<string, CombatDraft>>({});
  const [dialog, setDialog] = useState<DialogState>(null);
  const [combatTab, setCombatTab] = useState<"active" | "history">("active");
  const activeMonsters = adventure.monsters.filter((monster) => !monster.combatResult || monster.combatResult === "pending");
  const completedMonsters = adventure.monsters.filter((monster) => monster.combatResult && monster.combatResult !== "pending");

  const heroPools = useMemo(
    () => [
      ...adventure.stats.map((stat) => ({ ...stat, collection: "stats" as const })),
      ...adventure.resources.map((stat) => ({ ...stat, collection: "resources" as const })),
    ],
    [adventure.stats, adventure.resources],
  );

  const startRoll = (monster: Monster, count: number) => {
    const heroRolls = Array.from({ length: count }, () => rollDie(diceSides));
    const enemyRolls = Array.from({ length: count }, () => rollDie(diceSides));
    const heroDiceTotal = sum(heroRolls);
    const enemyDiceTotal = sum(enemyRolls);
    const heroSkill = attackStat?.current ?? 0;
    const enemySkill = monster.skill;
    const heroAttackTotal = heroDiceTotal + heroSkill;
    const enemyAttackTotal = enemyDiceTotal + enemySkill;
    const outcome: CombatRound["outcome"] =
      heroAttackTotal > enemyAttackTotal
        ? "hero"
        : enemyAttackTotal > heroAttackTotal
          ? "enemy"
          : "tie";

    const actions: CombatAction[] = [];
    actions.push({
      id: uid(),
      type: "dice",
      note: `${monster.name} : ${enemyRolls.join(" + ")} + ${enemySkill} = ${enemyAttackTotal}`,
      roll: {
        id: uid(),
        createdAt: new Date().toISOString(),
        sides: diceSides,
        count,
        rolls: enemyRolls,
        total: enemyDiceTotal,
        context: `Jet de ${monster.name}`,
        sourceParagraph: monster.sourceParagraph,
        sourceNodeId: monster.sourceNodeId,
      },
    });

    if (outcome === "hero") {
      actions.push({
        id: uid(),
        type: "stat",
        target: "monster",
        statName: "Endurance",
        delta: -2,
        note: "Victoire du héros : dégâts standards",
      });
    } else if (outcome === "enemy" && lifeStat) {
      actions.push({
        id: uid(),
        type: "stat",
        target: "hero",
        statId: lifeStat.id,
        statName: lifeStat.name,
        statCollection: "stats",
        delta: -2,
        note: `Victoire de ${monster.name} : dégâts standards`,
      });
    }

    setPending((current) => ({
      ...current,
      [monster.id]: {
        id: uid(),
        createdAt: new Date().toISOString(),
        diceCount: count,
        diceSides,
        rolls: heroRolls,
        total: heroDiceTotal,
        context: `Combat contre ${monster.name}`,
        actions,
        heroRolls,
        heroDiceTotal,
        heroSkill,
        heroAttackTotal,
        enemyRolls,
        enemyDiceTotal,
        enemySkill,
        enemyAttackTotal,
        outcome,
      },
    }));
    setDialog(null);
  };

  const tryLuckInCombat = (monster: Monster) => {
    const round = pending[monster.id];
    if (!round || !luckStat || round.outcome === "tie" || alreadyTriedLuck(round)) return;

    const luckRolls = [rollDie(6), rollDie(6)];
    const luckTotal = sum(luckRolls);
    const success = luckTotal <= luckStat.current;
    const offensive = round.outcome === "hero";
    const nextDamage = offensive ? (success ? 4 : 1) : (success ? 1 : 3);
    const newDamageAction: CombatAction = offensive
      ? {
          id: uid(),
          type: "stat",
          target: "monster",
          statName: "Endurance",
          delta: -nextDamage,
          note: success
            ? "Chance réussie : blessure aggravée"
            : "Chance ratée : blessure réduite",
        }
      : {
          id: uid(),
          type: "stat",
          target: "hero",
          statId: lifeStat?.id,
          statName: lifeStat?.name ?? "Endurance",
          statCollection: "stats",
          delta: -nextDamage,
          note: success
            ? "Chance réussie : dégâts subis réduits"
            : "Chance ratée : dégâts subis aggravés",
        };

    const luckRoll: DiceRoll = {
      id: uid(),
      createdAt: new Date().toISOString(),
      sides: 6,
      count: 2,
      rolls: luckRolls,
      total: luckTotal,
      context: `Tenter sa Chance contre ${monster.name}`,
      sourceParagraph: monster.sourceParagraph,
      sourceNodeId: monster.sourceNodeId,
    };

    const idsToRemove = new Set(damageActionIds(round));
    setPending((current) => {
      const currentRound = current[monster.id];
      if (!currentRound) return current;
      return {
        ...current,
        [monster.id]: {
          ...currentRound,
          actions: [
            ...currentRound.actions.filter((action) => !idsToRemove.has(action.id)),
            {
              id: uid(),
              type: "dice",
              note: `Chance en combat : ${luckRolls.join(" + ")} = ${luckTotal} / ${luckStat.current} · ${success ? "Réussite" : "Échec"}`,
              roll: luckRoll,
            },
            {
              id: uid(),
              type: "stat",
              target: "hero",
              statId: luckStat.id,
              statName: luckStat.name,
              statCollection: "stats",
              delta: -1,
              note: "Tenter sa Chance coûte 1 point",
            },
            newDamageAction,
          ],
        },
      };
    });
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
        <Panel className="space-y-3 p-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setCombatTab("active")}
              className={`rounded-xl border px-3 py-3 text-sm font-semibold ${combatTab === "active" ? "border-gold/60 bg-gold/20 text-gold2" : "border-line bg-black/20 text-muted"}`}
            >
              En cours ({activeMonsters.length})
            </button>
            <button
              type="button"
              onClick={() => setCombatTab("history")}
              className={`rounded-xl border px-3 py-3 text-sm font-semibold ${combatTab === "history" ? "border-gold/60 bg-gold/20 text-gold2" : "border-line bg-black/20 text-muted"}`}
            >
              Historique ({completedMonsters.length})
            </button>
          </div>
          <p className="text-center text-xs leading-5 text-muted">
            Chaque assaut est guidé : dés visibles, total calculé, gagnant annoncé, puis option de tenter la Chance avant d’appliquer les dégâts.
          </p>
        </Panel>

        {combatTab === "active" && activeMonsters.length === 0 ? (
          <Panel className="p-4 text-sm text-muted">
            Aucun combat en cours. Appuie sur + pour ajouter un monstre.
          </Panel>
        ) : null}

        {combatTab === "active" && activeMonsters.map((m) => {
          const round = pending[m.id];
          return (
            <CombatMonsterCard
              key={m.id}
              monster={m}
              adventure={adventure}
              round={round}
              diceSides={diceSides}
              luckStat={luckStat}
              lifeStat={lifeStat}
              setDialog={setDialog}
              updateMonsterEndurance={updateMonsterEndurance}
              editMonster={editMonster}
              deleteMonster={deleteMonster}
              removeAction={removeAction}
              cancelTurn={cancelTurn}
              confirmTurn={confirmTurn}
              tryLuckInCombat={tryLuckInCombat}
            />
          );
        })}

        {combatTab === "history" && (
          <Panel className="space-y-3 p-3">
            <h2 className="font-serif text-sm uppercase tracking-wide text-gold2">Historique des combats</h2>
            {completedMonsters.length === 0 ? (
              <p className="text-sm text-muted">Aucun combat terminé pour le moment.</p>
            ) : (
              completedMonsters.map((m) => (
                <CompletedCombatCard key={m.id} monster={m} />
              ))
            )}
          </Panel>
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

function CombatMonsterCard({
  monster: m,
  adventure,
  round,
  diceSides,
  luckStat,
  lifeStat,
  setDialog,
  updateMonsterEndurance,
  editMonster,
  deleteMonster,
  removeAction,
  cancelTurn,
  confirmTurn,
  tryLuckInCombat,
}: {
  monster: Monster;
  adventure: Adventure;
  round?: CombatDraft;
  diceSides: number;
  luckStat?: Stat;
  lifeStat?: Stat;
  setDialog: (dialog: DialogState) => void;
  updateMonsterEndurance: (id: string, delta: number) => void;
  editMonster: (monster: Monster) => void;
  deleteMonster: (id: string) => void;
  removeAction: (monsterId: string, actionId: string) => void;
  cancelTurn: (monsterId: string) => void;
  confirmTurn: (monsterId: string) => void;
  tryLuckInCombat: (monster: Monster) => void;
}) {
  const attackStat = findAttackStat(adventure);
  const heroLabel = adventure.hero.name || "Vous";
  const [toolsOpen, setToolsOpen] = useState(false);
  const canTryLuck = Boolean(round && luckStat && round.outcome !== "tie" && !alreadyTriedLuck(round));
  const luckAttempt = round?.actions.find((action) => action.type === "dice" && action.note?.startsWith("Chance en combat"));
  const damageActions = round?.actions.filter((action) => action.type === "stat") ?? [];
  const extraActions = round?.actions.filter((action) => !damageActionIds(round).includes(action.id)) ?? [];
  const resultTone =
    round?.outcome === "hero"
      ? "border-emerald-500/40 bg-emerald-950/35 text-emerald-100"
      : round?.outcome === "enemy"
        ? "border-red-500/40 bg-red-950/35 text-red-100"
        : "border-gold/25 bg-gold/10 text-gold2";

  const outcomeTitle =
    round?.outcome === "hero"
      ? "Vous remportez l’assaut"
      : round?.outcome === "enemy"
        ? `${m.name} remporte l’assaut`
        : round?.outcome === "tie"
          ? "Égalité"
          : "";

  const outcomeDetail =
    round?.outcome === "hero"
      ? `${m.name} perd 2 Endurance, sauf si vous tentez votre Chance.`
      : round?.outcome === "enemy"
        ? `${heroLabel} perd 2 Endurance, sauf si vous tentez votre Chance.`
        : round?.outcome === "tie"
          ? "Aucun dégât. Vous pouvez lancer un nouvel assaut."
          : "";

  return (
    <Panel className="overflow-hidden p-0">
      <div className="space-y-4 p-4">
        <div className="rounded-[1.75rem] border border-gold/25 bg-gradient-to-br from-black/50 via-night to-black/25 p-4 shadow-inner">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-gold/25 bg-gradient-to-br from-red-950/60 via-black to-night text-4xl shadow-inner">
              👺
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-serif text-2xl font-bold text-parchment">{m.name}</p>
                  <p className="mt-1 text-xs text-muted">
                    {m.sourceParagraph ? `§ ${m.sourceParagraph} · ` : ""}Combat v2.1
                  </p>
                </div>
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold2">
                  En cours
                </span>
              </div>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-muted">
                  <span>Endurance</span>
                  <span className="font-black text-parchment">{m.endurance} / {m.maxEndurance}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-black/50 ring-1 ring-line/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-gold"
                    style={{ width: `${Math.max(0, Math.min(100, (m.endurance / Math.max(1, m.maxEndurance)) * 100))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <StatPill label="Habileté" value={m.skill} />
            <StatPill label="Dégâts" value="2" />
            <StatPill label="Assauts" value={(m.combatLog ?? []).length} />
          </div>
        </div>

        {m.note && (
          <p className="rounded-xl border border-line/60 bg-black/20 p-3 text-sm leading-6 text-muted">{m.note}</p>
        )}

        {!round ? (
          <div className="space-y-3">
            <div className="rounded-2xl border border-line/60 bg-black/20 p-3">
              <p className="font-serif text-xs uppercase tracking-[0.22em] text-gold2">Vos statistiques de combat</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <StatPill label="Attaque" value={attackStat?.current ?? 0} />
                <StatPill label={lifeStat?.name ?? "Vie"} value={`${lifeStat?.current ?? 0}/${lifeStat?.max ?? lifeStat?.current ?? 0}`} />
                <StatPill label="Chance" value={luckStat ? `${luckStat.current}/${luckStat.max ?? luckStat.current}` : "—"} />
              </div>
            </div>

            <button
              onClick={() => setDialog({ type: "roll", monster: m })}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gold/60 bg-gradient-to-b from-gold/35 to-gold/15 px-4 py-5 font-serif text-lg font-bold uppercase tracking-wide text-gold2 shadow-lg active:scale-[.99]"
            >
              <Swords size={21} />
              Lancer l’assaut
            </button>

            <button
              type="button"
              onClick={() => setToolsOpen((value) => !value)}
              className="w-full rounded-xl border border-line bg-black/20 px-4 py-3 text-sm font-semibold text-muted"
            >
              {toolsOpen ? "Masquer les outils" : "Outils du combat"}
            </button>

            {toolsOpen ? (
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setDialog({ type: "quit", monster: m })} className="rounded-xl border border-line bg-black/20 px-4 py-3 text-sm text-muted active:scale-[.99]">Fuir / quitter</button>
                <button onClick={() => editMonster(m)} className="rounded-xl border border-line bg-black/20 px-4 py-3 text-sm text-gold2 active:scale-[.99]">Modifier</button>
                <button onClick={() => updateMonsterEndurance(m.id, -1)} className="rounded-xl border border-line bg-black/20 px-4 py-3 text-sm text-gold2">− Vie</button>
                <button onClick={() => updateMonsterEndurance(m.id, 1)} className="rounded-xl border border-line bg-black/20 px-4 py-3 text-sm text-gold2">+ Vie</button>
                <button onClick={() => deleteMonster(m.id)} className="col-span-2 rounded-xl border border-red-900/60 bg-red-950/20 px-4 py-3 text-sm text-red-200">Supprimer</button>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-gold/20 bg-black/25 p-4 shadow-inner">
              <p className="text-center font-serif text-xs uppercase tracking-[0.26em] text-gold2">Résultat de l’assaut</p>
              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
                <DiceResultCard
                  title="Vous"
                  rolls={round.heroRolls ?? round.rolls}
                  diceTotal={round.heroDiceTotal ?? round.total}
                  bonusLabel={attackStat?.name ?? "Habileté"}
                  bonus={round.heroSkill ?? 0}
                  total={round.heroAttackTotal ?? round.total}
                  tone="hero"
                />
                <div className="grid place-items-center px-1 font-serif text-sm uppercase tracking-widest text-gold2">VS</div>
                <DiceResultCard
                  title={m.name}
                  rolls={round.enemyRolls ?? []}
                  diceTotal={round.enemyDiceTotal ?? 0}
                  bonusLabel="Habileté"
                  bonus={round.enemySkill ?? m.skill}
                  total={round.enemyAttackTotal ?? 0}
                  tone="enemy"
                />
              </div>
              {outcomeTitle ? (
                <div className={`mt-4 rounded-2xl border px-3 py-4 text-center ${resultTone}`}>
                  <p className="font-serif text-xl font-black uppercase tracking-wide">{outcomeTitle}</p>
                  <p className="mt-2 text-sm leading-5">{outcomeDetail}</p>
                </div>
              ) : null}
            </div>

            {round.outcome !== "tie" ? (
              <div className="rounded-[1.5rem] border border-gold/30 bg-gold/10 p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-gold/40 bg-black/25 text-2xl">✦</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-base font-bold uppercase tracking-wide text-gold2">Tenter sa Chance ?</p>
                    <p className="mt-1 text-xs leading-5 text-muted">
                      Cette décision se prend maintenant, après l’assaut, avant l’application finale des dégâts.
                    </p>
                    {luckAttempt ? (
                      <p className="mt-3 rounded-xl border border-line/60 bg-black/25 p-3 text-xs leading-5 text-parchment">{actionSummary(luckAttempt)}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={!canTryLuck}
                    onClick={() => tryLuckInCombat(m)}
                    className={`rounded-xl border px-3 py-4 text-sm font-bold ${canTryLuck ? "border-gold/50 bg-gold/25 text-gold2" : "border-line bg-black/20 text-muted opacity-60"}`}
                  >
                    Tenter
                  </button>
                  <button
                    type="button"
                    onClick={() => confirmTurn(m.id)}
                    className="rounded-xl border border-line bg-black/20 px-3 py-4 text-sm font-bold text-parchment"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            ) : null}

            <div className="rounded-2xl border border-line/70 bg-black/20 p-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-xs uppercase tracking-wide text-gold2">Impact à appliquer</h3>
                {damageActions.length > 0 ? <span className="text-xs text-muted">{damageActions.length} effet</span> : null}
              </div>
              <div className="mt-2 space-y-2">
                {damageActions.length === 0 ? (
                  <p className="text-sm text-muted">Aucun dégât pour cet assaut.</p>
                ) : (
                  damageActions.map((action) => (
                    <div key={action.id} className="rounded-xl border border-line/60 bg-black/25 p-3 text-xs leading-5 text-muted">
                      {actionSummary(action)}
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setToolsOpen((value) => !value)}
              className="w-full rounded-xl border border-line bg-black/20 px-4 py-3 text-sm font-semibold text-muted"
            >
              {toolsOpen ? "Masquer les outils avancés" : "Outils avancés"}
            </button>

            {toolsOpen ? (
              <div className="grid grid-cols-2 gap-2 rounded-2xl border border-line/60 bg-black/15 p-2">
                <button onClick={() => setDialog({ type: "stat", monster: m })} className="rounded-xl border border-line bg-black/20 px-3 py-3 text-sm text-gold2">❤️ Ajuster stat</button>
                <button onClick={() => setDialog({ type: "item", monster: m })} className="rounded-xl border border-line bg-black/20 px-3 py-3 text-sm text-gold2">🎒 Objet</button>
                <button onClick={() => setDialog({ type: "note", monster: m })} className="rounded-xl border border-line bg-black/20 px-3 py-3 text-sm text-gold2">📝 Note</button>
                <button onClick={() => setDialog({ type: "roll", monster: m, action: true })} className="rounded-xl border border-line bg-black/20 px-3 py-3 text-sm text-gold2">🎲 Jet secondaire</button>
              </div>
            ) : null}

            {extraActions.length > 0 ? (
              <div className="space-y-2">
                <h3 className="font-serif text-xs uppercase tracking-wide text-gold2">Journal de l’assaut</h3>
                {extraActions.map((action) => (
                  <div key={action.id} className="flex items-start justify-between gap-2 rounded-xl border border-line/60 bg-black/25 p-3 text-xs leading-5 text-muted">
                    <span>{actionSummary(action)}</span>
                    <button onClick={() => removeAction(m.id, action.id)} className="shrink-0 text-red-200">×</button>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => cancelTurn(m.id)} className="rounded-xl border border-line py-3 text-sm text-muted">Annuler</button>
              <button onClick={() => confirmTurn(m.id)} className="rounded-xl border border-gold/40 bg-gold/20 py-3 font-semibold text-gold2">Appliquer l’assaut</button>
            </div>
          </div>
        )}

        {(m.combatLog ?? []).length > 0 && (
          <div className="space-y-2">
            <h3 className="font-serif text-xs uppercase tracking-wide text-gold2">Derniers assauts</h3>
            {(m.combatLog ?? []).slice(0, 3).map((entry, index) => (
              <RoundHistoryLine key={entry.id} entry={entry} monsterName={m.name} number={(m.combatLog ?? []).length - index} />
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-line/60 bg-black/25 px-2 py-2">
      <p className="font-serif text-[0.62rem] uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-base font-black text-gold2">{value}</p>
    </div>
  );
}

function DiceFace({ value, tone }: { value: number; tone: "hero" | "enemy" }) {
  return (
    <span className={`grid h-9 w-9 place-items-center rounded-xl border text-lg font-black shadow-inner ${tone === "hero" ? "border-emerald-400/40 bg-emerald-900/50 text-emerald-100" : "border-red-400/40 bg-red-950/60 text-red-100"}`}>
      {value}
    </span>
  );
}

function DiceResultCard({
  title,
  rolls,
  diceTotal,
  bonusLabel,
  bonus,
  total,
  tone,
}: {
  title: string;
  rolls: number[];
  diceTotal: number;
  bonusLabel: string;
  bonus: number;
  total: number;
  tone: "hero" | "enemy";
}) {
  return (
    <div className="rounded-2xl border border-line/60 bg-black/25 p-3 text-center">
      <p className="text-xs font-bold uppercase tracking-wide text-muted">{title}</p>
      <div className="mt-3 flex justify-center gap-2">
        {rolls.map((roll, index) => <DiceFace key={`${title}-${index}-${roll}`} value={roll} tone={tone} />)}
      </div>
      <p className="mt-3 text-sm text-parchment">{rolls.join(" + ") || "—"} = {diceTotal}</p>
      <p className="text-xs text-muted">+ {bonus} {bonusLabel}</p>
      <p className={`mt-2 font-serif text-2xl font-black ${tone === "hero" ? "text-emerald-200" : "text-red-200"}`}>{total}</p>
    </div>
  );
}

function RoundHistoryLine({ entry, monsterName, number }: { entry: CombatRound; monsterName: string; number: number }) {
  const outcome = entry.outcome === "hero" ? "Victoire" : entry.outcome === "enemy" ? "Blessure" : entry.outcome === "tie" ? "Égalité" : "Action";
  return (
    <div className="rounded-xl border border-line/60 bg-black/20 p-3 text-xs text-muted">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold text-parchment">Assaut {number}</p>
        <span className="text-gold2">{outcome}</span>
      </div>
      {entry.heroAttackTotal !== undefined && entry.enemyAttackTotal !== undefined ? (
        <p className="mt-1">Vous {entry.heroAttackTotal} · {monsterName} {entry.enemyAttackTotal}</p>
      ) : (
        <p className="mt-1">{entry.diceCount}d{entry.diceSides} = {entry.total}</p>
      )}
    </div>
  );
}

function CompletedCombatCard({ monster }: { monster: Monster }) {
  const status = monster.combatResult === "victory" ? "Vaincu" : monster.combatResult === "defeat" ? "Mort" : "Interrompu";
  const statusClass = monster.combatResult === "victory"
    ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-200"
    : monster.combatResult === "defeat"
      ? "border-red-500/40 bg-red-950/30 text-red-200"
      : "border-line bg-black/20 text-muted";
  return (
    <div className="rounded-2xl border border-line/70 bg-black/20 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl border border-line/60 bg-black/30 text-2xl">
            {monster.combatResult === "defeat" ? <Skull size={22} /> : "👺"}
          </div>
          <div>
            <p className="font-semibold text-parchment">{monster.name}</p>
            <p className="text-xs text-muted">{monster.sourceParagraph ? `§ ${monster.sourceParagraph}` : "Sans paragraphe"} · {(monster.combatLog ?? []).length} assaut(s)</p>
          </div>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}>
          {status} {monster.combatResult === "victory" ? <CheckCircle2 className="inline" size={13} /> : null}
        </span>
      </div>
      {(monster.combatLog ?? []).slice(0, 2).map((entry, index) => (
        <RoundHistoryLine key={entry.id} entry={entry} monsterName={monster.name} number={(monster.combatLog ?? []).length - index} />
      ))}
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
