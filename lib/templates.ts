import type { ActiveCondition, Adventure, DiceConfig, Item, NewAdventureData, Stat, System } from "./types";
import { findBookProfile } from "./bookProfiles/profiles";
import type { BookProfile, CharacterCreationConfig, ProfileItem, ResourceFormula, StatFormula } from "./bookProfiles/types";

export const STORAGE = "carnet-du-heros-v051";

export const uid = () => crypto.randomUUID();
const now = () => new Date().toISOString();

export function makeInitialJourney(paragraph = 1) {
  const nodeId = uid();
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
}

export const coverGradients = [
  "from-emerald-950 via-slate-900 to-orange-900",
  "from-slate-950 via-zinc-900 to-slate-700",
  "from-red-950 via-zinc-950 to-orange-950",
  "from-indigo-950 via-zinc-950 to-cyan-950",
];

function rollDie(sides: number) {
  return Math.floor(Math.random() * sides) + 1;
}

function rollFormula(formula?: string, fallback = 0) {
  if (!formula) return fallback;

  const halfDie = formula.match(/^1d(\d+)\/2ceil\+(\d+)$/i);
  if (halfDie) {
    return Math.ceil(rollDie(Number(halfDie[1])) / 2) + Number(halfDie[2]);
  }

  const match = formula.match(/^(\d+)d(\d+)(?:\+(\d+))?$/i);
  if (!match) return fallback;

  const count = Number(match[1]);
  const sides = Number(match[2]);
  const bonus = Number(match[3] ?? 0);
  return Array.from({ length: count }, () => rollDie(sides)).reduce((total, value) => total + value, bonus);
}

function makeStatFromFormula(formula: StatFormula): Stat {
  const value = rollFormula(formula.formula);
  return {
    id: formula.statId,
    name: formula.name,
    icon: formula.icon,
    current: value,
    max: formula.maxFromInitial ? value : undefined,
  };
}

function makeResourceFromFormula(formula: ResourceFormula, overrides?: Record<string, number>): Stat {
  const value = overrides?.[formula.resourceId] ?? formula.initial ?? rollFormula(formula.formula);
  return {
    id: formula.resourceId,
    name: formula.name,
    icon: formula.icon,
    current: value,
    max: formula.maxFromInitial ? value : undefined,
  };
}

function profileItemToItem(item: ProfileItem): Item {
  return {
    id: item.id,
    name: item.name,
    kind: item.kind,
    quantity: item.quantity,
    subtitle: item.subtitle ?? "Objet",
    icon: item.icon,
    notes: item.notes,
    uses: item.uses,
    consumedOnUse: item.consumedOnUse,
    wearable: item.wearable,
    worn: item.worn,
    bonusActiveWhenWorn: item.bonusActiveWhenWorn,
    combatUsable: item.combatUsable,
    useCost: item.useCost,
    effects: item.effects?.map((effect) => ({
      id: uid(),
      collection: effect.collection,
      statId: effect.statId,
      statName: effect.statName,
      delta: effect.delta,
      duration: effect.duration,
    })),
  };
}

function makeActiveCondition(name: string): ActiveCondition {
  return {
    id: uid(),
    name,
    kind: "other",
  };
}

function selectedProfileCreation(profile: BookProfile, selectedHeroId?: string): {
  creation: Extract<CharacterCreationConfig, { mode: "classic" | "fixedFormula" }>;
  heroName?: string;
  startingItems?: ProfileItem[];
} {
  if (profile.characterCreation.mode !== "pregeneratedChoice") {
    return { creation: profile.characterCreation };
  }

  const hero = profile.characterCreation.heroes.find((candidate) => candidate.id === selectedHeroId) ?? profile.characterCreation.heroes[0];

  return {
    creation: {
      mode: "classic",
      statFormulas: hero.statFormulas,
      resourceFormulas: hero.resourceFormulas,
    },
    heroName: hero.name,
    startingItems: hero.startingItems,
  };
}

