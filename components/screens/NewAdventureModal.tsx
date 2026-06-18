import { useState } from "react";
import type { DiceConfig, NewAdventureData, System } from "@/lib/types";
import { defaultDiceConfigForSystem, systems } from "@/lib/templates";
import { bookProfiles, findBookProfile } from "@/lib/bookProfiles/profiles";

const dieOptions: DiceConfig["sides"][] = [6, 8, 10, 12, 20];
const defaultSystem = systems[systems.length - 1]!;

export function NewAdventureModal({
  onCancel,
  onCreate,
}: {
  onCancel: () => void;
  onCreate: (data: NewAdventureData) => void;
}) {
  const [title, setTitle] = useState("");
  const [heroName, setHeroName] = useState("");
  const [system, setSystem] = useState<System>(defaultSystem);
  const [diceConfig, setDiceConfig] = useState<DiceConfig>(
    defaultDiceConfigForSystem(defaultSystem),
  );
  const [profileId, setProfileId] = useState("");
  const [selectedHeroId, setSelectedHeroId] = useState("");

  const selectedProfile = findBookProfile(profileId);
  const profileHeroes =
    selectedProfile?.characterCreation.mode === "pregeneratedChoice"
      ? selectedProfile.characterCreation.heroes
      : [];
  const supportsBookProfiles = system.toLowerCase().includes("fantastiques");

  const selectSystem = (nextSystem: System) => {
    setSystem(nextSystem);
    setDiceConfig(defaultDiceConfigForSystem(nextSystem));
    if (!nextSystem.toLowerCase().includes("fantastiques")) {
      setProfileId("");
      setSelectedHeroId("");
    }
  };

  const selectProfile = (nextProfileId: string) => {
    const profile = findBookProfile(nextProfileId);
    setProfileId(nextProfileId);
    setDiceConfig(profile?.defaultDice ?? defaultDiceConfigForSystem(system));
    if (profile?.characterCreation.mode === "pregeneratedChoice") {
      setSelectedHeroId(profile.characterCreation.heroes[0]?.id ?? "");
    } else {
      setSelectedHeroId("");
    }
  };

  const submit = () => {
    onCreate({
      title: title.trim() || selectedProfile?.title || "Nouvelle aventure",
      heroName: heroName.trim(),
      system,
      profileId: profileId || undefined,
      selectedHeroId: selectedHeroId || undefined,
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
              Creer une feuille
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
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex. La Crypte du Roi oublie"
              className="w-full rounded-xl border border-line bg-black/30 px-3 py-3 text-parchment outline-none focus:border-gold/60"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-muted">Nom du heros</span>
            <input
              value={heroName}
              onChange={(event) => setHeroName(event.target.value)}
              placeholder="Ex. Aric"
              className="w-full rounded-xl border border-line bg-black/30 px-3 py-3 text-parchment outline-none focus:border-gold/60"
            />
          </label>

          <div>
            <p className="mb-2 text-sm text-muted">Systeme</p>
            <div className="space-y-2">
              {systems.map((availableSystem) => (
                <button
                  key={availableSystem}
                  onClick={() => selectSystem(availableSystem)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left ${system === availableSystem ? "border-gold bg-gold/10 text-gold2" : "border-line bg-black/20 text-parchment"}`}
                >
                  <span>{availableSystem}</span>
                  <span className="text-gold">
                    {system === availableSystem ? "*" : ""}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {supportsBookProfiles ? (
            <div>
              <p className="mb-2 text-sm text-muted">Profil de livre</p>
              <div className="space-y-2">
                <button
                  onClick={() => selectProfile("")}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left ${!profileId ? "border-gold bg-gold/10 text-gold2" : "border-line bg-black/20 text-parchment"}`}
                >
                  <span>Profil classique manuel</span>
                  <span className="text-gold">{!profileId ? "*" : ""}</span>
                </button>
                {bookProfiles.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => selectProfile(profile.id)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left ${profileId === profile.id ? "border-gold bg-gold/10 text-gold2" : "border-line bg-black/20 text-parchment"}`}
                  >
                    <span>
                      {profile.bookNumber ? `${profile.bookNumber}. ` : ""}
                      {profile.title}
                    </span>
                    <span className="text-gold">
                      {profileId === profile.id ? "*" : ""}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {profileHeroes.length ? (
            <div>
              <p className="mb-2 text-sm text-muted">Heros du livre</p>
              <div className="space-y-2">
                {profileHeroes.map((hero) => (
                  <button
                    key={hero.id}
                    onClick={() => setSelectedHeroId(hero.id)}
                    className={`w-full rounded-xl border px-3 py-3 text-left ${selectedHeroId === hero.id ? "border-gold bg-gold/10 text-gold2" : "border-line bg-black/20 text-parchment"}`}
                  >
                    <span className="block">{hero.name}</span>
                    <span className="mt-1 block text-xs text-muted">
                      {hero.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-2xl border border-line/70 bg-black/20 p-3">
            <p className="mb-2 font-serif text-sm uppercase tracking-wide text-gold2">
              Configuration des des
            </p>
            <p className="mb-3 text-xs text-muted">
              Choisis le de utilise par cette aventure. Pendant la partie, le
              bouton Des permettra de lancer un ou plusieurs des de ce type.
            </p>

            <div className="grid grid-cols-5 gap-2">
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
              Le nombre de des sera choisi directement dans la fenetre Des
              pendant la partie.
            </p>
          </div>

          <button
            onClick={submit}
            className="w-full rounded-xl border border-gold/50 bg-gold/15 py-3 font-serif text-gold2 active:scale-[.99]"
          >
            Creer l'aventure
          </button>
        </div>
      </div>
    </div>
  );
}
