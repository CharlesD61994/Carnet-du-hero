import { BookOpen, Dice5, Package, Swords } from "lucide-react";
import type { ReactNode } from "react";
import type { Screen } from "@/lib/types";

function isActive(current: Screen, target: Screen) {
  return current === target;
}

export function BottomNav({
  screen,
  setScreen,
  onDice,
}: {
  screen: Screen;
  setScreen: (s: Screen) => void;
  onDice: () => void;
}) {
  const items: [Screen, ReactNode, string][] = [
    ["journey", <BookOpen key="j" />, "Parcours"],
    ["inventory", <Package key="i" />, "Inventaire"],
    ["combat", <Swords key="c" />, "Combat"],
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto grid max-w-md grid-cols-4 border-t border-line bg-night/95 px-2 pb-[calc(.45rem+env(safe-area-inset-bottom))] pt-2 text-xs backdrop-blur">
      {items.map(([s, icon, label]) => (
        <button
          key={s}
          onClick={() => setScreen(s)}
          className={`flex flex-col items-center gap-1 ${isActive(screen, s) ? "text-gold" : "text-muted"}`}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
      <button
        onClick={onDice}
        className="flex flex-col items-center gap-1 text-muted active:text-gold"
      >
        <Dice5 />
        <span>Dés</span>
      </button>
    </nav>
  );
}