function makeAdventureFromProfile(data: NewAdventureData, profile: BookProfile): Adventure {
  const selected = selectedProfileCreation(profile, data.selectedHeroId);
  const stats = selected.creation.statFormulas.map(makeStatFromFormula);
  const resources = (selected.creation.resourceFormulas ?? []).map((resource) =>
    makeResourceFromFormula(resource, profile.initialAdventure.resources),
  );
  const items = [
    ...(profile.initialAdventure.items ?? []),
    ...(selected.startingItems ?? []),
  ].map(profileItemToItem);

  const heroName = data.heroName.trim() || selected.heroName || "Heros";

  return {
    id: uid(),
    title: data.title.trim() || profile.title,
    system: profile.series,
    updatedAt: now(),
    series: profile.series,
    status: "Nouveau",
    paragraph: profile.initialAdventure.paragraph,
    cover: coverGradients[Math.floor(Math.random() * coverGradients.length)],
    profileId: profile.id,
    profileVersion: profile.profileVersion,
    rulesState: {
      ...profile.initialAdventure.rulesState,
      conditions: profile.initialAdventure.rulesState?.conditions?.map(makeActiveCondition),
      selectedHeroId: data.selectedHeroId ?? profile.initialAdventure.rulesState?.selectedHeroId,
    },
    hero: {
      name: heroName,
      level: 1,
      origin: profile.initialAdventure.heroOrigin,
      portrait: profile.initialAdventure.heroPortrait,
    },
    diceConfig: profile.defaultDice,
    diceHistory: [],
    journey: makeInitialJourney(profile.initialAdventure.paragraph),
    stats,
    resources,
    effects: [],
    items,
    notes: profile.initialAdventure.notes ?? [],
    bookmarks: [
      { id: uid(), paragraph: String(profile.initialAdventure.paragraph), label: "Debut" },
    ],
    monsters: [
      {
        id: uid(),
        name: profile.combat.engine === "horde" ? "Horde de zombies" : "Creature inconnue",
        skill: 6,
        endurance: 8,
        maxEndurance: 8,
        armor: 0,
        fear: 0,
        magic: 0,
        note: "",
      },
    ],
  };
}


export function defaultDiceConfigForSystem(system: System): DiceConfig {
  if (system === "Défis Fantastiques") return { sides: 6, mode: "multiple", count: 2 };
  if (system === "Loup Solitaire") return { sides: 10, mode: "single", count: 1 };
  return { sides: 6, mode: "single", count: 1 };
}

