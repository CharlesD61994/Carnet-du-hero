import { useState } from "react";
import type { DiceConfig, NewAdventureData, System } from "@/lib/types";
import { defaultDiceConfigForSystem, systems } from "@/lib/templates";

const dieOptions: DiceConfig["sides"][] = [6, 10, 12, 20];

export function NewAdventureModal({
  onCancel,
  onCreate,
}: {
  onCancel: () => void;
  onCreate: (data: NewAdventureData) => void;
}) {
  const [title, setTitle] = useState("");
  const [heroName, setHeroName] = useState("");
  const [system, setSystem] = useState<System>("Feuille personnalisée");
  const [diceConfig, setDiceConfig] = useState<DiceConfig>(
    defaultDiceConfigForSystem("Feuille personnalisée"),
  );

  const selectSystem = (nextSystem: System) => {
    setSystem(nextSystem);
    setDiceConfig(defaultDiceConfigForSystem(nextSystem));
  };

  const submit = () => {
    onCreate({
      title: title.trim() || "Nouvelle aventure",
      heroName: heroName.trim() || "Héros",
      system,
      diceConfig: {
        ...diceConfig,
        count: diceConfig.mode === "single" ? 1 : Math.max(2, diceConfig.count),
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center">
      <div className="gold-frame max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-night p-4 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-serif text-xs uppercase tracking-[.18em] text-gold2">
              Nouvelle aventure
            </p>
            <h2 className="mt-1 font-serif text-2xl text-parchment">
              Créer une feuille
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="rounded-xl border border-line px-3 py-2 text-sm text-muted"
          >
            Fermer
          </button>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm text-muted">Titre</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex. La Crypte du Roi oublié"
              className="w-full rounded-xl border border-line bg-black/30 px-3 py-3 text-parchment outline-none focus:border-gold/60"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-muted">Nom du héros</span>
            <input
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              placeholder="Ex. Aric"
              className="w-full rounded-xl border border-line bg-black/30 px-3 py-3 text-parchment outline-none focus:border-gold/60"
            />
          </label>

          <div>
            <p className="mb-2 text-sm text-muted">Système</p>
            <div className="space-y-2">
              {systems.map((s) => (
                <button
                  key={s}
                  onClick={() => selectSystem(s)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left ${system === s ? "border-gold bg-gold/10 text-gold2" : "border-line bg-black/20 text-parchment"}`}
                >
                  <span>{s}</span>
                  <span className="text-gold">{system === s ? "●" : "○"}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line/70 bg-black/20 p-3">
            <p className="mb-2 font-serif text-sm uppercase tracking-wide text-gold2">
              Configuration des dés
            </p>
            <p className="mb-3 text-xs text-muted">
              Choisis le dé utilisé par cette aventure. Pendant la partie, le bouton Dés permettra seulement de lancer un dé ou plusieurs dés de ce type.
            </p>

            <div className="grid grid-cols-4 gap-2">
              {dieOptions.map((sides) => (
                <button
                  key={sides}
                  onClick={() => setDiceConfig({ ...diceConfig, sides })}
                  className={`rounded-xl border px-2 py-2 font-serif text-sm ${diceConfig.sides === sides ? "border-gold bg-gold/10 text-gold2" : "border-line bg-black/20 text-muted"}`}
                >
                  d{sides}
                </button>
              ))}
            </div>

            <p className="mt-3 text-xs text-muted">
              Le nombre de dés sera choisi directement dans la fenêtre Dés pendant la partie.
            </p>
          </div>

          <button
            onClick={submit}
            className="w-full rounded-xl border border-gold/50 bg-gold/15 py-3 font-serif text-gold2 active:scale-[.99]"
          >
            Créer l’aventure
          </button>
        </div>
      </div>
    </div>
  );
}
