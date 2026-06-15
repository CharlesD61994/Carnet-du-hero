"use client";

import { useState } from "react";
import { ChevronRight, Flame, MoreVertical, Plus, Settings, Trash2 } from "lucide-react";
import type { Adventure, AdventureLibraryAction } from "@/lib/types";
import { Header } from "@/components/ui/Header";

export function HomeScreen({
  adventures,
  selectedId,
  select,
  create,
  onAdventureAction,
}: {
  adventures: Adventure[];
  selectedId: string;
  select: (id: string) => void;
  create: () => void;
  onAdventureAction: (id: string, action: AdventureLibraryAction) => void;
}) {
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  return (
    <div>
      <Header title="Carnet ✧ Héros" right={<Settings size={18} />} />
      <div className="space-y-5 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-sm uppercase tracking-[.16em] text-gold2">
            Mes aventures
          </h2>
          <button
            onClick={create}
            className="gold-frame grid h-11 w-11 place-items-center rounded-2xl border border-gold/40 bg-panel2 text-gold shadow-card active:scale-[0.98]"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>
        </div>
        <div className="space-y-2">
          {adventures.map((a) => (
            <div key={a.id} className="relative">
              <button
                onClick={() => select(a.id)}
                className={`gold-frame flex w-full items-center gap-3 rounded-xl bg-panel/80 p-2 pr-16 text-left ${selectedId === a.id ? "shadow-glow" : ""}`}
              >
                <div
                  className={`grid h-20 w-20 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${a.cover} text-4xl shadow-inner`}
                >
                  <Flame className="text-gold" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-[1rem] leading-tight text-parchment">
                    {a.title}
                  </p>
                  <p className="mt-1 text-xs text-muted">{a.series}</p>
                  <p className="mt-2 text-xs text-gold">♙ {a.status}</p>
                  <p className="mt-1 text-[11px] text-muted">Tentatives : {a.attempts ?? 1}</p>
                </div>
                <div className="mr-1 flex h-full flex-col items-end justify-between gap-5 text-muted">
                  <ChevronRight size={18} />
                  <span className="text-xs">§ {a.paragraph}</span>
                </div>
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setMenuOpenId(menuOpenId === a.id ? null : a.id);
                }}
                className="absolute right-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl border border-line/70 bg-black/35 text-muted active:scale-[0.98]"
                aria-label="Options de l’aventure"
              >
                <MoreVertical size={18} />
              </button>
              {menuOpenId === a.id && (
                <div className="absolute right-4 top-[calc(50%+1.75rem)] z-20 w-56 overflow-hidden rounded-2xl border border-line bg-night shadow-2xl">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpenId(null);
                      onAdventureAction(a.id, "rename");
                    }}
                    className="block w-full px-4 py-3 text-left text-sm text-parchment active:bg-white/5"
                  >
                    Renommer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpenId(null);
                      onAdventureAction(a.id, "reset");
                    }}
                    className="block w-full px-4 py-3 text-left text-sm text-parchment active:bg-white/5"
                  >
                    Réinitialiser la tentative
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpenId(null);
                      onAdventureAction(a.id, "delete");
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-200 active:bg-red-950/30"
                  >
                    <Trash2 size={16} /> Supprimer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="w-full rounded-lg border border-line py-3 font-serif text-sm uppercase tracking-wide text-gold2">
          Toutes les aventures
        </button>
      </div>
    </div>
  );
}
