import { Adventure } from "./types";

export const STORAGE_KEY = "carnet-du-heros/adventures-v1";

const id = () => crypto.randomUUID();
const now = () => new Date().toISOString();

const initialJourney = (paragraph = 1) => {
  const nodeId = id();
  return {
    currentNodeId: nodeId,
    nodes: [
      {
        id: nodeId,
        paragraph,
        notes: "",
        tags: [],
        choices: [],
        events: [],
        visitedAt: now(),
      },
    ],
  };
};

export function createStarterAdventure(): Adventure {
  return {
    id: id(),
    title: "La Crypte du Roi oublié",
    system: "Feuille personnalisée",
    updatedAt: now(),
    series: "Feuille personnalisée",
    status: "En cours",
    paragraph: 1,
    cover: "from-emerald-950 via-slate-900 to-orange-900",
    hero: {
      name: "Aric",
      level: 1,
      origin: "Aventurier",
      portrait: "🧙‍♂️",
    },
    diceConfig: { sides: 6, mode: "multiple", count: 2 },
    diceHistory: [],
    journey: initialJourney(1),
    stats: [
      { id: id(), name: "Habileté", icon: "⚔️", current: 10, max: 12 },
      { id: id(), name: "Endurance", icon: "❤️", current: 20, max: 20 },
      { id: id(), name: "Chance", icon: "✦", current: 8, max: 12 },
    ],
    resources: [
      { id: id(), name: "Or", icon: "🪙", current: 6 },
      { id: id(), name: "Provisions", icon: "🥖", current: 5, max: 10 },
    ],
    items: [
      {
        id: id(),
        name: "Épée courte",
        kind: "Armes",
        quantity: 1,
        subtitle: "Arme de départ",
        icon: "🗡️",
      },
      {
        id: id(),
        name: "Potion de soin",
        kind: "Objets",
        quantity: 2,
        subtitle: "+4 endurance",
        icon: "🧪",
      },
    ],
    notes: [
      "Départ au paragraphe 1.",
      "Ne pas oublier la clé rouillée trouvée près de la fontaine.",
    ],
    effects: [],
    bookmarks: [
      { id: id(), paragraph: "1", label: "Début" },
      { id: id(), paragraph: "47", label: "Salle du coffre" },
    ],
    monsters: [
      {
        id: id(),
        name: "Gobelin",
        skill: 6,
        endurance: 5,
        maxEndurance: 5,
        armor: 0,
        fear: 0,
        magic: 0,
        note: "Dague rouillée.",
      },
    ],
  };
}

export function createBlankAdventure(title: string): Adventure {
  return {
    id: id(),
    title: title.trim() || "Nouvelle aventure",
    system: "Feuille personnalisée",
    updatedAt: now(),
    series: "Feuille personnalisée",
    status: "Nouveau",
    paragraph: 1,
    cover: "from-indigo-950 via-zinc-950 to-cyan-950",
    hero: {
      name: "Héros",
      level: 1,
      origin: "Aventurier",
      portrait: "🧙‍♂️",
    },
    diceConfig: { sides: 6, mode: "single", count: 1 },
    diceHistory: [],
    journey: initialJourney(1),
    stats: [
      { id: id(), name: "Habileté", icon: "⚔️", current: 0 },
      { id: id(), name: "Endurance", icon: "❤️", current: 0 },
      { id: id(), name: "Chance", icon: "✦", current: 0 },
    ],
    resources: [],
    items: [],
    notes: [],
    effects: [],
    bookmarks: [],
    monsters: [],
  };
}
