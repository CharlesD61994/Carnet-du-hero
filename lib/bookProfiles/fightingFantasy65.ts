import type { BookProfile } from "./types";

export const fightingFantasy65: BookProfile = {
  id: "ff-65-tronconneuse-zombies",
  title: "Massacre a la Tronconneuse de Zombies",
  series: "Defis Fantastiques",
  bookNumber: 65,
  profileVersion: 1,
  modules: [
    "character.fixedFormula",
    "stats.enduranceOnly",
    "combat.horde",
    "weapon.damageDice",
    "inventory.weaponsAndAmmo",
    "condition.infection",
    "healing.medkits",
    "journey.killCounter",
  ],
  defaultDice: { sides: 6, mode: "multiple", count: 2 },
  characterCreation: {
    mode: "fixedFormula",
    statFormulas: [
      {
        statId: "stamina",
        name: "Endurance",
        icon: "E",
        formula: "2d6+20",
        allowAboveInitial: true,
      },
    ],
    resourceFormulas: [
      { resourceId: "zombiesKilled", name: "Zombies tues", icon: "Z", initial: 0 },
      { resourceId: "money", name: "Argent", icon: "$", initial: 0 },
      { resourceId: "food", name: "Nourriture", icon: "R", initial: 0 },
    ],
  },
  initialAdventure: {
    paragraph: 1,
    heroOrigin: "Etudiant en folklore et mythologie",
    heroPortrait: "H",
    resources: {
      zombiesKilled: 0,
      money: 0,
      food: 0,
    },
    rulesState: {
      counters: {
        zombiesKilled: 0,
      },
    },
  },
  combat: {
    engine: "horde",
    heroLifeStatId: "stamina",
    enemyLifeStatName: "Zombies",
  },
  inventory: {
    supportsCombatItems: true,
    supportsCharges: false,
    supportsAmmo: true,
    supportsDamageFormula: true,
  },
  journey: {
    tracksCounters: true,
  },
};
