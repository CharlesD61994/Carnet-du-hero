import { LibraryBig, MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";

export function Header({
  title,
  right,
  back,
  onOptions,
}: {
  title: string;
  right?: ReactNode;
  back?: () => void;
  onOptions?: () => void;
}) {
  return (
    <div className="flex h-14 items-center justify-between border-b border-line/70 bg-night/90 px-4 backdrop-blur">
      <button
        onClick={back}
        className="grid h-9 w-9 place-items-center rounded-xl text-gold active:bg-gold/10 disabled:opacity-40"
        aria-label={back ? "Retour à la bibliothèque" : "Bibliothèque"}
        disabled={!back}
      >
        <LibraryBig size={20} />
      </button>
      <div className="font-serif text-sm uppercase tracking-[.18em] text-gold2">
        {title}
      </div>
      <div className="grid h-9 min-w-9 place-items-center rounded-xl text-gold">
        {right ?? (
          <button
            onClick={onOptions}
            className="grid h-9 w-9 place-items-center rounded-xl text-gold active:bg-gold/10 disabled:opacity-40"
            aria-label="Options de l’aventure"
            disabled={!onOptions}
          >
            <MoreHorizontal size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
