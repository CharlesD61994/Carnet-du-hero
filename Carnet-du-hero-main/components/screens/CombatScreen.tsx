import { Plus, Trash2 } from "lucide-react";
import type { Adventure, Monster } from "@/lib/types";
import { Fighter } from "@/components/ui/Fighter";
import { Header } from "@/components/ui/Header";
import { AdventureStatusBar } from "@/components/ui/AdventureStatusBar";
import { StickyHeaderGroup } from "@/components/ui/StickyHeaderGroup";
import { Panel } from "@/components/ui/Panel";

export function CombatScreen({
  adventure,
  onHeroClick,
  onLibrary,
  onOptions,
  dice,
  roll,
  addMonster,
  editMonster,
  deleteMonster,
  updateMonsterEndurance,
}: {
  adventure: Adventure;
  onHeroClick: () => void;
  onLibrary: () => void;
  onOptions: () => void;
  dice: number;
  roll: () => void;
  addMonster: () => void;
  editMonster: (monster: Monster) => void;
  deleteMonster: (id: string) => void;
  updateMonsterEndurance: (id: string, delta: number) => void;
}) {
  const heroEnd = adventure.stats.find((s) => s.name === "Endurance");
  return (
    <div>
      <StickyHeaderGroup>
      <Header
        title="Combat"
        back={onLibrary}
        onOptions={onOptions}
        right={
          <button
            onClick={addMonster}
            className="grid h-9 w-9 place-items-center rounded-xl text-gold active:bg-gold/10"
          >
            <Plus size={20} />
          </button>
        }
      />
      <AdventureStatusBar adventure={adventure} onHeroClick={onHeroClick} />
      </StickyHeaderGroup>
      <div className="space-y-4 p-4">
        <p className="text-center font-serif text-xs uppercase tracking-widest text-gold2">
          Combat en cours
        </p>
        <Fighter
          name={adventure.hero.name}
          portrait={adventure.hero.portrait}
          skill={adventure.stats[0]?.current ?? 0}
          end={heroEnd?.current ?? 0}
          max={heroEnd?.max ?? 20}
        />
        <div className="text-center font-serif text-gold">VS</div>
        {adventure.monsters.length === 0 ? (
          <Panel className="p-4 text-sm text-muted">
            Aucun monstre. Appuie sur + pour en ajouter un.
          </Panel>
        ) : (
          adventure.monsters.map((m) => (
            <Panel key={m.id} className="space-y-3 p-3">
              <Fighter
                name={m.name}
                portrait="👺"
                skill={m.skill}
                end={m.endurance}
                max={m.maxEndurance}
              />
              {m.note && (
                <p className="rounded-lg border border-line/60 bg-black/20 p-3 text-sm text-muted">
                  {m.note}
                </p>
              )}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateMonsterEndurance(m.id, -1)}
                  className="rounded-lg border border-line py-2 text-gold"
                >
                  − Endurance
                </button>
                <button
                  onClick={() => updateMonsterEndurance(m.id, 1)}
                  className="rounded-lg border border-line py-2 text-gold"
                >
                  + Endurance
                </button>
                <button
                  onClick={() => editMonster(m)}
                  className="rounded-lg border border-line py-2 text-sm text-gold"
                >
                  Modifier
                </button>
                <button
                  onClick={() => deleteMonster(m.id)}
                  className="rounded-lg border border-red-900/60 py-2 text-sm text-red-200"
                >
                  Supprimer
                </button>
              </div>
            </Panel>
          ))
        )}
        <Panel className="p-4">
          <h2 className="mb-3 font-serif text-sm uppercase tracking-wide text-gold2">
            Lancer les dés
          </h2>
          <div className="grid grid-cols-[1fr_5rem] overflow-hidden rounded-xl border border-line">
            <button onClick={roll} className="bg-panel2 p-5 text-left text-5xl">
              ⚂ ⚄
            </button>
            <div className="grid place-items-center border-l border-line text-4xl text-gold2">
              {dice}
            </div>
          </div>
        </Panel>
        <Panel className="p-4">
          <h2 className="mb-3 font-serif text-sm uppercase tracking-wide text-gold2">
            Historique du combat
          </h2>
          <p className="text-sm text-muted">
            Historique automatisé à venir. Pour l’instant, ajuste l’endurance
            manuellement.
          </p>
        </Panel>
      </div>
    </div>
  );
}
