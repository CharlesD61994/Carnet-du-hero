import type { BookProfile } from "./types";

export const fightingFantasy01: BookProfile = {
  id: "ff-01-sorcier-montagne-feu",
  title: "Le Sorcier de la Montagne de Feu",
  series: "Defis Fantastiques",
  bookNumber: 1,
  profileVersion: 1,
  modules: [
    "character.classic",
    "stats.classicFF",
    "combat.classicFF",
    "inventory.basic",
    "journey.basic",
  ],
  defaultDice: { sides: 6, mode: "multiple", count: 2 },
  characterCreation: {
    mode: "classic",
    statFormulas: [
      { statId: "skill", name: "Habilete", icon: "H", formula: "1d6+6", maxFromInitial: true },
      { statId: "stamina", name: "Endurance", icon: "E", formula: "2d6+12", maxFromInitial: true },
      { statId: "luck", name: "Chance", icon: "C", formula: "1d6+6", maxFromInitial: true },
    ],
    resourceFormulas: [
      { resourceId: "gold", name: "Or", icon: "$", initial: 0 },
      { resourceId: "provisions", name: "Provisions", icon: "R", initial: 0 },
    ],
  },
  initialAdventure: {
    paragraph: 1,
    heroOrigin: "Aventurier",
    heroPortrait: "H",
    resources: {
      gold: 0,
      provisions: 0,
    },
  },
  combat: {
    engine: "classic",
    defaultDamage: 2,
    heroAttackStatId: "skill",
    heroLifeStatId: "stamina",
    enemyAttackStatName: "Habilete",
    enemyLifeStatName: "Endurance",
  },
  inventory: {
    supportsCombatItems: true,
    supportsWornItems: true,
    supportsCharges: true,
  },
  journey: {
    tracksItemUse: true,
  },
};
