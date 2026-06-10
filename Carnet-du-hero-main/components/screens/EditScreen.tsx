import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { Adventure, DiceConfig, Stat } from "@/lib/types";
import { uid } from "@/lib/templates";
import { Header } from "@/components/ui/Header";
import { StickyHeaderGroup } from "@/components/ui/StickyHeaderGroup";
import { Panel } from "@/components/ui/Panel";

const dieOptions: DiceConfig["sides"][] = [6, 10, 12, 20];

export function EditScreen({
  adventure,
  save,
  deleteAdventure,
  onLibrary,
}: {
  adventure: Adventure;
  save: (a: Adventure) => void;
  deleteAdventure: () => void;
  onLibrary: () => void;
}) {
  const [draft, setDraft] = useState<Adventure>(adventure);

  const numberFromPrompt = (message: string, fallback: number) => {
    const value = Number(prompt(message, String(fallback)));
    return Number.isFinite(value) ? value : fallback;
  };

  const addStat = () => {
    const name = prompt("Nom de la caractéristique")?.trim();
    if (!name) return;
    const icon = prompt("Icône ou emoji", "✦")?.trim() || "✦";
    const current = numberFromPrompt("Valeur actuelle", 0);
    const maxRaw = prompt("Maximum (laisser vide si aucun)", "");
    const max = maxRaw?.trim() ? Number(maxRaw) : undefined;
    setDraft({
      ...draft,
      stats: [
        ...draft.stats,
        {
          id: uid(),
          name,
          icon,
          current,
          max: Number.isFinite(max) ? max : undefined,
        },
      ],
    });
  };

  const editStat = (stat: Stat) => {
    const name = prompt("Nom de la caractéristique", stat.name)?.trim();
    if (!name) return;
    const icon = prompt("Icône ou emoji", stat.icon)?.trim() || stat.icon;
    const current = numberFromPrompt("Valeur actuelle", stat.current);
    const maxRaw = prompt(
      "Maximum (laisser vide si aucun)",
      stat.max !== undefined ? String(stat.max) : "",
    );
    const max = maxRaw?.trim() ? Number(maxRaw) : undefined;
    setDraft({
      ...draft,
      stats: draft.stats.map((s) =>
        s.id === stat.id
          ? {
              ...s,
              name,
              icon,
              current,
              max: Number.isFinite(max) ? max : undefined,
            }
          : s,
      ),
    });
  };

  const deleteStat = (id: string) => {
    if (!confirm("Supprimer cette caractéristique?")) return;
    setDraft({ ...draft, stats: draft.stats.filter((s) => s.id !== id) });
  };

  const addResource = () => {
    const name = prompt("Nom de la ressource")?.trim();
    if (!name) return;
    const icon = prompt("Icône ou emoji", "◈")?.trim() || "◈";
    const current = numberFromPrompt("Quantité actuelle", 0);
    const maxRaw = prompt("Maximum (laisser vide si aucun)", "");
    const max = maxRaw?.trim() ? Number(maxRaw) : undefined;
    setDraft({
      ...draft,
      resources: [
        ...draft.resources,
        {
          id: uid(),
          name,
          icon,
          current,
          max: Number.isFinite(max) ? max : undefined,
        },
      ],
    });
  };

  const editResource = (resource: Stat) => {
    const name = prompt("Nom de la ressource", resource.name)?.trim();
    if (!name) return;
    const icon =
      prompt("Icône ou emoji", resource.icon)?.trim() || resource.icon;
    const current = numberFromPrompt("Quantité actuelle", resource.current);
    const maxRaw = prompt(
      "Maximum (laisser vide si aucun)",
      resource.max !== undefined ? String(resource.max) : "",
    );
    const max = maxRaw?.trim() ? Number(maxRaw) : undefined;
    setDraft({
      ...draft,
      resources: draft.resources.map((r) =>
        r.id === resource.id
          ? {
              ...r,
              name,
              icon,
              current,
              max: Number.isFinite(max) ? max : undefined,
            }
          : r,
      ),
    });
  };

  const deleteResource = (id: string) => {
    if (!confirm("Supprimer cette ressource?")) return;
    setDraft({
      ...draft,
      resources: draft.resources.filter((r) => r.id !== id),
    });
  };

  return (
    <div>
      <StickyHeaderGroup>
      <Header
        title="Modifier la feuille"
        back={onLibrary}
        right={
          <button onClick={() => save(draft)} className="text-xs text-gold2">
            Enregistrer
          </button>
        }
      />
      </StickyHeaderGroup>
      <div className="space-y-4 p-4">
        <Panel className="space-y-3 p-4">
          <label className="block text-sm text-muted">
            Titre de l’aventure
          </label>
          <input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="w-full rounded-xl border border-line bg-black/30 p-3 text-parchment outline-none focus:border-gold/60"
          />
          <label className="block text-sm text-muted">Nom du héros</label>
          <input
            value={draft.hero.name}
            onChange={(e) =>
              setDraft({
                ...draft,
                hero: { ...draft.hero, name: e.target.value },
              })
            }
            className="w-full rounded-xl border border-line bg-black/30 p-3 text-parchment outline-none focus:border-gold/60"
          />
          <div className="grid grid-cols-[5rem_1fr] gap-3">
            <label className="block text-sm text-muted">
              Portrait
              <input
                value={draft.hero.portrait}
                maxLength={4}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    hero: { ...draft.hero, portrait: e.target.value || "🧙‍♂️" },
                  })
                }
                className="mt-1 w-full rounded-xl border border-line bg-black/30 p-3 text-center text-2xl text-parchment outline-none focus:border-gold/60"
              />
            </label>
            <label className="block text-sm text-muted">
              Origine
              <input
                value={draft.hero.origin}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    hero: { ...draft.hero, origin: e.target.value },
                  })
                }
                className="mt-1 w-full rounded-xl border border-line bg-black/30 p-3 text-parchment outline-none focus:border-gold/60"
              />
            </label>
          </div>
          <label className="block text-sm text-muted">Niveau</label>
          <input
            type="number"
            value={draft.hero.level}
            onChange={(e) =>
              setDraft({
                ...draft,
                hero: {
                  ...draft.hero,
                  level: Math.max(1, Number(e.target.value) || 1),
                },
              })
            }
            className="w-full rounded-xl border border-line bg-black/30 p-3 text-parchment outline-none focus:border-gold/60"
          />
        </Panel>


        <Panel className="p-4">
          <div className="mb-3">
            <h2 className="font-serif text-sm uppercase tracking-wide text-gold2">
              Barre du héros
            </h2>
            <p className="mt-1 text-xs text-muted">
              Choisis les caractéristiques affichées dans la barre sticky. Si rien n’est choisi, les trois premières caractéristiques importantes s’affichent automatiquement.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {draft.stats.map((stat) => {
              const selectedIds = draft.heroBarStatIds ?? [];
              const checked = selectedIds.includes(stat.id);
              return (
                <label
                  key={stat.id}
                  className="flex items-center justify-between rounded-xl border border-line/70 bg-black/20 px-3 py-2 text-sm"
                >
                  <span className="min-w-0 truncate">
                    {stat.icon} {stat.name} {stat.current}
                    {stat.max !== undefined ? ` / ${stat.max}` : ""}
                  </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      const current = draft.heroBarStatIds ?? [];
                      setDraft({
                        ...draft,
                        heroBarStatIds: event.target.checked
                          ? [...current, stat.id]
                          : current.filter((id) => id !== stat.id),
                      });
                    }}
                    className="h-5 w-5 accent-gold"
                  />
                </label>
              );
            })}
          </div>
        </Panel>



        <Panel className="p-4">
          <div className="mb-3">
            <h2 className="font-serif text-sm uppercase tracking-wide text-gold2">
              Configuration des dés
            </h2>
            <p className="mt-1 text-xs text-muted">
              Choisis le type de dé de cette aventure. Le bouton Dés utilisera seulement cette configuration.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {dieOptions.map((sides) => (
              <button
                key={sides}
                onClick={() =>
                  setDraft({
                    ...draft,
                    diceConfig: { ...draft.diceConfig, sides },
                  })
                }
                className={`rounded-xl border px-2 py-2 font-serif text-sm ${draft.diceConfig.sides === sides ? "border-gold bg-gold/10 text-gold2" : "border-line bg-black/20 text-muted"}`}
              >
                d{sides}
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs text-muted">
            Le nombre de dés se choisit dans la fenêtre Dés au moment du lancer.
          </p>
        </Panel>

        <EditStatList
          title="Caractéristiques"
          items={draft.stats}
          add={addStat}
          edit={editStat}
          remove={deleteStat}
        />
        <EditStatList
          title="Ressources"
          items={draft.resources}
          add={addResource}
          edit={editResource}
          remove={deleteResource}
        />
        <EditTextList title="Notes rapides" items={draft.notes} />

        <button
          onClick={deleteAdventure}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-900/60 bg-red-950/30 py-3 text-red-200"
        >
          <Trash2 size={16} />
          Supprimer l’aventure
        </button>
      </div>
    </div>
  );
}

function EditStatList({
  title,
  items,
  add,
  edit,
  remove,
}: {
  title: string;
  items: Stat[];
  add: () => void;
  edit: (item: Stat) => void;
  remove: (id: string) => void;
}) {
  return (
    <Panel className="p-3">
      <div className="mb-2 flex justify-between">
        <h2 className="font-serif text-sm uppercase text-gold2">{title}</h2>
        <button onClick={add} className="text-sm text-gold">
          + Ajouter
        </button>
      </div>
      {items.length === 0 && (
        <p className="border-t border-line/60 py-3 text-sm text-muted">
          Aucun élément.
        </p>
      )}
      {items.map((it) => (
        <div
          key={it.id}
          className="flex items-center justify-between gap-3 border-t border-line/60 py-3 text-sm"
        >
          <span className="min-w-0 flex-1 truncate">
            {it.icon} {it.name} {it.current}
            {it.max !== undefined ? " / " + it.max : ""}
          </span>
          <span className="flex gap-3 text-gold">
            <button onClick={() => edit(it)}>✎</button>
            <button onClick={() => remove(it.id)}>
              <Trash2 size={15} />
            </button>
          </span>
        </div>
      ))}
    </Panel>
  );
}

function EditTextList({ title, items }: { title: string; items: string[] }) {
  return (
    <Panel className="p-3">
      <div className="mb-2 flex justify-between">
        <h2 className="font-serif text-sm uppercase text-gold2">{title}</h2>
        <span className="text-sm text-muted">Bientôt</span>
      </div>
      {items.length === 0 && (
        <p className="border-t border-line/60 py-3 text-sm text-muted">
          Aucun élément.
        </p>
      )}
      {items.map((it, i) => (
        <div key={i} className="border-t border-line/60 py-3 text-sm">
          {it}
        </div>
      ))}
    </Panel>
  );
}

