# Specification des bookProfiles pilotes

## Objectif

Preparer l'integration des profils de livres dans l'application sans encore modifier le comportement existant.

Cette specification transforme le rapport de normalisation en plan concret pour les trois profils pilotes:

- Defis Fantastiques 01 - Le Sorcier de la Montagne de Feu;
- Defis Fantastiques 52 - La Legende de Zagor;
- Defis Fantastiques 65 - Massacre a la Tronconneuse de Zombies.

Le profil actif doit devenir le mode de jeu de l'aventure. Il doit dire a l'application quelles statistiques afficher, quelles regles de creation utiliser, quel moteur de combat activer et quelles options d'inventaire/parcours proposer.

## Etat actuel de l'application

Les donnees principales sont dans `lib/types.ts`.

Une aventure contient deja:

- `system`;
- `diceConfig`;
- `stats`;
- `resources`;
- `items`;
- `journey`;
- `monsters`;
- `effects`.

Les profils doivent donc s'ajouter progressivement, sans casser les aventures existantes.

## Ajouts proposes au modele Adventure

Ajouter des champs optionnels pour garder la compatibilite avec les anciennes feuilles:

```ts
type Adventure = {
  // champs existants...
  profileId?: string;
  profileVersion?: number;
  rulesState?: RulesState;
};
```

`profileId` identifie le livre ou profil choisi.

`profileVersion` permettra de migrer les profils si la structure evolue.

`rulesState` garde les compteurs ou etats speciaux qui ne sont pas seulement des stats simples.

Exemple:

```ts
type RulesState = {
  time?: {
    elapsedHours?: number;
    elapsedDays?: number;
    currentDay?: string;
    deadlineDays?: number;
  };
  conditions?: ActiveCondition[];
  codes?: string[];
  counters?: Record<string, number>;
  selectedHeroId?: string;
};
```

## Nouveaux fichiers proposes

```txt
lib/bookProfiles/
  types.ts
  modules.ts
  profiles.ts
  fightingFantasy01.ts
  fightingFantasy52.ts
  fightingFantasy65.ts
```

### `types.ts`

Contient les types communs:

```ts
export type CombatEngine = "classic" | "horde";

export type BookProfile = {
  id: string;
  title: string;
  series: string;
  profileVersion: number;
  modules: ModuleId[];
  defaultDice: DiceConfig;
  characterCreation: CharacterCreationConfig;
  initialAdventure: InitialAdventureConfig;
  combat: CombatProfile;
  inventory?: InventoryProfile;
  journey?: JourneyProfile;
};
```

### `modules.ts`

Contient les identifiants normalises.

Exemples:

```ts
export type ModuleId =
  | "character.classic"
  | "character.pregenerated"
  | "stats.classicFF"
  | "resource.magic"
  | "combat.classicFF"
  | "combat.horde"
  | "inventory.basic"
  | "inventory.advancedItems"
  | "journey.itemEvents"
  | "condition.infection"
  | "weapon.damageDice";
```

### `profiles.ts`

Expose la liste des profils:

```ts
export const bookProfiles = [
  fightingFantasy01,
  fightingFantasy52,
  fightingFantasy65,
];
```

## Profil pilote 01

### But

Valider le profil Defis Fantastiques classique.

### Modules

```ts
[
  "character.classic",
  "stats.classicFF",
  "combat.classicFF",
  "inventory.basic",
  "journey.basic"
]
```

### Creation

- Habilete: 1d6 + 6.
- Endurance: 2d6 + 12.
- Chance: 1d6 + 6.
- Des par defaut: 2d6.

### Etat initial

- Stats: Habilete, Endurance, Chance.
- Ressources: Or, Provisions.
- Inventaire: vide ou equipement minimal selon choix de depart.
- Combat: moteur classique.

### Impact ecrans

- Creation: proposer generation classique.
- Fiche heros: afficher 3 stats + ressources.
- Combat: utiliser Force d'Attaque = 2d6 + Habilete.
- Inventaire: mode simple.

## Profil pilote 52

### But

Valider les profils avec choix de heros, formules conditionnelles et Magie.

### Modules

```ts
[
  "character.pregeneratedChoice",
  "stats.classicFF",
  "resource.magic",
  "combat.classicFF",
  "inventory.advancedItems",
  "magic.activation"
]
```

### Choix de heros

#### Anvar le Barbare

- Habilete: 1d6 + 6.
- Endurance: 1d6 + 18.
- Chance: 1d6 + 4.
- Magie: 1.

#### Braxus le Guerrier

- Habilete: 1d6 + 6.
- Endurance: 2d6 + 12.
- Chance: 1d6 + 3.
- Magie: 3.

#### Rablaix le Nain

- Habilete: 1d6 + 5.
- Endurance: 2d6 + 12.
- Chance: 1d6 + 5.
- Magie: 2.

#### Sallazar le Magicien

- Habilete: 1d6 + 4.
- Endurance: 3d6 + 6.
- Chance: 1d6 + 3.
- Magie: 7.

### Etat initial

- Stats: Habilete, Endurance, Chance.
- Ressources: Magie, Provisions.
- Provisions: 12 repas.
- Combat: moteur classique.

### Regles speciales a prevoir

- Certains objets demandent 1 point de Magie pour etre actives.
- Certains objets ou sorts sont reserves a Sallazar.
- Les armes magiques ne cumulent pas leurs bonus.

### Impact ecrans

