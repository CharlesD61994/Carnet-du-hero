import type { ReactNode } from "react";

export function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="gold-frame flex min-h-16 items-center justify-center gap-3 rounded-xl bg-panel/90 p-3 font-serif text-xs uppercase tracking-wide text-gold2"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
