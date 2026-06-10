"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Adventure, JourneyChoice, JourneyEvent, JourneyNode, JourneyTag } from "@/lib/types";
import { Header } from "@/components/ui/Header";
import { AdventureStatusBar } from "@/components/ui/AdventureStatusBar";
import { StickyHeaderGroup } from "@/components/ui/StickyHeaderGroup";
import { Panel } from "@/components/ui/Panel";

const TAGS: { id: JourneyTag; label: string; icon: string }[] = [
  { id: "death", label: "Mort", icon: "☠️" },
  { id: "combat", label: "Combat", icon: "⚔️" },
  { id: "dice", label: "Dé", icon: "🎲" },
  { id: "spell", label: "Sort", icon: "🧙" },
  { id: "item", label: "Objet", icon: "🎒" },
  { id: "important", label: "Important", icon: "⭐" },
  { id: "key", label: "Clé", icon: "🔑" },
  { id: "secret", label: "Secret", icon: "🚪" },
  { id: "danger", label: "Danger", icon: "⚠️" },
];

const tagIcon = (tag: JourneyTag) => TAGS.find((item) => item.id === tag)?.icon ?? "•";
const tagLabel = (tag: JourneyTag) => TAGS.find((item) => item.id === tag)?.label ?? tag;

function formatVisitDate(value: string) {
  try {
    return new Intl.DateTimeFormat("fr-CA", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function choiceStatus(choice: JourneyChoice, currentNode: JourneyNode, nodes: JourneyNode[]) {
  const child = nodes.find(
    (node) => node.parentId === currentNode.id && node.paragraph === choice.to,
  );
  if (!child) return { icon: "?", label: "Inconnu", className: "text-muted" };
  if (child.tags.includes("death")) return { icon: "☠️", label: "Mort", className: "text-red-200" };
  if (child.tags.includes("danger")) return { icon: "⚠️", label: "Danger", className: "text-amber-200" };
  if (child.tags.includes("important")) return { icon: "⭐", label: "Important", className: "text-gold2" };
  return { icon: "✓", label: "Visité", className: "text-emerald-200" };
}

type Props = {
  adventure: Adventure;
  onHeroClick: () => void;
  onLibrary: () => void;
  onOptions: () => void;
  onGoToParagraph: (paragraph: number) => void;
  onAddChoice: (paragraph: number) => void;
  onRemoveChoice: (choiceId: string) => void;
  onToggleTag: (tag: JourneyTag) => void;
  onCreateEvent: (tag: JourneyTag) => void;
  onOpenEvent: (event: JourneyEvent) => void;
  onUpdateNotes: (notes: string) => void;
};

export function JourneyScreen({
  adventure,
  onHeroClick,
  onLibrary,
  onOptions,
  onGoToParagraph,
  onAddChoice,
  onRemoveChoice,
  onCreateEvent,
  onOpenEvent,
  onUpdateNotes,
}: Props) {
  const journey = adventure.journey;
  const currentNode =
    journey.nodes.find((node) => node.id === journey.currentNodeId) ??
    journey.nodes[0] ??
    {
      id: "fallback",
      paragraph: adventure.paragraph || 1,
      notes: "",
      tags: [],
      events: [],
      visitedAt: new Date().toISOString(),
      choices: [],
    };
  const currentChoices = currentNode.choices ?? [];
  const currentEvents = currentNode.events ?? [];
  const [choiceParagraph, setChoiceParagraph] = useState("");
  const [selectedNode, setSelectedNode] = useState<JourneyNode | null>(null);

  const childrenByParent = useMemo(() => {
    const map = new Map<string, JourneyNode[]>();
    for (const node of journey.nodes) {
      if (!node.parentId) continue;
      const children = map.get(node.parentId) ?? [];
      children.push(node);
      map.set(node.parentId, children);
    }
    return map;
  }, [journey.nodes]);

  const roots = journey.nodes.filter((node) => !node.parentId);

  const addChoice = () => {
    const value = Number(choiceParagraph);
    if (!Number.isFinite(value) || value <= 0) return;
    onAddChoice(Math.floor(value));
    setChoiceParagraph("");
  };

  const renderNodeBadge = (
    paragraph: number,
    iconArea: ReactNode,
    active = false,
    dashed = false,
    onClick?: () => void,
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition active:scale-[0.99] ${
        active
          ? "border-gold/60 bg-gold/15 text-parchment shadow-[0_0_18px_rgba(218,165,32,0.12)]"
          : dashed
            ? "border-dashed border-line/60 bg-black/10 text-muted"
            : "border-line/70 bg-black/20 text-muted"
      }`}
    >
      <span className="font-serif text-lg font-bold leading-none">§{paragraph}</span>
      {active ? <span className="rounded-full bg-gold/15 px-2 py-1 text-[10px] uppercase tracking-widest text-gold2">actuel</span> : null}
      {iconArea ? <span className="flex min-w-0 items-center gap-1 text-sm">{iconArea}</span> : null}
    </button>
  );

  const renderChoiceLine = (choice: JourneyChoice) => {
    const status = choiceStatus(choice, currentNode, journey.nodes);
    return (
      <div key={choice.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <button
          type="button"
          onClick={() => onGoToParagraph(choice.to)}
          className="rounded-xl border border-line/70 bg-black/20 px-3 py-2 font-serif text-lg font-bold text-parchment active:scale-[0.99]"
        >
          → §{choice.to}
        </button>
        <button
          type="button"
          onClick={() => onGoToParagraph(choice.to)}
          className={`min-w-0 justify-self-start rounded-xl border border-line/60 bg-white/5 px-3 py-2 text-sm font-semibold active:scale-[0.99] ${status.className}`}
        >
          <span className="mr-1">{status.icon}</span>
          {status.label}
        </button>
        <button
          type="button"
          onClick={() => onRemoveChoice(choice.id)}
          className="rounded-xl border border-line/70 bg-black/20 px-3 py-2 text-sm text-muted active:scale-[0.98]"
          aria-label="Supprimer ce choix"
        >
          ×
        </button>
      </div>
    );
  };

  const renderEventPill = (event: JourneyEvent) => (
    <button
      key={event.id}
      type="button"
      onClick={() => onOpenEvent(event)}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-line/70 bg-black/20 px-3 py-2 text-left active:scale-[0.99]"
    >
      <span className="min-w-0 truncate text-sm text-parchment">
        <span className="mr-2">{tagIcon(event.kind)}</span>
        {event.label}
      </span>
      {event.result ? <span className="shrink-0 text-xs text-gold2">{event.result}</span> : null}
    </button>
  );

  const renderTreeChoice = (parentNode: JourneyNode, choice: JourneyChoice) => {
    const child = (childrenByParent.get(parentNode.id) ?? []).find(
      (item) => item.paragraph === choice.to,
    );

    if (child) return renderTreeNode(child);

    const status = choiceStatus(choice, parentNode, journey.nodes);
    return (
      <div key={`choice-${choice.id}`} className="relative flex flex-col items-center">
        <div className="h-4 border-l border-gold/35" />
        {renderNodeBadge(
          choice.to,
          <span className={status.className}>{status.icon}</span>,
          false,
          true,
          () => {
            onGoToParagraph(choice.to);
            setSelectedNode(null);
          },
        )}
      </div>
    );
  };

  const renderTreeNode = (node: JourneyNode): ReactNode => {
    const children = childrenByParent.get(node.id) ?? [];
    const isCurrent = node.id === journey.currentNodeId;
    const choices = node.choices ?? [];
    const events = node.events ?? [];
    const icons = (
      <>
        {node.notes.trim() ? <span title="Note">📝</span> : null}
        {events.slice(0, 4).map((event) => (
          <span key={event.id} title={event.label}>{tagIcon(event.kind)}</span>
        ))}
        {node.tags.filter((tag) => !events.some((event) => event.kind === tag)).map((tag) => (
          <span key={tag} title={tagLabel(tag)}>{tagIcon(tag)}</span>
        ))}
      </>
    );

    const choiceTargets = new Set(choices.map((choice) => choice.to));
    const orphanChildren = children.filter((child) => !choiceTargets.has(child.paragraph));
    const branches: ReactNode[] = [
      ...choices.map((choice) => renderTreeChoice(node, choice)),
      ...orphanChildren.map((child) => renderTreeNode(child)),
    ];

    return (
      <div key={node.id} className="relative inline-flex flex-col items-center">
        {renderNodeBadge(node.paragraph, icons, isCurrent, false, () => setSelectedNode(node))}

        {branches.length ? (
          <div className="relative mt-0 flex flex-col items-center">
            <div className="h-5 border-l border-gold/40" />
            <div className="relative flex items-start justify-center gap-4 px-2">
              {branches.length > 1 ? (
                <div className="absolute left-1/2 top-0 h-px -translate-x-1/2 border-t border-gold/35" style={{ width: `calc(100% - 2rem)` }} />
              ) : null}
              {branches.map((branch, index) => (
                <div key={index} className="relative flex min-w-[5.5rem] flex-col items-center">
                  {branches.length > 1 ? <div className="h-4 border-l border-gold/35" /> : null}
                  {branch}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <StickyHeaderGroup>
        <Header title="Parcours" back={onLibrary} onOptions={onOptions} />
        <AdventureStatusBar adventure={adventure} onHeroClick={onHeroClick} />
      </StickyHeaderGroup>

      <div className="space-y-4 p-4">
        <Panel className="space-y-4 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-serif text-xs uppercase tracking-widest text-gold2">Paragraphe actuel</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="font-serif text-5xl text-parchment">§{currentNode.paragraph}</p>
                <span className="rounded-full border border-gold/30 bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold2">Actuel</span>
              </div>
              <p className="mt-1 text-xs text-muted">Dernière visite : {formatVisitDate(currentNode.visitedAt)}</p>
            </div>
          </div>

          <div>
            <p className="mb-2 font-serif text-xs uppercase tracking-widest text-gold2">Ajouter un événement</p>
            <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TAGS.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => onCreateEvent(tag.id)}
                  className="shrink-0 rounded-xl border border-line/70 bg-black/20 px-3 py-2 text-sm text-muted transition active:scale-[0.98]"
                  title={tag.label}
                >
                  <span className="mr-1">{tag.icon}</span>
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {currentEvents.length ? (
            <div>
              <p className="mb-2 font-serif text-xs uppercase tracking-widest text-gold2">Événements liés</p>
              <div className="space-y-2">{currentEvents.map((event) => renderEventPill(event))}</div>
            </div>
          ) : null}

          <div>
            <label className="mb-2 block font-serif text-xs uppercase tracking-widest text-gold2">Notes du paragraphe</label>
            <textarea
              value={currentNode.notes}
              onChange={(event) => onUpdateNotes(event.target.value)}
              rows={3}
              placeholder="Ex. Marchand rencontré, objet requis, piège, mot de passe…"
              className="w-full resize-none rounded-2xl border border-line bg-black/25 px-4 py-3 text-sm leading-6 text-parchment outline-none placeholder:text-muted"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="font-serif text-xs uppercase tracking-widest text-gold2">Choix proposés</p>
              <p className="text-xs text-muted">{currentChoices.length} choix</p>
            </div>

            {currentChoices.length ? (
              <div className="space-y-2 rounded-2xl border border-line/50 bg-black/10 p-3">
                {currentChoices.map((choice) => renderChoiceLine(choice))}
              </div>
            ) : null}

            <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
              <input
                value={choiceParagraph}
                onChange={(event) => setChoiceParagraph(event.target.value)}
                inputMode="numeric"
                placeholder="Ajouter un choix vers §…"
                className="min-w-0 rounded-2xl border border-line bg-black/25 px-4 py-3 text-parchment outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={addChoice}
                className="rounded-2xl border border-gold/30 bg-gold/15 px-4 py-3 font-semibold text-gold2 active:scale-[0.98]"
              >
                Ajouter
              </button>
            </div>
          </div>
        </Panel>

        <Panel className="p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-sm uppercase tracking-wide text-gold2">Arbre de parcours</h2>
            </div>
            <p className="rounded-full border border-line/70 bg-black/20 px-3 py-1 text-xs text-muted">
              {journey.nodes.length} §
            </p>
          </div>

          <div className="max-h-[34rem] overflow-auto rounded-2xl border border-line/40 bg-black/10 p-4">
            <div className="flex min-w-max justify-center gap-8">{roots.map((node) => renderTreeNode(node))}</div>
          </div>
        </Panel>
      </div>

      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/60 p-4" onClick={() => setSelectedNode(null)}>
          <div
            className="max-h-[82vh] w-full overflow-auto rounded-t-3xl border border-line bg-night p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-serif text-3xl text-parchment">§{selectedNode.paragraph}</p>
                <p className="text-xs text-muted">Visité : {formatVisitDate(selectedNode.visitedAt)}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="rounded-full border border-line bg-black/20 px-3 py-2 text-sm text-muted"
              >
                Fermer
              </button>
            </div>

            <div className="mb-4 space-y-2">
              {(selectedNode.events ?? []).length ? (selectedNode.events ?? []).map((event) => renderEventPill(event)) : <span className="text-sm text-muted">Aucun événement lié.</span>}
            </div>

            <div className="mb-4 rounded-2xl border border-line/70 bg-black/20 p-3 text-sm leading-6 text-parchment">
              {selectedNode.notes.trim() || "Aucune note pour ce paragraphe."}
            </div>

            <div>
              <p className="mb-2 font-serif text-xs uppercase tracking-widest text-gold2">Choix proposés</p>
              <div className="space-y-2">
                {(selectedNode.choices ?? []).length ? (selectedNode.choices ?? []).map((choice) => {
                  const status = choiceStatus(choice, selectedNode, journey.nodes);
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => {
                        setSelectedNode(null);
                        onGoToParagraph(choice.to);
                      }}
                      className="flex w-full items-center justify-between rounded-xl border border-line/70 bg-black/20 px-3 py-2 text-left active:scale-[0.99]"
                    >
                      <span className="font-serif text-base font-bold text-parchment">→ §{choice.to}</span>
                      <span className={`text-sm ${status.className}`}>{status.icon} {status.label}</span>
                    </button>
                  );
                }) : <p className="text-sm text-muted">Aucun choix enregistré.</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
