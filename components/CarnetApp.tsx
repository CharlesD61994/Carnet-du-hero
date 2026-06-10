"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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


type ModalField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select";
  value?: string;
  placeholder?: string;
  options?: string[];
};

type FormModalState = {
  title: string;
  description?: string;
  submitLabel?: string;
  fields: ModalField[];
};

type FormModalProps = FormModalState & {
  onCancel: () => void;
  onSubmit: (values: Record<string, string>) => void;
};

function ThemedFormModal({
  title,
  description,
  submitLabel = "Enregistrer",
  fields,
  onCancel,
  onSubmit,
}: FormModalProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((field) => [field.name, field.value ?? ""])),
  );

  const update = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end bg-black/70 px-4 pb-4 pt-20 backdrop-blur-sm">
      <div className="w-full max-h-[82vh] overflow-auto rounded-t-3xl border border-gold/25 bg-night p-4 shadow-2xl">
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

        <div className="space-y-4">
          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="mb-2 block font-serif text-xs uppercase tracking-widest text-gold2">
                {field.label}
              </span>
              {field.type === "textarea" ? (
                <textarea
                  value={values[field.name] ?? ""}
                  onChange={(event) => update(field.name, event.target.value)}
                  rows={6}
                  placeholder={field.placeholder}
                  className="w-full resize-y rounded-2xl border border-line bg-black/25 px-4 py-3 text-sm leading-6 text-parchment outline-none placeholder:text-muted focus:border-gold/50"
                />
              ) : field.type === "select" ? (
                <select
                  value={values[field.name] ?? ""}
                  onChange={(event) => update(field.name, event.target.value)}
                  className="w-full rounded-2xl border border-line bg-black/25 px-4 py-3 text-sm text-parchment outline-none focus:border-gold/50"
                >
                  {(field.options ?? []).map((option) => (
                    <option key={option} value={option} className="bg-night text-parchment">
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  value={values[field.name] ?? ""}
                  onChange={(event) => update(field.name, event.target.value)}
                  type={field.type === "number" ? "number" : "text"}
                  inputMode={field.type === "number" ? "numeric" : undefined}
                  placeholder={field.placeholder}
                  className="w-full rounded-2xl border border-line bg-black/25 px-4 py-3 text-sm text-parchment outline-none placeholder:text-muted focus:border-gold/50"
                />
              )}
            </label>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-line bg-black/25 px-4 py-3 font-semibold text-muted active:scale-[0.98]"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={() => onSubmit(values)}
            className="rounded-2xl border border-gold/40 bg-gold/20 px-4 py-3 font-semibold text-gold2 active:scale-[0.98]"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const [formModal, setFormModal] = useState<FormModalState | null>(null);
  const formResolver = useRef<((values: Record<string, string> | null) => void) | null>(null);

  const requestForm = (modal: FormModalState) =>
    new Promise<Record<string, string> | null>((resolve) => {
      formResolver.current = resolve;
      setFormModal(modal);
    });

  const closeForm = (values: Record<string, string> | null) => {
    const resolver = formResolver.current;
    formResolver.current = null;
    setFormModal(null);
    resolver?.(values);
  };

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

  const requestNumber = async (label: string, fallback: number) => {
    const values = await requestForm({
      title: label,
      fields: [{ name: "value", label, type: "number", value: String(fallback) }],
    });
    const value = Number(values?.value);
    return Number.isFinite(value) ? value : fallback;
  };

  const addItem = async () => {
    const values = await requestForm({
      title: "Ajouter un objet",
      description: "Entre les informations comme tu les noterais sur ta feuille.",
      fields: [
        { name: "name", label: "Nom", placeholder: "Ex. Clé d’argent" },
        { name: "icon", label: "Icône ou emoji", value: "🎒" },
        { name: "subtitle", label: "Description", type: "textarea", value: "Objet personnalisé" },
        { name: "quantity", label: "Quantité", type: "number", value: "1" },
      ],
    });
    const name = values?.name.trim();
    if (!name) return;
    const icon = values?.icon.trim() || "🎒";
    const subtitle = values?.subtitle.trim() || "Objet personnalisé";
    const quantity = Math.max(1, Number(values?.quantity) || 1);
    setSelected({
      items: [
        ...selected.items,
        { id: uid(), name, kind: category, quantity, subtitle, icon },
      ],
    });
  };

  const editItem = async (item: Item) => {
    const values = await requestForm({
      title: "Modifier l’objet",
      fields: [
        { name: "name", label: "Nom", value: item.name },
        { name: "icon", label: "Icône ou emoji", value: item.icon },
        { name: "subtitle", label: "Description", type: "textarea", value: item.subtitle },
        { name: "quantity", label: "Quantité", type: "number", value: String(item.quantity) },
        { name: "kind", label: "Catégorie", type: "select", value: item.kind, options: ["Objets", "Armes", "Armures", "Sorts", "Autres"] },
      ],
    });
    const name = values?.name.trim();
    if (!name) return;
    const icon = values?.icon.trim() || item.icon;
    const subtitle = values?.subtitle.trim() || item.subtitle;
    const quantity = Math.max(0, Number(values?.quantity) || 0);
    const kind = (["Objets", "Armes", "Armures", "Sorts", "Autres"] as string[]).includes(values?.kind ?? "")
      ? (values?.kind as Category)
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

  const addNote = async () => {
    const values = await requestForm({
      title: "Nouvelle note",
      fields: [{ name: "note", label: "Note", type: "textarea", placeholder: "Écris ta note…" }],
    });
    const note = values?.note.trim();
    if (!note) return;
    setSelected({ notes: [...selected.notes, note] });
  };

  const editNote = async (index: number) => {
    const values = await requestForm({
      title: "Modifier la note",
      fields: [{ name: "note", label: "Note", type: "textarea", value: selected.notes[index] }],
    });
    const note = values?.note.trim();
    if (!note) return;
    setSelected({
      notes: selected.notes.map((n, i) => (i === index ? note : n)),
    });
  };

  const deleteNote = (index: number) => {
    if (!confirm("Supprimer cette note?")) return;
    setSelected({ notes: selected.notes.filter((_, i) => i !== index) });
  };

  const addMonster = async () => {
    const values = await requestForm({
      title: "Ajouter un monstre",
      fields: [
        { name: "name", label: "Nom", placeholder: "Ex. Vampire" },
        { name: "skill", label: "Habileté", type: "number", value: "6" },
        { name: "endurance", label: "Endurance", type: "number", value: "8" },
        { name: "note", label: "Note", type: "textarea" },
      ],
    });
    const name = values?.name.trim();
    if (!name) return;
    const skill = Math.max(0, Number(values?.skill) || 6);
    const endurance = Math.max(1, Number(values?.endurance) || 8);
    const note = values?.note.trim() || "";
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

  const editMonster = async (monster: Monster) => {
    const values = await requestForm({
      title: "Modifier le monstre",
      fields: [
        { name: "name", label: "Nom", value: monster.name },
        { name: "skill", label: "Habileté", type: "number", value: String(monster.skill) },
        { name: "maxEndurance", label: "Endurance maximale", type: "number", value: String(monster.maxEndurance) },
        { name: "endurance", label: "Endurance actuelle", type: "number", value: String(monster.endurance) },
        { name: "note", label: "Note", type: "textarea", value: monster.note },
      ],
    });
    const name = values?.name.trim();
    if (!name) return;
    const skill = Math.max(0, Number(values?.skill) || monster.skill);
    const maxEndurance = Math.max(1, Number(values?.maxEndurance) || monster.maxEndurance);
    const endurance = Math.min(maxEndurance, Math.max(0, Number(values?.endurance) || monster.endurance));
    const note = values?.note.trim() || "";
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


  const createJourneyEvent = async (kind: JourneyTag) => {
    if (!selected?.journey) return;
    const nodeId = selected.journey.currentNodeId;
    const node = selected.journey.nodes.find((item) => item.id === nodeId);
    const paragraph = node?.paragraph ?? selected.paragraph;
    const createdAt = todayIso();

    if (kind === "dice") {
      const values = await requestForm({
        title: "Nouveau test de dé",
        description: "Décris le contexte en une phrase. Le module Dés s’ouvrira ensuite.",
        submitLabel: "Ouvrir les dés",
        fields: [
          {
            name: "context",
            label: "Contexte",
            type: "textarea",
            placeholder: "Ex. Éviter le vampire, traverser le pont, résister à la peur…",
          },
        ],
      });
      const context = values?.context.trim();
      if (!context) return;
      setPendingDiceContext({ nodeId, paragraph, context });
      setDiceOpen(true);
      return;
    }

    if (kind === "item" || kind === "key" || kind === "spell") {
      const defaultIcon = kind === "key" ? "🔑" : kind === "spell" ? "🧙" : "🎒";
      const defaultKind: Category = kind === "spell" ? "Sorts" : "Objets";
      const values = await requestForm({
        title: kind === "spell" ? "Sort lié au paragraphe" : kind === "key" ? "Clé liée au paragraphe" : "Objet lié au paragraphe",
        description: `Cet élément sera ajouté à l’inventaire et lié au §${paragraph}.`,
        fields: [
          { name: "name", label: kind === "spell" ? "Nom du sort" : "Nom de l’objet" },
          { name: "icon", label: "Icône ou emoji", value: defaultIcon },
          {
            name: "subtitle",
            label: "Description",
            type: "textarea",
            value: kind === "key" ? "Objet clé" : `Trouvé au §${paragraph}`,
          },
          { name: "quantity", label: "Quantité", type: "number", value: "1" },
        ],
      });
      const name = values?.name.trim();
      if (!name) return;
      const icon = values?.icon.trim() || defaultIcon;
      const subtitle = values?.subtitle.trim() || `Trouvé au §${paragraph}`;
      const quantity = Math.max(1, Number(values?.quantity) || 1);
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
      const values = await requestForm({
        title: "Combat lié au paragraphe",
        description: `Le monstre sera ajouté au module Combat et lié au §${paragraph}.`,
        fields: [
          { name: "name", label: "Nom du monstre", placeholder: "Ex. Vampire" },
          { name: "skill", label: "Habileté", type: "number", value: "6" },
          { name: "endurance", label: "Endurance", type: "number", value: "8" },
          { name: "note", label: "Note", type: "textarea", value: `Rencontré au §${paragraph}` },
        ],
      });
      const name = values?.name.trim();
      if (!name) return;
      const skill = Math.max(0, Number(values?.skill) || 6);
      const endurance = Math.max(1, Number(values?.endurance) || 8);
      const note = values?.note.trim() || `Rencontré au §${paragraph}`;
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
    const values = await requestForm({
      title: "Événement lié au paragraphe",
      fields: [
        { name: "label", label: "Description", type: "textarea", value: labels[kind] },
      ],
    });
    const label = values?.label.trim() || labels[kind];
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
      {formModal && (
        <ThemedFormModal
          {...formModal}
          onCancel={() => closeForm(null)}
          onSubmit={(values) => closeForm(values)}
        />
      )}
    </main>
  );
}
