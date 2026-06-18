# Rapport de normalisation des profils de livres

## Objectif

Transformer les notes d'analyse des 65 livres Defis Fantastiques en structure utilisable par l'application, sans coder encore les profils definitifs.

Le but de cette etape est de passer de 130 modules bruts a un vocabulaire plus propre:

- familles de modules;
- options reutilisables;
- profils de livres plus courts;
- impact clair sur les ecrans de l'application.

## Constat general

La majorite des livres reposent sur un socle commun:

- Habilete;
- Endurance;
- Chance;
- combat par Force d'Attaque;
- provisions;
- inventaire;
- objets speciaux;
- parcours et notes.

Mais beaucoup de livres ajoutent une ou plusieurs couches:

- ressources speciales comme Foi, Honneur, Peur, Presence, Mutation, Volonte;
- suivi du temps en heures, jours ou calendrier;
- magie, sorts, disciplines ou pouvoirs;
- compagnons, montures, equipages ou allies;
- conditions comme poison, maladie, malediction, infection;
- objets a charges, objets portes, objets de quete ou objets incomplets;
- combats non standards, dont hordes de zombies, armes modernes ou combats de vehicules.

## Probleme a resoudre

Les modules bruts sont utiles pour ne rien perdre, mais ils ne devraient pas etre recopies tels quels dans le code.

Exemples:

- `Temps Ecoule`, `Fuite du Temps`, `Delai en jours`, `Calendrier local` et `Calendrier hebdomadaire` devraient etre regroupes sous une famille `time`.
- `Foi`, `Honneur`, `Presence`, `Mutation`, `Ferocite`, `Volonte` devraient devenir des ressources configurables.
- `Poison`, `Maladie`, `Malediction`, `Infection zombie` devraient devenir des conditions ou etats.
- `Compagnon`, `Monture`, `Equipage`, `Allie temporaire` devraient partager une logique d'acteurs associes au heros.

L'application doit donc avoir un systeme souple, mais pas 130 implementations separees.

## Familles proposees

### 1. Character

Tout ce qui touche a la creation du personnage.

Modules regroupes:

- creation classique;
- formules de des differentes;
- choix de heros;
- heros pretires;
- archetypes;
- profils veterans;
- personnage mort-vivant jouable.

Impact application:

- ecran de creation du heros;
- choix du livre;
- choix d'un personnage pretire;
- affichage des formules de generation;
- equipement et ressources de depart.

### 2. Stats

Les statistiques numeriques principales.

Modules regroupes:

- Habilete;
- Endurance;
- Chance;
- Force d'Attaque;
- Dommages;
- valeurs effectives avec bonus;
- maximums differents;
- regeneration ou restauration au total de depart.

Impact application:

- fiche heros;
- calculs de combat;
- affichage `Habilete 10 +1`;
- potions et soins;
- armes avec bonus.

### 3. Resources

Les ressources speciales propres a certains livres.

Exemples:

- Foi;
- Honneur;
- Peur;
- Presence;
- Mutation;
- Volonte;
- Magie;
- Ferocite;
- Points de Sang;
- Oeil de la Nuit;
- Poison comme compteur;
- Zombies tues.

Impact application:

- fiche heros adaptable;
- ressources affichees seulement si le livre les utilise;
- gains/pertes dans le Parcours;
- seuils ou consequences speciales.

### 4. Combat

Les variations du module de combat.

Sous-familles:

- combat Defis Fantastiques classique;
- plusieurs adversaires;
- cible principale;
- allie en combat;
- fuite;
- armes avec bonus;
- degats variables;
- combat par hordes;
- combat de vehicule;
- combat avec munitions;
- ennemis vulnerables a un type d'objet.

Impact application:

- l'ecran Combat doit choisir le moteur selon le profil du livre;
- certains livres gardent Force d'Attaque;
- le livre 65 utilise plutot Dommages et hordes;
- les objets portes ou utilises doivent modifier le combat automatiquement.

### 5. Inventory

Tout ce qui concerne les objets.

Sous-familles:

- objets simples;
- objets portes;
- objets utilisables;
- objets en combat;
- objets a charges;
- potions a mesures;
- objets de quete;
- objets incomplets ou en paire;
- armes et armures;
- munitions;
- contenants reutilisables;
- objets transformes apres usage.

Impact application:

- creation d'objets avancee;
- filtrage des objets utilisables en combat;
- equipement porte;
- evenements de Parcours quand un objet est utilise, perdu, transforme ou consomme.

### 6. Time

Tous les suivis temporels.

Sous-familles:

- temps ecoule en heures;
- temps ecoule en jours;
- delai avant echec;
- poison lent;
- calendrier local;
- calendrier hebdomadaire cyclique;
- recuperation quotidienne;
- actions qui coutent du temps.

Impact application:

