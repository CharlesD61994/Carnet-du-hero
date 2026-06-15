export type Screen =
  | "home"
  | "journey"
  | "sheet"
  | "inventory"
  | "combat"
  | "dice"
  | "diceHistory"
  | "notes"
  | "edit"
  | "more";

export type Category = "Objets" | "Armes" | "Armures" | "Sorts" | "Autres";

export type System =
  | "Défis Fantastiques"
  | "Loup Solitaire"
  | "Astre d’Or"
  | "La Voie du Tigre"
  | "Feuille personnalisée";

export type Stat = {
  id: string;
  name: string;
  icon: string;
  current: number;
  max?: number;
  color?: string;
};

export type Item = {
  id: string;
  name: string;
  kind: Category;
  quantity: number;
  subtitle: string;
  icon: string;
  sourceParagraph?: number;
  sourceNodeId?: string;
};

export type CombatAction =
  | {
      id: string;
      type: "stat";
      target: "hero" | "monster";
      statId?: string;
      statName: string;
      statCollection?: "stats" | "resources";
      delta: number;
      note?: string;
    }
  | {
      id: string;
      type: "item";
      itemId?: string;
      itemName: string;
      note?: string;
    }
  | {
      id: string;
      type: "note";
      note: string;
    }
  | {
      id: string;
      type: "dice";
      roll: DiceRoll;
      note?: string;
    };

export type CombatRound = {
  id: string;
  createdAt: string;
  diceCount: number;
  diceSides: number;
  rolls: number[];
  total: number;
  context?: string;
  actions: CombatAction[];
  heroRolls?: number[];
  heroDiceTotal?: number;
  heroSkill?: number;
  heroAttackTotal?: number;
  enemyRolls?: number[];
  enemyDiceTotal?: number;
  enemySkill?: number;
  enemyAttackTotal?: number;
  outcome?: "hero" | "enemy" | "tie";
};

export type Monster = {
  id: string;
  name: string;
  skill: number;
  endurance: number;
  maxEndurance: number;
  armor: number;
  fear: number;
  magic: number;
  note: string;
  sourceParagraph?: number;
  sourceNodeId?: string;
  combatResult?: "pending" | "victory" | "defeat" | "interrupted";
  combatLog?: CombatRound[];
};

export type Bookmark = {
  id: string;
  paragraph: string;
  label: string;
};

export type DiceConfig = {
  sides: 6 | 8 | 10 | 12 | 20;
  mode: "single" | "multiple";
  count: number;
};

export type DiceRoll = {
  id: string;
  createdAt: string;
  sides: number;
  count: number;
  rolls: number[];
  total: number;
  context?: string;
  sourceParagraph?: number;
  sourceNodeId?: string;
};

export type JourneyTag =
  | "death"
  | "combat"
  | "dice"
  | "spell"
  | "item"
  | "important"
  | "key"
  | "secret"
  | "danger";

export type JourneyChoice = {
  id: string;
  to: number;
  createdAt: string;
};

export type JourneyEvent = {
  id: string;
  kind: JourneyTag;
  label: string;
  createdAt: string;
  refId?: string;
  result?: string;
};

export type JourneyNode = {
  id: string;
  paragraph: number;
  parentId?: string;
  notes: string;
  tags: JourneyTag[];
  visitedAt: string;
  choices?: JourneyChoice[];
  events?: JourneyEvent[];
};

export type JourneyState = {
  currentNodeId: string;
  nodes: JourneyNode[];
};

export type AdventureLibraryAction = "rename" | "reset" | "delete";

export type Adventure = {
  id: string;
  title: string;
  system: string;
  updatedAt: string;
  series: string;
  status: string;
  paragraph: number;
  cover: string;
  attempts?: number;
  lastDeathAt?: string;
  hero: {
    name: string;
    level: number;
    origin: string;
    portrait: string;
  };
  heroBarStatIds?: string[];
  diceConfig: DiceConfig;
  diceHistory: DiceRoll[];
  journey: JourneyState;
  stats: Stat[];
  resources: Stat[];
  items: Item[];
  notes: string[];
  effects: string[];
  bookmarks: Bookmark[];
  monsters: Monster[];
};

export type NewAdventureData = {
  title: string;
  heroName: string;
  system: System;
  diceConfig: DiceConfig;
};