- Creation: afficher le choix de personnage avant les stats.
- Fiche heros: afficher Magie dans les ressources.
- Inventaire: les objets peuvent avoir une condition de personnage ou un cout de Magie.
- Combat: reste classique.

## Profil pilote 65

### But

Valider un moteur de combat different.

### Modules

```ts
[
  "character.fixedFormula",
  "stats.enduranceOnly",
  "combat.horde",
  "weapon.damageDice",
  "inventory.weaponsAndAmmo",
  "condition.infection",
  "healing.medkits",
  "journey.killCounter"
]
```

### Creation

- Endurance: 2d6 + 20.
- Pas de Habilete classique.
- Pas de Chance classique.
- Le total d'Endurance peut depasser son total de depart.

### Etat initial

- Stats: Endurance.
- Ressources: Zombies tues, Argent, Nourriture.
- Inventaire: aucun objet au depart.
- Combat: moteur horde.

### Combat par hordes

Au lieu d'une Force d'Attaque:

- chaque zombie vaut generalement 1 Endurance;
- l'arme choisie donne une formule de Dommages;
- le total de Dommages indique combien de zombies sont tues;
- chaque zombie survivant inflige 1 point d'Endurance au heros.

Exemple:

```ts
weapon.damage = "1d6+5";
zombiesBefore = 14;
killed = roll(1d6) + 5;
zombiesAfter = zombiesBefore - killed;
heroDamage = zombiesAfter;
```

### Armes / munitions

- Une arme a feu demande les munitions compatibles.
- Les pistolets et armes similaires demandent des Balles.
- Les fusils demandent des Cartouches.
- Une fois le type de munition obtenu, on ne compte pas chaque tir.

### Soins

- Trousse de Soins: +4 Endurance, hors combat, puis l'objet est supprime.

### Infection

- Certaines morsures ou contacts sanguins peuvent transformer le heros en zombie.
- Selon le passage, cela peut etre une fin directe ou une condition speciale.

### Impact ecrans

- Creation: masquer Habilete et Chance.
- Fiche heros: afficher Endurance, Zombies tues, armes et soins.
- Combat: remplacer l'assaut classique par un calcul de Dommages contre une horde.
- Inventaire: afficher la formule de dommages des armes.

## Changements par ecran

### Nouvelle aventure

Ajouter une etape optionnelle apres le systeme:

1. Choisir le systeme.
2. Choisir un livre/profil si le systeme en propose.
3. Choisir le heros si le profil le demande.
4. Creer la feuille.

Pour ne pas alourdir l'interface:

- garder `Feuille personnalisee`;
- ajouter `Defis Fantastiques - profil classique`;
- ajouter plus tard une liste de livres.

### Fiche Heros

Lire `adventure.profileId`.

Si aucun profil:

- comportement actuel.

Si profil:

- stats et ressources viennent du profil;
- afficher les compteurs speciaux dans une section claire;
- garder les bonus d'objets portes deja en place.

### Inventaire

Ajouter progressivement:

- cout d'utilisation en ressource;
- condition de personnage;
- formule de Dommages pour armes du profil 65;
- munitions compatibles;
- objet de soin consomme.

### Combat

Introduire un petit routeur:

```ts
if (profile.combat.engine === "horde") {
  return <HordeCombatScreen />;
}

return <ClassicCombatScreen />;
```

Au depart, le combat actuel peut devenir le moteur classique.

Le moteur horde peut etre ajoute comme composant separe pour ne pas fragiliser le combat classique.

### Parcours

Les evenements deja presents peuvent etre reutilises.

A ajouter plus tard:

- evenement de changement de ressource speciale;
- evenement de temps ecoule;
- evenement de zombies tues;
- evenement d'infection;
- evenement de choix de heros.

## Migration et compatibilite

Les aventures existantes ne doivent pas changer.

Regle:

- si `profileId` est absent, l'application fonctionne comme aujourd'hui;
- si `profileId` est present, les nouvelles options s'activent;
- les anciens champs `stats`, `resources`, `items` restent la source visible de la feuille.

Cette approche evite de tout reecrire.

## Ordre d'implementation recommande

### Phase 1 - Base de donnees des profils

- Ajouter les types `BookProfile`.
- Ajouter les trois profils pilotes.
- Ajouter `profileId` et `rulesState` optionnels.
- Ne pas encore changer les ecrans de combat.

### Phase 2 - Creation d'aventure avec profil

- Permettre de choisir un profil.
- Generer stats/resources/items depuis le profil.
- Stocker `profileId`.

### Phase 3 - Profil 01

- Verifier que le profil classique reproduit le comportement actuel.
- Corriger les textes et accents si necessaire.

### Phase 4 - Profil 52

- Ajouter choix de personnage.
- Ajouter ressource Magie.
- Ajouter conditions simples sur objets.

### Phase 5 - Profil 65

- Creer le moteur de combat horde separe.
- Ajouter armes avec Dommages.
- Ajouter munitions compatibles.
- Ajouter compteur Zombies tues.

## Definition minimale de succes

La premiere version sera reussie si:

- une aventure sans profil fonctionne encore;
- une aventure Profil 01 cree une feuille classique propre;
- une aventure Profil 52 permet de choisir Anvar/Braxus/Rablaix/Sallazar;
- une aventure Profil 65 utilise Endurance + Dommages au lieu du combat classique;
- aucun profil ne force l'utilisateur a gerer des options inutiles.

