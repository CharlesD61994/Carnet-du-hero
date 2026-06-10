"use client";

import { useEffect, useMemo, useState } from "react";
import type { Adventure, Category, DiceRoll, Item, JourneyEvent, JourneyNode, JourneyTag, Monster, NewAdventureData, Screen } from "@/lib/types";
import { makeAdventureFromData, makeInitialJourney, starter, STORAGE, uid } from "@/lib/templates";
import { BottomNav } from "@/components/navigation/BottomNav";
import { CombatScreen } from "@/components/screens/CombatScreen";
import { EditScreen } from "@/components/screens/EditScreen";
import { DiceHistoryScreen } from "@/components/screens/DiceHistoryScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { InventoryScreen } from "@/components/screens/InventoryScreen";
import { JourneyScreen } from "@/components/screens/JourneyScreen";
import { MoreScreen } from "@/components/screens/MoreScreen";
import { NewAdventureModal } from "@/components/screens/NewAdventureModal";
import { NotesScreen } from "@/components/screens/NotesScreen";
import { SheetScreen } from "@/components/screens/SheetScreen";
import { DiceSheet } from "@/components/ui/DiceSheet";

function withAdventureDefaults(adventure: Adventure): Adventure {
  const journey = adventure.journey ?? makeInitialJourney(adventure.paragraph ?? 1);

  return {
    ...adventure,
    diceConfig: adventure.diceConfig ?? { sides: 6, mode: "multiple", count: 2 },
    diceHistory: adventure.diceHistory ?? [],
    journey: {
      ...journey,
      nodes: journey.nodes.map((node) => ({
        ...node,
        choices: node.choices ?? [],
        events: node.events ?? [],
      })),
    },
  };
}

const todayIso = () => new Date().toISOString();

