import { Plus, Trash2 } from "lucide-react";
import type { Adventure, Category, Item } from "@/lib/types";
import { Header } from "@/components/ui/Header";
import { AdventureStatusBar } from "@/components/ui/AdventureStatusBar";
import { StickyHeaderGroup } from "@/components/ui/StickyHeaderGroup";
import { Panel } from "@/components/ui/Panel";

export function InventoryScreen({
  adventure,
  category,
  setCategory,
  addItem,
  onHeroClick,
  onLibrary,
  onOptions,
  editItem,
  deleteItem,
}: {
  adventure: Adventure;
  category: Category;
  setCategory: (c: Category) => void;
  addItem: () => void;
  onHeroClick: () => void;
  onLibrary: () => void;
  onOptions: () => void;
  editItem: (item: Item) => void;
  deleteItem: (id: string) => void;
}) {
  const filtered = adventure.items.filter((i) => i.kind === category);
  return (
    <div>
      <StickyHeaderGroup>
      <Header
        title="Inventaire"
        back={onLibrary}
        onOptions={onOptions}
        right={
          <button
            onClick={addItem}
            className="grid h-9 w-9 place-items-center rounded-xl text-gold active:bg-gold/10"
          >
            <Plus size={20} />
          </button>
        }
      />
      <AdventureStatusBar adventure={adventure} onHeroClick={onHeroClick} />
      <div className="border-b border-line/70 bg-night/95 px-4 pt-3 backdrop-blur-xl">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {(
            ["Objets", "Armes", "Armures", "Sorts", "Autres"] as Category[]
          ).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 pb-3 font-serif text-xs uppercase tracking-wide ${category === c ? "border-b-2 border-gold text-gold2" : "text-muted"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      </StickyHeaderGroup>
      <div className="space-y-4 p-4">
        <p className="font-serif text-sm text-gold2">
          Tous les {category.toLowerCase()}
        </p>
        <div className="space-y-2">
          {filtered.length === 0 && (
            <Panel className="p-4 text-sm text-muted">
              Aucun élément dans cette catégorie. Appuie sur + pour en ajouter
              un.
            </Panel>
          )}
          {filtered.map((i) => (
            <Panel key={i.id} className="p-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{i.icon}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-base">{i.name}</p>
                  <p className="text-xs text-muted">{i.subtitle}</p>
                </div>
                <p className="text-lg text-parchment">x{i.quantity}</p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => editItem(i)}
                  className="rounded-lg border border-line py-2 text-sm text-gold"
                >
                  Modifier
                </button>
                <button
                  onClick={() => deleteItem(i.id)}
                  className="rounded-lg border border-red-900/60 py-2 text-sm text-red-200"
                >
                  Supprimer
                </button>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </div>
  );
}