export const systems: System[] = [
  "Défis Fantastiques",
  "Loup Solitaire",
  "Astre d’Or",
  "La Voie du Tigre",
  "Feuille personnalisée",
];
export function starter(): Adventure[] {
  return [
    {
      id: uid(),
      title: "Sorcier de la Montagne de Feu",
      system: "Défis Fantastiques",
      updatedAt: now(),
      series: "Défis Fantastiques",
      status: "En cours",
      paragraph: 182,
      cover: coverGradients[0],
      hero: {
        name: "Aric",
        level: 5,
        origin: "Humain · Aventurier",
        portrait: "🧝‍♂️",
      },
      diceConfig: { sides: 6, mode: "multiple", count: 2 },
      diceHistory: [],
      journey: makeInitialJourney(182),
      stats: [
        { id: uid(), name: "Habileté", icon: "⚔️", current: 10, max: 12 },
        { id: uid(), name: "Endurance", icon: "❤️", current: 18, max: 20 },
        { id: uid(), name: "Chance", icon: "✦", current: 9, max: 12 },
        { id: uid(), name: "Peur", icon: "☠️", current: 2, max: 10 },
        { id: uid(), name: "Foi", icon: "☥", current: 5, max: 10 },
        {
          id: uid(),
          name: "Mana",
          icon: "🌀",
          current: 7,
          max: 12,
          color: "text-mana",
        },
      ],
      resources: [
        { id: uid(), name: "Or", icon: "🪙", current: 142 },
        { id: uid(), name: "Provisions", icon: "🥖", current: 8 },
      ],
      effects: [
        "Bénédiction de la Lumière · +2 en Endurance",
        "Malédiction mineure · -1 en Chance",
      ],
      items: [
        {
          id: uid(),
          name: "Potion de soin",
          kind: "Objets",
          quantity: 2,
          subtitle: "Consommable",
          icon: "🧪",
        },
        {
          id: uid(),
          name: "Herbe médicinale",
          kind: "Objets",
          quantity: 3,
          subtitle: "Consommable",
          icon: "🌿",
        },
        {
          id: uid(),
          name: "Clé rouillée",
          kind: "Objets",
          quantity: 1,
          subtitle: "Objet clé",
          icon: "🔑",
        },
        {
          id: uid(),
          name: "Torche",
          kind: "Objets",
          quantity: 6,
          subtitle: "Objet",
          icon: "🔥",
        },
        {
          id: uid(),
          name: "Épée courte",
          kind: "Armes",
          quantity: 1,
          subtitle: "+1 Habileté",
          icon: "🗡️",
        },
        {
          id: uid(),
          name: "Cotte de mailles",
          kind: "Armures",
          quantity: 1,
          subtitle: "Réduit les dégâts de 1",
          icon: "🛡️",
        },
        {
          id: uid(),
          name: "Boule de feu",
          kind: "Sorts",
          quantity: 1,
          subtitle: "Sort offensif",
          icon: "🔥",
        },
        {
          id: uid(),
          name: "Corde solide",
          kind: "Autres",
          quantity: 1,
          subtitle: "Objet",
          icon: "🪢",
        },
      ],
      notes: [
        "A trouvé la clé de bronze",
        "Parlé au vieil ermite",
        "Mot de passe : LUNE-ARGENT",
      ],
      bookmarks: [
        { id: uid(), paragraph: "1", label: "Début" },
        { id: uid(), paragraph: "182", label: "Position actuelle" },
      ],
      monsters: [
        {
          id: uid(),
          name: "Gobelin des cavernes",
          skill: 6,
          endurance: 12,
          maxEndurance: 16,
          armor: 1,
          fear: 2,
          magic: 0,
          note: "Attaque en groupe.",
        },
      ],
    },
    makeCommonAdventure(
      "Loup Solitaire 2",
      "Le Fléau de Vashna",
      "Loup Solitaire",
      344,
      coverGradients[1],
    ),
    makeCommonAdventure(
      "La Voie du Tigre",
      "Le Temple de la Terreur",
      "La Voie du Tigre",
      76,
      coverGradients[2],
    ),
    makeCommonAdventure(
      "Le Crépuscule des Maîtres",
      "Astre d’Or",
      "Astre d’Or",
      1,
      coverGradients[3],
    ),
  ];
}

export function baseStatsForSystem(system: System): {
  stats: Stat[];
  resources: Stat[];
  origin: string;
  portrait: string;
} {
  if (system === "Loup Solitaire") {
    return {
      stats: [
        {
          id: uid(),
          name: "Habileté de combat",
          icon: "⚔️",
          current: 16,
          max: 24,
        },
        { id: uid(), name: "Endurance", icon: "❤️", current: 22, max: 28 },
        { id: uid(), name: "Discipline Kaï", icon: "✦", current: 5, max: 10 },
      ],
      resources: [
        { id: uid(), name: "Or", icon: "🪙", current: 0 },
        { id: uid(), name: "Repas", icon: "🥖", current: 0 },
      ],
      origin: "Seigneur Kaï",
      portrait: "🧝‍♂️",
    };
  }

  if (system === "Astre d’Or") {
    return {
      stats: [
        { id: uid(), name: "Habileté", icon: "⚔️", current: 8, max: 12 },
        { id: uid(), name: "Endurance", icon: "❤️", current: 16, max: 20 },
        {
          id: uid(),
          name: "Pouvoir magique",
          icon: "🌀",
          current: 7,
          max: 12,
          color: "text-mana",
        },
      ],
      resources: [
        { id: uid(), name: "Or", icon: "🪙", current: 0 },
        { id: uid(), name: "Volonté", icon: "✦", current: 0 },
      ],
      origin: "Mage aventurier",
      portrait: "🧙‍♂️",
    };
  }

  if (system === "La Voie du Tigre") {
    return {
      stats: [
        {
          id: uid(),
          name: "Force intérieure",
          icon: "🐯",
          current: 8,
          max: 12,
        },
        { id: uid(), name: "Endurance", icon: "❤️", current: 18, max: 20 },
        { id: uid(), name: "Destin", icon: "✦", current: 7, max: 12 },
      ],
      resources: [
        { id: uid(), name: "Shurikens", icon: "✦", current: 0 },
        { id: uid(), name: "Or", icon: "🪙", current: 0 },
      ],
      origin: "Ninja",
      portrait: "🥷",
    };
  }

  if (system === "Feuille personnalisée") {
    return {
      stats: [
        { id: uid(), name: "Habileté", icon: "⚔️", current: 0 },
        { id: uid(), name: "Endurance", icon: "❤️", current: 0 },
        { id: uid(), name: "Chance", icon: "✦", current: 0 },
      ],
      resources: [],
      origin: "Aventurier",
      portrait: "🧙‍♂️",
    };
  }

  return {
    stats: [
      { id: uid(), name: "Habileté", icon: "⚔️", current: 8, max: 12 },
      { id: uid(), name: "Endurance", icon: "❤️", current: 16, max: 20 },
      { id: uid(), name: "Chance", icon: "✦", current: 7, max: 12 },
    ],
    resources: [
      { id: uid(), name: "Or", icon: "🪙", current: 0 },
      { id: uid(), name: "Provisions", icon: "🥖", current: 0 },
    ],
    origin: "Aventurier",
    portrait: "🧙‍♂️",
  };
}