export default function CarnetApp() {
  const [ready, setReady] = useState(false);
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [screen, setScreen] = useState<Screen>("home");
  const [category, setCategory] = useState<Category>("Objets");
  const [dice, setDice] = useState(9);
  const [creating, setCreating] = useState(false);
  const [diceOpen, setDiceOpen] = useState(false);
  const [pendingDiceContext, setPendingDiceContext] = useState<{ nodeId: string; paragraph: number; context: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      const list = (raw ? (JSON.parse(raw) as Adventure[]) : starter()).map(withAdventureDefaults);
      setAdventures(list);
      setSelectedId(list[0]?.id ?? "");
    } catch {
      const list = starter().map(withAdventureDefaults);
      setAdventures(list);
      setSelectedId(list[0]?.id ?? "");
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE, JSON.stringify(adventures));
  }, [adventures, ready]);

  const selected = useMemo(
    () => adventures.find((a) => a.id === selectedId) ?? adventures[0],
    [adventures, selectedId],
  );

  const setSelected = (patch: Partial<Adventure>) => {
    if (!selected) return;
    setAdventures((list) =>
      list.map((a) => (a.id === selected.id ? { ...a, ...patch } : a)),
    );
  };

  const replaceSelected = (nextAdventure: Adventure) => {
    setAdventures((list) =>
      list.map((a) => (a.id === nextAdventure.id ? nextAdventure : a)),
    );
  };

  const patchJourneyNode = (nodeId: string, patcher: (node: JourneyNode) => JourneyNode) => {
    if (!selected?.journey) return;
    setSelected({
      journey: {
        ...selected.journey,
        nodes: selected.journey.nodes.map((node) =>
          node.id === nodeId ? patcher(node) : { ...node, events: node.events ?? [], choices: node.choices ?? [] },
        ),
      },
    });
  };

  const addJourneyEvent = (nodeId: string, event: JourneyEvent) => {
    patchJourneyNode(nodeId, (node) => ({
      ...node,
      events: [...(node.events ?? []), event],
      tags: node.tags.includes(event.kind) ? node.tags : [...node.tags, event.kind],
      choices: node.choices ?? [],
    }));
  };

  const createAdventure = (data: NewAdventureData) => {
    const next = makeAdventureFromData(data);
    setAdventures((list) => [next, ...list]);
    setSelectedId(next.id);
    setCreating(false);
    setScreen("journey");
  };

  const deleteAdventure = (id: string) => {
    if (!confirm("Supprimer cette aventure?")) return;

    setAdventures((list) => {
      const next = list.filter((a) => a.id !== id);
      if (next.length === 0) {
        const fresh = makeAdventureFromData({
          title: "Nouvelle aventure",
          heroName: "Héros",
          system: "Feuille personnalisée",
          diceConfig: { sides: 6, mode: "single", count: 1 },
        });
        setSelectedId(fresh.id);
        return [fresh];
      }
      setSelectedId(next[0].id);
      return next;
    });

    setScreen("home");
  };

  const updateStat = (id: string, delta: number) => {
    setSelected({
      stats: selected.stats.map((s) =>
        s.id === id ? { ...s, current: Math.max(0, s.current + delta) } : s,
      ),
    });
  };

  const updateResource = (id: string, delta: number) => {
    setSelected({
      resources: selected.resources.map((r) =>
        r.id === id ? { ...r, current: Math.max(0, r.current + delta) } : r,
      ),
    });
  };

  const numberFromPrompt = (message: string, fallback: number) => {
    const value = Number(prompt(message, String(fallback)));
    return Number.isFinite(value) ? value : fallback;
  };

  const addItem = () => {
    const name = prompt("Nom de l’objet")?.trim();
    if (!name) return;
    const icon = prompt("Icône ou emoji", "🎒")?.trim() || "🎒";
    const subtitle =
      prompt("Description courte", "Objet personnalisé")?.trim() ||
      "Objet personnalisé";
    const quantity = Math.max(1, numberFromPrompt("Quantité", 1));
    setSelected({
      items: [
        ...selected.items,
        { id: uid(), name, kind: category, quantity, subtitle, icon },
      ],
    });
  };

  const editItem = (item: Item) => {
    const name = prompt("Nom de l’objet", item.name)?.trim();
    if (!name) return;
    const icon = prompt("Icône ou emoji", item.icon)?.trim() || item.icon;
    const subtitle =
      prompt("Description courte", item.subtitle)?.trim() || item.subtitle;
    const quantity = Math.max(0, numberFromPrompt("Quantité", item.quantity));
    const kindInput = prompt(
      "Catégorie : Objets, Armes, Armures, Sorts ou Autres",
      item.kind,
    )?.trim() as Category | undefined;
    const kind =
      kindInput &&
      (["Objets", "Armes", "Armures", "Sorts", "Autres"] as string[]).includes(
        kindInput,
      )
        ? kindInput
        : item.kind;
    setSelected({
      items: selected.items.map((i) =>
        i.id === item.id ? { ...i, name, icon, subtitle, quantity, kind } : i,
      ),
    });
  };

  const deleteItem = (id: string) => {
    if (!confirm("Supprimer cet objet?")) return;
    setSelected({ items: selected.items.filter((i) => i.id !== id) });
  };

  const addNote = () => {
    const note = prompt("Nouvelle note")?.trim();
    if (!note) return;
    setSelected({ notes: [...selected.notes, note] });
  };

  const editNote = (index: number) => {
    const note = prompt("Modifier la note", selected.notes[index])?.trim();
    if (!note) return;
    setSelected({
      notes: selected.notes.map((n, i) => (i === index ? note : n)),
    });
  };

  const deleteNote = (index: number) => {
    if (!confirm("Supprimer cette note?")) return;
    setSelected({ notes: selected.notes.filter((_, i) => i !== index) });
  };

  const addMonster = () => {
    const name = prompt("Nom du monstre")?.trim();
    if (!name) return;
    const skill = Math.max(0, numberFromPrompt("Habileté", 6));
    const endurance = Math.max(1, numberFromPrompt("Endurance", 8));
    const note = prompt("Note", "")?.trim() || "";
    setSelected({
      monsters: [
        ...selected.monsters,
        {
          id: uid(),
          name,
          skill,
          endurance,
          maxEndurance: endurance,
          armor: 0,
          fear: 0,
          magic: 0,
          note,
        },
      ],
    });
  };

  const editMonster = (monster: Monster) => {
    const name = prompt("Nom du monstre", monster.name)?.trim();
    if (!name) return;
    const skill = Math.max(0, numberFromPrompt("Habileté", monster.skill));
    const maxEndurance = Math.max(
      1,
      numberFromPrompt("Endurance maximale", monster.maxEndurance),
    );
    const endurance = Math.min(
      maxEndurance,
      Math.max(0, numberFromPrompt("Endurance actuelle", monster.endurance)),
    );
    const note = prompt("Note", monster.note)?.trim() || "";
    setSelected({
      monsters: selected.monsters.map((m) =>
        m.id === monster.id
          ? { ...m, name, skill, endurance, maxEndurance, note }
          : m,
      ),
    });
  };

  const deleteMonster = (id: string) => {
    if (!confirm("Supprimer ce monstre?")) return;
    setSelected({ monsters: selected.monsters.filter((m) => m.id !== id) });
  };

  const updateMonsterEndurance = (id: string, delta: number) => {
    setSelected({
      monsters: selected.monsters.map((m) =>
        m.id === id
          ? {
              ...m,
              endurance: Math.max(
                0,
                Math.min(m.maxEndurance, m.endurance + delta),
              ),
            }
          : m,
      ),
    });
  };

  const goToParagraph = (paragraph: number) => {
    if (!selected || !Number.isFinite(paragraph) || paragraph <= 0) return;

    const targetParagraph = Math.floor(paragraph);
    const journey = selected.journey ?? makeInitialJourney(selected.paragraph ?? 1);
    const parentId = journey.currentNodeId;
    const parentNode = journey.nodes.find((node) => node.id === parentId);
    const existing = journey.nodes.find(
      (node) => node.parentId === parentId && node.paragraph === targetParagraph,
    );

    const nextNode: JourneyNode =
      existing ?? {
        id: uid(),
        paragraph: targetParagraph,
        parentId,
        notes: "",
        tags: [],
        choices: [],
        visitedAt: todayIso(),
      };

    const nodesWithChoice = journey.nodes.map((node) => {
      if (node.id !== parentId) return { ...node, choices: node.choices ?? [] };
      const choices = node.choices ?? [];
      const hasChoice = choices.some((choice) => choice.to === targetParagraph);
      return {
        ...node,
        choices: hasChoice
          ? choices
          : [...choices, { id: uid(), to: targetParagraph, createdAt: todayIso() }],
      };
    });

    setSelected({
      paragraph: targetParagraph,
      journey: {
        currentNodeId: nextNode.id,
        nodes: existing ? nodesWithChoice : [...nodesWithChoice, nextNode],
      },
    });
  };

  const addJourneyChoice = (paragraph: number) => {
    if (!selected?.journey || !Number.isFinite(paragraph) || paragraph <= 0) return;
    const targetParagraph = Math.floor(paragraph);
    const currentNodeId = selected.journey.currentNodeId;

    setSelected({
      journey: {
        ...selected.journey,
        nodes: selected.journey.nodes.map((node) => {
          const choices = node.choices ?? [];
          if (node.id !== currentNodeId) return { ...node, choices };
          if (choices.some((choice) => choice.to === targetParagraph)) return { ...node, choices };
          return {
            ...node,
            choices: [...choices, { id: uid(), to: targetParagraph, createdAt: todayIso() }],
          };
        }),
      },
    });
  };

  const removeJourneyChoice = (choiceId: string) => {
    if (!selected?.journey) return;
    setSelected({
      journey: {
        ...selected.journey,
        nodes: selected.journey.nodes.map((node) => ({
          ...node,
          choices: (node.choices ?? []).filter((choice) => choice.id !== choiceId),
        })),
      },
    });
  };

  const setCurrentJourneyNotes = (notes: string) => {
    if (!selected?.journey) return;
    setSelected({
      journey: {
        ...selected.journey,
        nodes: selected.journey.nodes.map((node) =>
          node.id === selected.journey.currentNodeId ? { ...node, notes } : node,
        ),
      },
    });
  };

  const toggleCurrentJourneyTag = (tag: JourneyTag) => {
    if (!selected?.journey) return;
    setSelected({
      journey: {
        ...selected.journey,
        nodes: selected.journey.nodes.map((node) => {
          if (node.id !== selected.journey.currentNodeId) return node;
          const hasTag = node.tags.includes(tag);
          return {
            ...node,
            tags: hasTag ? node.tags.filter((value) => value !== tag) : [...node.tags, tag],
          };
        }),
      },
    });
  };


  const createJourneyEvent = (kind: JourneyTag) => {
    if (!selected?.journey) return;
    const nodeId = selected.journey.currentNodeId;
    const node = selected.journey.nodes.find((item) => item.id === nodeId);
    const paragraph = node?.paragraph ?? selected.paragraph;
    const createdAt = todayIso();

    if (kind === "dice") {
      const context = prompt("Contexte du lancer de dé", "")?.trim();
      if (!context) return;
      setPendingDiceContext({ nodeId, paragraph, context });
      setDiceOpen(true);
      return;
    }

    if (kind === "item" || kind === "key" || kind === "spell") {
      const defaultIcon = kind === "key" ? "🔑" : kind === "spell" ? "🧙" : "🎒";
      const defaultKind: Category = kind === "spell" ? "Sorts" : "Objets";
      const name = prompt(kind === "spell" ? "Nom du sort" : "Nom de l’objet")?.trim();
      if (!name) return;
      const icon = prompt("Icône ou emoji", defaultIcon)?.trim() || defaultIcon;
      const subtitle = prompt("Description courte", kind === "key" ? "Objet clé" : "Trouvé au paragraphe")?.trim() || `Trouvé au §${paragraph}`;
      const quantity = Math.max(1, numberFromPrompt("Quantité", 1));
      const item: Item = {
        id: uid(),
        name,
        kind: defaultKind,
        quantity,
        subtitle,
        icon,
        sourceParagraph: paragraph,
        sourceNodeId: nodeId,
      };
      setSelected({
        items: [...selected.items, item],
        journey: {
          ...selected.journey,
          nodes: selected.journey.nodes.map((current) =>
            current.id === nodeId
              ? {
                  ...current,
                  tags: current.tags.includes(kind) ? current.tags : [...current.tags, kind],
                  events: [
                    ...(current.events ?? []),
                    { id: uid(), kind, label: name, refId: item.id, createdAt },
                  ],
                }
              : { ...current, events: current.events ?? [], choices: current.choices ?? [] },
          ),
        },
      });
      setCategory(item.kind);
      setScreen("inventory");
      return;
    }

    if (kind === "combat") {
      const name = prompt("Nom du monstre")?.trim();
      if (!name) return;
      const skill = Math.max(0, numberFromPrompt("Habileté", 6));
      const endurance = Math.max(1, numberFromPrompt("Endurance", 8));
      const note = prompt("Note", `Rencontré au §${paragraph}`)?.trim() || `Rencontré au §${paragraph}`;
      const monster: Monster = {
        id: uid(),
        name,
        skill,
        endurance,
        maxEndurance: endurance,
        armor: 0,
        fear: 0,
        magic: 0,
        note,
        sourceParagraph: paragraph,
        sourceNodeId: nodeId,
        combatResult: "pending",
      };
      setSelected({
        monsters: [...selected.monsters, monster],
        journey: {
          ...selected.journey,
          nodes: selected.journey.nodes.map((current) =>
            current.id === nodeId
              ? {
                  ...current,
                  tags: current.tags.includes("combat") ? current.tags : [...current.tags, "combat"],
                  events: [
                    ...(current.events ?? []),
                    { id: uid(), kind: "combat", label: name, refId: monster.id, createdAt, result: "En cours" },
                  ],
                }
              : { ...current, events: current.events ?? [], choices: current.choices ?? [] },
          ),
        },
      });
      setScreen("combat");
      return;
    }

    const labels: Record<JourneyTag, string> = {
      death: "Mort",
      combat: "Combat",
      dice: "Dé",
      spell: "Sort",
      item: "Objet",
      important: "Important",
      key: "Clé",
      secret: "Secret",
      danger: "Danger",
    };
    const label = prompt("Description de l’événement", labels[kind])?.trim() || labels[kind];
    addJourneyEvent(nodeId, { id: uid(), kind, label, createdAt });
  };

  const openJourneyEvent = (event: JourneyEvent) => {
    if (event.kind === "item" || event.kind === "key" || event.kind === "spell") {
      const item = selected.items.find((candidate) => candidate.id === event.refId);
      if (item) setCategory(item.kind);
      setScreen("inventory");
      return;
    }
    if (event.kind === "combat") {
      setScreen("combat");
      return;
    }
    if (event.kind === "dice") {
      setScreen("diceHistory");
      return;
    }
  };

  const addDiceRoll = (roll: DiceRoll) => {
    const enrichedRoll: DiceRoll = pendingDiceContext
      ? {
          ...roll,
          context: pendingDiceContext.context,
          sourceParagraph: pendingDiceContext.paragraph,
          sourceNodeId: pendingDiceContext.nodeId,
        }
      : roll;

    if (pendingDiceContext && selected?.journey) {
      setSelected({
        diceHistory: [enrichedRoll, ...(selected.diceHistory ?? [])].slice(0, 100),
        journey: {
          ...selected.journey,
          nodes: selected.journey.nodes.map((node) =>
            node.id === pendingDiceContext.nodeId
              ? {
                  ...node,
                  tags: node.tags.includes("dice") ? node.tags : [...node.tags, "dice"],
                  events: [
                    ...(node.events ?? []),
                    {
                      id: uid(),
                      kind: "dice",
                      label: pendingDiceContext.context,
                      refId: enrichedRoll.id,
                      createdAt: enrichedRoll.createdAt,
                      result: `${enrichedRoll.count}d${enrichedRoll.sides} = ${enrichedRoll.total}`,
                    },
                  ],
                }
              : { ...node, events: node.events ?? [], choices: node.choices ?? [] },
          ),
        },
      });
      return;
    }

    setSelected({
      diceHistory: [enrichedRoll, ...(selected.diceHistory ?? [])].slice(0, 100),
    });
  };

  const roll = () =>
    setDice(Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2);

  if (!ready || !selected)
    return (
      <main className="grimoire-bg min-h-screen p-6 text-parchment">
        Chargement…
      </main>
    );

  return (
    <main className={`grimoire-bg texture min-h-screen text-parchment ${screen === "home" ? "pb-0" : "pb-[calc(5.25rem+env(safe-area-inset-bottom))]"}`}>
      <div className="mx-auto min-h-screen max-w-md border-x border-line/40 bg-night/60 shadow-2xl">
        {screen === "home" && (
          <HomeScreen
            adventures={adventures}
            selectedId={selectedId}
            select={(id) => {
              setSelectedId(id);
              setScreen("journey");
            }}
            create={() => setCreating(true)}
          />
        )}
        {screen === "journey" && (
          <JourneyScreen
            adventure={selected}
            onHeroClick={() => setScreen("sheet")}
            onLibrary={() => setScreen("home")}
            onOptions={() => setScreen("more")}
            onGoToParagraph={goToParagraph}
            onAddChoice={addJourneyChoice}
            onRemoveChoice={removeJourneyChoice}
            onToggleTag={toggleCurrentJourneyTag}
            onCreateEvent={createJourneyEvent}
            onOpenEvent={openJourneyEvent}
            onUpdateNotes={setCurrentJourneyNotes}
          />
        )}
        {screen === "sheet" && (
          <SheetScreen
            adventure={selected}
            updateStat={updateStat}
            updateResource={updateResource}
            edit={() => setScreen("edit")}
            onLibrary={() => setScreen("home")}
            onOptions={() => setScreen("more")}
          />
        )}
        {screen === "inventory" && (
          <InventoryScreen
            adventure={selected}
            onHeroClick={() => setScreen("sheet")}
            onLibrary={() => setScreen("home")}
            onOptions={() => setScreen("more")}
            category={category}
            setCategory={setCategory}
            addItem={addItem}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        )}
        {screen === "combat" && (
          <CombatScreen
            adventure={selected}
            onHeroClick={() => setScreen("sheet")}
            onLibrary={() => setScreen("home")}
            onOptions={() => setScreen("more")}
            dice={dice}
            roll={roll}
            addMonster={addMonster}
            editMonster={editMonster}
            deleteMonster={deleteMonster}
            updateMonsterEndurance={updateMonsterEndurance}
          />
        )}
        {screen === "diceHistory" && (
          <DiceHistoryScreen
            adventure={selected}
            onHeroClick={() => setScreen("sheet")}
            onLibrary={() => setScreen("home")}
            onOptions={() => setScreen("more")}
          />
        )}
        {screen === "notes" && (
          <NotesScreen
            adventure={selected}
            onHeroClick={() => setScreen("sheet")}
            onLibrary={() => setScreen("home")}
            onOptions={() => setScreen("more")}
            addNote={addNote}
            editNote={editNote}
            deleteNote={deleteNote}
          />
        )}
        {screen === "more" && (
          <MoreScreen
            adventure={selected}
            setScreen={setScreen}
            onHeroClick={() => setScreen("sheet")}
            onLibrary={() => setScreen("home")}
          />
        )}
        {screen === "edit" && (
          <EditScreen
            adventure={selected}
            save={(a) => {
              replaceSelected(a);
              setScreen("sheet");
            }}
            deleteAdventure={() => deleteAdventure(selected.id)}
            onLibrary={() => setScreen("home")}
          />
        )}
      </div>

      {creating && (
        <NewAdventureModal
          onCancel={() => setCreating(false)}
          onCreate={createAdventure}
        />
      )}
      {screen !== "home" && <BottomNav screen={screen} setScreen={setScreen} onDice={() => setDiceOpen(true)} />}
      {diceOpen && (
        <DiceSheet
          adventure={selected}
          context={pendingDiceContext?.context}
          sourceParagraph={pendingDiceContext?.paragraph}
          onClose={() => {
            setDiceOpen(false);
            setPendingDiceContext(null);
          }}
          onRoll={addDiceRoll}
        />
      )}
    </main>
  );
}