- fiche heros ou panneau de suivi;
- bouton pour ajouter du temps;
- evenements automatiques dans le Parcours;
- avertissements quand un seuil approche.

### 7. Conditions

Etats temporaires ou permanents qui affectent le heros.

Sous-familles:

- poison;
- maladie;
- malediction;
- infection zombie;
- transformation;
- forme etheree;
- forme physique;
- vieillissement;
- faim obligatoire;
- perte d'equipement forcee.

Impact application:

- section Etats dans la fiche heros;
- effets automatiques sur les stats, soins ou choix;
- journalisation dans le Parcours;
- remedes ou conditions de fin.

### 8. Allies

Acteurs associes au heros.

Sous-familles:

- compagnon;
- allie temporaire;
- monture;
- equipage;
- inventaire partage;
- stockage sur selle;
- separation ou perte d'un allie.

Impact application:

- fiche compagnon;
- stats de compagnon si necessaire;
- objets disponibles tant que le compagnon est present;
- evenements de depart ou de mort.

### 9. Journey

Tout ce qui touche au suivi de paragraphe et au Parcours.

Sous-familles:

- evenement de combat;
- evenement d'objet utilise;
- evenement de ressource modifiee;
- mots codes;
- numeros notes;
- indices;
- rumeurs;
- choix proposes;
- carte et notes.

Impact application:

- le Parcours devient plus qu'un historique manuel;
- certains profils ajoutent automatiquement des evenements;
- l'utilisateur peut revoir les objets utilises, le temps perdu, les codes obtenus et les effets subis.

## Structure cible d'un BookProfile

Exemple conceptuel:

```ts
type BookProfile = {
  id: string;
  title: string;
  series: string;
  baseRules: string;
  modules: string[];

  characterCreation: {
    mode: 'classic' | 'pregenerated' | 'archetype' | 'custom';
    formulas?: Record<string, string>;
    pregeneratedHeroes?: unknown[];
  };

  stats: {
    primary: string[];
    resources: string[];
    maxRules?: Record<string, string>;
  };

  initialState: {
    inventory: unknown[];
    resources: Record<string, number | string>;
    gold?: string | number;
    provisions?: number;
  };

  combat: {
    engine: 'classic' | 'horde' | 'vehicle' | 'custom';
    options?: string[];
  };

  inventoryRules?: unknown;
  healingRules?: unknown;
  timeRules?: unknown;
  conditionRules?: unknown;
  journeyRules?: unknown;
};
```

Cette structure n'est pas definitive. Elle sert surtout a guider la suite.

## Profils pilotes recommandes

### Livre 01 - Le Sorcier de la Montagne de Feu

Pourquoi:

- profil classique;
- bon test du noyau Habilete / Endurance / Chance;
- provisions, potion, inventaire, combat simple.

Ce qu'il valide:

- creation classique;
- fiche heros classique;
- combat standard;
- inventaire de base.

### Livre 52 - La Legende de Zagor

Pourquoi:

- choix de heros;
- formules differentes selon personnage;
- Magie comme ressource;
- objets et sorts reserves.

Ce qu'il valide:

- profils de creation conditionnels;
- ressources speciales;
- magie;
- objets utilisables selon personnage.

### Livre 65 - Massacre a la Tronconneuse de Zombies

Pourquoi:

- combat completement different;
- pas de Habilete/Chance classique;
- armes modernes;
- Dommages;
- hordes;
- munitions;
- trousses de soins.

Ce qu'il valide:

- moteur de combat alternatif;
- armes a degats;
- munitions compatibles;
- compteur de zombies tues;
- soins modernes.

## Recommandation technique

Ne pas creer tout de suite 65 profils complets.

Ordre recommande:

1. Definir les familles de modules.
2. Creer une premiere structure `BookProfile`.
3. Coder seulement les 3 profils pilotes.
4. Adapter les ecrans touches: creation, fiche heros, combat, inventaire, parcours.
5. Tester avec les 3 profils.
6. Ensuite seulement, ajouter les autres livres par vagues.

## Impact sur l'application

Les profils modifieront plusieurs modules:

- Creation du personnage;
- Fiche Heros;
- Inventaire;
- Combat;
- Soins;
- Parcours;
- Etats speciaux;
- Temps/calendrier;
- Compagnons.

Le profil actif doit donc devenir le mode de jeu du carnet.

## Risques principaux

- Trop coder de cas speciaux trop vite.
- Melanger les notes brutes et les modules normalises.
- Rendre la creation d'objets trop complexe pour les livres simples.
- Modifier le combat classique en cassant les livres deja supportes.
- Oublier que plusieurs regles doivent rester optionnelles.

## Decision proposee

La meilleure prochaine etape apres ce rapport serait de creer un fichier de specification plus concret:

- `bookProfile.schema.ts` ou equivalent;
- une liste de modules normalises;
- trois profils pilotes;
- aucun remplissage massif des 65 livres avant validation.

