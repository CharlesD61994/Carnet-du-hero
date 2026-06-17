import type { Adventure, Item, ItemEffect, Stat } from "@/lib/types";

function sameStat(effect: ItemEffect, stat: Stat) {
  return effect.statId === stat.id || effect.statName.toLowerCase() === stat.name.toLowerCase();
}

export function itemEffectsAreActive(item: Item) {
  if (!item.effects?.length) return false;
  return item.bonusActiveWhenWorn ? Boolean(item.worn) : true;
}

export function activeItemEffects(adventure: Adventure) {
  return adventure.items.flatMap((item) =>
    itemEffectsAreActive(item)
      ? (item.effects ?? []).map((effect) => ({ ...effect, itemName: item.name }))
      : [],
  );
}

export function statBonus(adventure: Adventure, stat: Stat, collection: "stats" | "resources") {
  return activeItemEffects(adventure)
    .filter((effect) => effect.collection === collection && sameStat(effect, stat))
    .reduce((total, effect) => total + effect.delta, 0);
}

export function effectiveStatValue(adventure: Adventure, stat: Stat, collection: "stats" | "resources") {
  return stat.current + statBonus(adventure, stat, collection);
}

export function effectLabel(effect: ItemEffect) {
  const sign = effect.delta > 0 ? "+" : "";
  return `${sign}${effect.delta} ${effect.statName}`;
}

export function itemEffectSummary(item: Item) {
  return (item.effects ?? []).map(effectLabel).join(", ");
}

export function combatItems(adventure: Adventure) {
  return adventure.items.filter((item) =>
    item.quantity > 0 &&
    (item.combatUsable || Boolean(item.uses) || Boolean(item.consumedOnUse) || Boolean(item.effects?.length)),
  );
}
