import type { Category, DiceConfig } from "@/lib/types";
import type { ModuleId } from "./modules";

export type CombatEngine = "classic" | "horde";

export type StatFormula = {
  statId: string;
  name: string;
  icon: string;
  formula: string;
  maxFromInitial?: boolean;
  allowAboveInitial?: boolean;
};

export type ResourceFormula = {
  resourceId: string;
  name: string;
  icon: string;
  formula?: string;
  initial?: number;
  maxFromInitial?: boolean;
  allowAboveInitial?: boolean;
};

export type PregeneratedHero = {
  id: string;
  name: string;
  description: string;
  statFormulas: StatFormula[];
  resourceFormulas?: ResourceFormula[];
  startingItems?: ProfileItem[];
};

export type CharacterCreationConfig =
  | {
      mode: "classic" | "fixedFormula";
      statFormulas: StatFormula[];
      resourceFormulas?: ResourceFormula[];
    }
  | {
      mode: "pregeneratedChoice";
      heroes: PregeneratedHero[];
    };

export type ProfileItemEffect = {
  collection: "stats" | "resources";
  statId: string;
  statName: string;
  delta: number;
  duration?: "instant" | "nextRoll" | "nextRound" | "combat" | "paragraph" | "permanent";
};

export type ProfileItem = {
  id: string;
  name: string;
  kind: Category;
  quantity: number;
  subtitle?: string;
  icon: string;
  notes?: string;
  uses?: number;
  consumedOnUse?: boolean;
  wearable?: boolean;
  worn?: boolean;
  bonusActiveWhenWorn?: boolean;
  combatUsable?: boolean;
  useCost?: "none" | "charge" | "quantity" | "destroy" | "disable";
  effects?: ProfileItemEffect[];
  damageFormula?: string;
  ammoType?: string;
};

export type InitialAdventureConfig = {
  paragraph: number;
  heroOrigin: string;
  heroPortrait: string;
  resources?: Record<string, number>;
  items?: ProfileItem[];
  notes?: string[];
  rulesState?: RulesStateTemplate;
};

export type RulesStateTemplate = {
  time?: {
    elapsedHours?: number;
    elapsedDays?: number;
    currentDay?: string;
    deadlineDays?: number;
  };
  conditions?: string[];
  codes?: string[];
  counters?: Record<string, number>;
  selectedHeroId?: string;
};

export type CombatProfile = {
  engine: CombatEngine;
  defaultDamage?: number;
  heroAttackStatId?: string;
  heroLifeStatId?: string;
  enemyAttackStatName?: string;
  enemyLifeStatName?: string;
};

export type InventoryProfile = {
  supportsCombatItems?: boolean;
  supportsWornItems?: boolean;
  supportsCharges?: boolean;
  supportsAmmo?: boolean;
  supportsDamageFormula?: boolean;
};

export type JourneyProfile = {
  tracksItemUse?: boolean;
  tracksTime?: boolean;
  tracksCounters?: boolean;
  tracksCodes?: boolean;
};

export type BookProfile = {
  id: string;
  title: string;
  series: string;
  bookNumber?: number;
  profileVersion: number;
  modules: ModuleId[];
  defaultDice: DiceConfig;
  characterCreation: CharacterCreationConfig;
  initialAdventure: InitialAdventureConfig;
  combat: CombatProfile;
  inventory?: InventoryProfile;
  journey?: JourneyProfile;
};