export function makeAdventureFromData(data: NewAdventureData): Adventure {
  const profile = findBookProfile(data.profileId);
  if (profile) return makeAdventureFromProfile(data, profile);

  const template = baseStatsForSystem(data.system);
  return {
    id: uid(),
    title: data.title.trim() || "Nouvelle aventure",
    system: data.system,
    updatedAt: now(),
    series: data.system,
    status: "Nouveau",
    paragraph: 1,
    cover: coverGradients[Math.floor(Math.random() * coverGradients.length)],
    hero: {
      name: data.heroName.trim() || "Héros",
      level: 1,
      origin: template.origin,
      portrait: template.portrait,
    },
    diceConfig: data.diceConfig ?? defaultDiceConfigForSystem(data.system),
    diceHistory: [],
    journey: makeInitialJourney(1),
    stats: template.stats,
    resources: template.resources,
    effects: [],
    items: [],
    notes: [],
    bookmarks: [
      { id: uid(), paragraph: "1", label: "Début" },
    ],
    monsters: [
      {
        id: uid(),
        name: "Créature inconnue",
        skill: 6,
        endurance: 8,
        maxEndurance: 8,
        armor: 0,
        fear: 0,
        magic: 0,
        note: "",
      },
    ],
  };
}

export function makeCommonAdventure(
  title: string,
  series: string,
  status: string,
  paragraph: number,
  cover: string,
): Adventure {
  return {
    id: uid(),
    title,
    system: series,
    updatedAt: now(),
    series,
    status,
    paragraph,
    cover,
    hero: { name: "Héros", level: 1, origin: "Aventurier", portrait: "🧙‍♂️" },
    diceConfig: defaultDiceConfigForSystem(status as System),
    diceHistory: [],
    journey: makeInitialJourney(paragraph),
    stats: [
      { id: uid(), name: "Habileté", icon: "⚔️", current: 8, max: 12 },
      { id: uid(), name: "Endurance", icon: "❤️", current: 16, max: 20 },
      { id: uid(), name: "Chance", icon: "✦", current: 7, max: 12 },
    ],
    resources: [{ id: uid(), name: "Or", icon: "🪙", current: 0 }],
    effects: [],
    items: [],
    notes: [],
    bookmarks: [
      { id: uid(), paragraph: "1", label: "Début" },
    ],
    monsters: [
      {
        id: uid(),
        name: "Créature inconnue",
        skill: 6,
        endurance: 8,
        maxEndurance: 8,
        armor: 0,
        fear: 0,
        magic: 0,
        note: "",
      },
    ],
  };
}
