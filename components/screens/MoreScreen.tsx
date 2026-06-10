import { Dice5, NotebookText, Pencil, Settings, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import type { Adventure, Screen } from "@/lib/types";
import { Header } from "@/components/ui/Header";
import { AdventureStatusBar } from "@/components/ui/AdventureStatusBar";
import { StickyHeaderGroup } from "@/components/ui/StickyHeaderGroup";
import { Panel } from "@/components/ui/Panel";

export function MoreScreen({ adventure, setScreen, onHeroClick, onLibrary }: { adventure: Adventure; setScreen: (screen: Screen) => void; onHeroClick: () => void; onLibrary: () => void }) {
  const items: { label: string; description: string; icon: ReactNode; screen: Screen }[] = [
    { label: "Héros", description: "Voir et ajuster la fiche complète.", icon: <UserRound />, screen: "sheet" },
    { label: "Notes", description: "Consulter les notes de lecture.", icon: <NotebookText />, screen: "notes" },
    { label: "Historique des dés", description: "Voir les lancers avec date et heure.", icon: <Dice5 />, screen: "diceHistory" },
    { label: "Modifier", description: "Modifier l’aventure et la feuille.", icon: <Pencil />, screen: "edit" },
  ];

  return (
    <div>
      <StickyHeaderGroup>
        <Header title="Options" back={onLibrary} right={<Settings size={18} />} />
        <AdventureStatusBar adventure={adventure} onHeroClick={onHeroClick} />
      </StickyHeaderGroup>
      <div className="space-y-3 p-4">
        {items.map((item) => (
          <button key={item.label} onClick={() => setScreen(item.screen)} className="w-full text-left">
            <Panel className="flex items-center gap-3 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-panel2 text-gold">
                {item.icon}
              </div>
              <div>
                <p className="font-serif text-base text-parchment">{item.label}</p>
                <p className="text-xs text-muted">{item.description}</p>
              </div>
            </Panel>
          </button>
        ))}
      </div>
    </div>
  );
}
