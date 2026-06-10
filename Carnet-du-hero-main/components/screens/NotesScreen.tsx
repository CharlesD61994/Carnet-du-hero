import { Plus, Trash2 } from "lucide-react";
import type { Adventure } from "@/lib/types";
import { Header } from "@/components/ui/Header";
import { AdventureStatusBar } from "@/components/ui/AdventureStatusBar";
import { StickyHeaderGroup } from "@/components/ui/StickyHeaderGroup";
import { Panel } from "@/components/ui/Panel";

export function NotesScreen({
  adventure,
  addNote,
  onHeroClick,
  onLibrary,
  onOptions,
  editNote,
  deleteNote,
}: {
  adventure: Adventure;
  addNote: () => void;
  onHeroClick: () => void;
  onLibrary: () => void;
  onOptions: () => void;
  editNote: (index: number) => void;
  deleteNote: (index: number) => void;
}) {
  return (
    <div>
      <StickyHeaderGroup>
      <Header
        title="Notes"
        back={onLibrary}
        onOptions={onOptions}
        right={
          <button
            onClick={addNote}
            className="grid h-9 w-9 place-items-center rounded-xl text-gold active:bg-gold/10"
          >
            <Plus size={20} />
          </button>
        }
      />
      <AdventureStatusBar adventure={adventure} onHeroClick={onHeroClick} />
      </StickyHeaderGroup>
      <div className="space-y-3 p-4">
        {adventure.notes.length === 0 && (
          <Panel className="p-4 text-sm text-muted">
            Aucune note. Appuie sur + pour en ajouter une.
          </Panel>
        )}
        {adventure.notes.map((n, i) => (
          <Panel key={i} className="p-3">
            <div className="flex gap-3">
              <span className="mt-1 h-4 w-4 rounded border border-gold/60"></span>
              <p className="flex-1">{n}</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => editNote(i)}
                className="rounded-lg border border-line py-2 text-sm text-gold"
              >
                Modifier
              </button>
              <button
                onClick={() => deleteNote(i)}
                className="rounded-lg border border-red-900/60 py-2 text-sm text-red-200"
              >
                Supprimer
              </button>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
