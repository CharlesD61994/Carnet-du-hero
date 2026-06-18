import type { BookProfile, PregeneratedHero } from "./types";

const heroes: PregeneratedHero[] = [
  {
    id: "anvar",
    name: "Anvar le Barbare",
    description: "Tres fort au combat, mais peu verse dans la magie.",
    statFormulas: [
      { statId: "skill", name: "Habilete", icon: "H", formula: "1d6+6", maxFromInitial: true },
      { statId: "stamina", name: "Endurance", icon: "E", formula: "1d6+18", maxFromInitial: true },
      { statId: "luck", name: "Chance", icon: "C", formula: "1d6+4", maxFromInitial: true },
    ],
    resourceFormulas: [
      { resourceId: "magic", name: "Magie", icon: "M", initial: 1, maxFromInitial: true },
      { resourceId: "provisions", name: "Provisions", icon: "R", initial: 12 },
    ],
  },
  {
    id: "braxus",
    name: "Braxus le Guerrier",
    description: "Profil equilibre entre combat et magie.",
    statFormulas: [
      { statId: "skill", name: "Habilete", icon: "H", formula: "1d6+6", maxFromInitial: true },
      { statId: "stamina", name: "Endurance", icon: "E", formula: "2d6+12", maxFromInitial: true },
      { statId: "luck", name: "Chance", icon: "C", formula: "1d6+3", maxFromInitial: true },
    ],
    resourceFormulas: [
      { resourceId: "magic", name: "Magie", icon: "M", initial: 3, maxFromInitial: true },
      { resourceId: "provisions", name: "Provisions", icon: "R", initial: 12 },
    ],
  },
  {
    id: "rablaix",
    name: "Rablaix le Nain",
    description: "Chanceux, solide et avantage en souterrain.",
    statFormulas: [
      { statId: "skill", name: "Habilete", icon: "H", formula: "1d6+5", maxFromInitial: true },
      { statId: "stamina", name: "Endurance", icon: "E", formula: "2d6+12", maxFromInitial: true },
      { statId: "luck", name: "Chance", icon: "C", formula: "1d6+5", maxFromInitial: true },
    ],
    resourceFormulas: [
      { resourceId: "magic", name: "Magie", icon: "M", initial: 2, maxFromInitial: true },
      { resourceId: "provisions", name: "Provisions", icon: "R", initial: 12 },
    ],
  },
  {
    id: "sallazar",
    name: "Sallazar le Magicien",
    description: "Faible aux armes, mais maitre des sortileges.",
    statFormulas: [
      { statId: "skill", name: "Habilete", icon: "H", formula: "1d6+4", maxFromInitial: true },
      { statId: "stamina", name: "Endurance", icon: "E", formula: "3d6+6", maxFromInitial: true },
      { statId: "luck", name: "Chance", icon: "C", formula: "1d6+3", maxFromInitial: true },
    ],
    resourceFormulas: [
      { resourceId: "magic", name: "Magie", icon: "M", initial: 7, maxFromInitial: true },
      { resourceId: "provisions", name: "Provisions", icon: "R", initial: 12 },
    ],
  },
];

export const fightingFantasy52: BookProfile = {
  id: "ff-52-legende-zagor",
  title: "La Legende de Zagor",
  series: "Defis Fantastiques",
  bookNumber: 52,
  profileVersion: 1,
  modules: [
    "character.pregeneratedChoice",
    "stats.classicFF",
    "resource.magic",
    "combat.classicFF",
    "inventory.advancedItems",
    "magic.activation",
  ],
  defaultDice: { sides: 6, mode: "multiple", count: 2 },
  characterCreation: {
    mode: "pregeneratedChoice",
    heroes,
  },
  initialAdventure: {
    paragraph: 1,
    heroOrigin: "Heros d'Amarillie",
    heroPortrait: "H",
    resources: {
      provisions: 12,
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
