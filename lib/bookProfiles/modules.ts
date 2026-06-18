export type ModuleId =
  | "character.classic"
  | "character.fixedFormula"
  | "character.pregeneratedChoice"
  | "stats.classicFF"
  | "stats.enduranceOnly"
  | "resource.magic"
  | "combat.classicFF"
  | "combat.horde"
  | "inventory.basic"
  | "inventory.advancedItems"
  | "inventory.weaponsAndAmmo"
  | "magic.activation"
  | "condition.infection"
  | "healing.medkits"
  | "journey.basic"
  | "journey.killCounter"
  | "weapon.damageDice";

export const moduleLabels: Record<ModuleId, string> = {
  "character.classic": "Creation classique",
  "character.fixedFormula": "Creation par formule fixe",
  "character.pregeneratedChoice": "Choix de heros",
  "stats.classicFF": "Statistiques Defis Fantastiques",
  "stats.enduranceOnly": "Endurance seulement",
  "resource.magic": "Ressource Magie",
  "combat.classicFF": "Combat classique Defis Fantastiques",
  "combat.horde": "Combat par hordes",
  "inventory.basic": "Inventaire simple",
  "inventory.advancedItems": "Objets avances",
  "inventory.weaponsAndAmmo": "Armes et munitions",
  "magic.activation": "Activation magique",
  "condition.infection": "Infection",
  "healing.medkits": "Trousses de soins",
  "journey.basic": "Parcours de base",
  "journey.killCounter": "Compteur de victimes",
  "weapon.damageDice": "Dommages d'arme",
};
