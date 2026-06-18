# Profils de livres - notes de conception

Ce document sert de carnet de travail pour accumuler les regles extraites des livres avant de les transformer en profils reutilisables dans l'application.

Objectif: eviter de creer un systeme different pour chaque livre. Un livre devrait etre une combinaison d'un profil de base, de modules optionnels, de reglages propres au livre, et de listes d'objets/ressources/actions.

## Modules envisages

- Provisions
- Potion de depart
- Objets importants / objets requis
- Argent
- Boutiques et achats
- Jeux de hasard / mises
- Sorts ou pouvoirs a charges
- Magie contextuelle
- Magie libre hors combat
- Equipement porte
- Bonus d'arme non cumulables
- Combat a plusieurs ennemis
- Combat avec degats variables
- Combat avec modificateur temporaire
- Combat spatial
- Combat a distance / phaseur
- Equipe / compagnons
- Choix de groupe avant mission
- Remplacement de compagnon mort
- Tests de statistique personnalises
- Codes / mots-cles / rappels de paragraphe
- Ressources narratives
- Poison / maladie / antidote
- Protection contre illusions / peur / magie
- Objectifs de quete a ingredients

## Profil de base: Defis Fantastiques classique

### Statistiques

- Habilete
- Endurance
- Chance

### Creation du personnage

- Habilete: 1d6 + 6
- Endurance: 2d6 + 12
- Chance: 1d6 + 6

Les valeurs de depart doivent etre conservees comme maximums de reference. Les scores ne depassent normalement pas leur valeur de depart sauf indication speciale du livre.

### Combat

- Le monstre lance 2d6 + Habilete.
- Le heros lance 2d6 + Habilete.
- Le total le plus eleve gagne l'assaut.
- Si le heros gagne: le monstre perd 2 Endurance.
- Si le monstre gagne: le heros perd 2 Endurance.
- En cas d'egalite: aucun degat, nouvel assaut.
- Le combat continue jusqu'a ce que l'Endurance d'un combattant atteigne 0.

### Fuite

- Possible seulement si le paragraphe l'autorise.
- En general, la fuite inflige automatiquement 2 points de degats au heros.
- La Chance peut parfois etre utilisee pour reduire cette blessure, selon les regles habituelles.

### Chance

- Test: lancer 2d6.
- Si le resultat est inferieur ou egal a la Chance actuelle, le test reussit.
- Chaque tentative coute 1 point de Chance.

En combat:

- Si le heros vient de blesser le monstre:
  - reussite: degats augmentes;
  - echec: degats reduits.
- Si le heros vient d'etre blesse:
  - reussite: degats reduits;
  - echec: degats aggraves.

### Regles recurrentes vues dans le lot 1

- Une arme magique peut donner un bonus d'Habilete, mais le joueur ne peut pas cumuler les bonus de plusieurs armes.
- Les provisions restaurent generalement 4 Endurance et consomment 1 provision.
- Les repas peuvent etre limites par le texte: autorises seulement a certains moments dans certains livres, ou libres dans d'autres.
- Certaines rencontres utilisent plusieurs ennemis actifs: le heros choisit une cible principale, les autres peuvent seulement le blesser ou etre esquives.
- Plusieurs combats ajoutent un modificateur par assaut: souffle de feu, arme improvisee, combat a mains nues, ennemi invisible, poison, etc.
- Plusieurs paragraphes demandent de noter un numero de paragraphe pour revenir apres un combat ou une regle speciale. L'application devrait pouvoir enregistrer un "rappel de retour".
- Les objets peuvent etre requis pour debloquer une option, remplacer un combat, resoudre une rencontre, ou determiner la fin.

## Analyses par livre

### Livre: Defis Fantastiques 01 - Le Sorcier de la Montagne de Feu

#### Base

- Utilise le profil Defis Fantastiques classique.

#### Equipement initial

- Epee
- Bouclier
- Sac a dos
- Provisions
- Une potion de depart a choisir

#### Provisions

- Les provisions sont une ressource.
- Un repas restaure 4 Endurance.
- Un repas consomme 1 Provision.
- Un repas ne peut etre pris que lorsque le livre l'autorise.
- L'Endurance ne peut normalement pas depasser son niveau de depart.

#### Potion de depart

Le joueur choisit une seule potion au debut de l'aventure.

- Potion d'Adresse: restaure l'Habilete au niveau de depart.
- Potion de Vigueur: restaure l'Endurance au niveau de depart.
- Potion de Bonne Fortune: restaure la Chance au niveau de depart et augmente la Chance de depart de 1.

Chaque bouteille contient 2 mesures.

#### Mecaniques observees dans les paragraphes

- Objets requis pour progresser ou resoudre la fin, notamment des cles et certains objets speciaux.
- Paris et jeux de hasard avec pieces d'or.
- Tests directs contre une statistique, par exemple 2d6 <= Habilete pour enfoncer une porte.
- Effets de paragraphe qui retirent ou ajoutent directement Habilete, Endurance, Chance ou Provisions.
- Combats avec ennemis speciaux:
  - souffle de feu qui peut ajouter des pertes d'Endurance a chaque assaut;
  - ennemi invisible donnant bonus/malus et degats modifies;
  - groupes de squelettes ou ennemis affrontes par paires.
- Notes de retour: certains paragraphes demandent de noter un numero avant d'aller a une rencontre puis de revenir.

#### Implications application

- Module Provisions avec consommation seulement quand le paragraphe l'autorise.
- Module Potion de depart a deux charges.
- Module Objets importants / cles.
- Module Jeux de hasard simple.
- Module Combat avance: degats variables, bonus/malus par assaut, plusieurs ennemis actifs.
- Parcours: action "noter un rappel de paragraphe".

### Livre: Defis Fantastiques 02 - La Citadelle du Chaos

#### Base

- Utilise le profil Defis Fantastiques classique.

#### Difference principale

Ajoute un systeme de magie important.

#### Statistique / ressource Magie

- Magie: 2d6 + 6.
- Le score de Magie represente le nombre total de formules que le joueur peut choisir pour l'aventure.
- Les formules sont choisies librement dans une liste.
- Le joueur peut prendre plusieurs exemplaires d'une meme formule.
- Chaque utilisation consomme un exemplaire, meme si la formule echoue ou s'avere inutile.

#### Formules reperees

- Chance
- Copie conforme
- Endurance
- Faiblesse
- Feu
- Force
- Habilete
- Illusion
- Levitation
- Or du Sot
- Protection
- Telepathie

#### Formules de restauration

Certaines formules peuvent etre utilisees librement hors combat:

- Chance
- Endurance
- Habilete

Elles restaurent ou augmentent le score concerne selon une regle basee sur la moitie du score de depart, sans depasser le maximum initial.

#### Magie contextuelle

Plusieurs paragraphes proposent explicitement certaines formules. Certaines peuvent etre inefficaces, mais doivent quand meme etre rayees.

#### Equipement initial

- Epee
- Armure de cuir
- Lanterne
- Sac a dos

Contrairement au livre 1, les regles initiales relevees ne mettent pas l'accent sur les Provisions.

#### Mecaniques observees dans les paragraphes

- Sorts contextuels: le paragraphe propose parfois une liste de formules possibles.
- Sorts libres hors combat: restauration de stats utilisable sans invitation du paragraphe.
- Objets pouvant remplacer un sort ou ouvrir une option.
- Don ou perte d'objets et de pieces d'or.
- Amulette / objets portes pouvant probablement proteger ou modifier une situation.
- Combat avec fuite possible apres un nombre precis d'assauts.
- Combat avec allie ou cible aleatoire: un adversaire peut attaquer un allie ou le heros selon un jet.
- Jeux de hasard et argent.

#### Implications application

- Module Sorts a charges.
- Module "utilisable hors combat" distinct de "utilisable en combat".
- Module Magie contextuelle: dans un paragraphe, proposer seulement les sorts mentionnes.
- Module Objet ou sort comme solution alternative.
- Combat: fuite apres X assauts.
- Combat: allie temporaire et cible aleatoire.

### Livre: Defis Fantastiques 03 - La Foret de la Malediction

#### Base

- Utilise le profil Defis Fantastiques classique.

#### Equipement initial

- Epee
- Bouclier
- Sac avec Provisions
- Armure de cuir
- Lanterne
- Une potion de depart a choisir

#### Provisions

- Sac a dos avec 10 repas.
- Un repas restaure 4 Endurance.
- Dans ce livre, le texte des regles indique que le joueur peut se reposer et manger a n'importe quel moment, sauf pendant un combat.
- L'Endurance ne depasse pas le niveau de depart.

#### Potion de depart

Meme structure que les potions classiques:

- Adresse
- Vigueur
- Bonne Fortune
- 2 mesures

#### Objectif central

- Retrouver le marteau de Gillibran.
- Le heros recoit au debut 30 pieces d'or et une carte.
- Yaztromo vend des objets / protections magiques utiles dans la foret.

#### Mecaniques observees dans les paragraphes

- Boutique de depart importante: achat d'objets magiques avant l'aventure.
- Objets magiques a usage contextuel, par exemple anneaux, potions et protections.
- Poison et antidote: certains choix ou monstres peuvent empoisonner le heros; une Potion Antipoison peut annuler l'effet.
- Gaz toxique et autres dangers qui modifient directement Habilete/Endurance.
- Objet requis ou utile pour explorer certains lieux, par exemple un Anneau de Lumiere pour un tronc creux.
- Combats avec effets par assaut et ennemis aux attaques speciales.
- Le livre a un fort besoin de suivi d'objets importants, car le bon chemin depend beaucoup de ce qui a ete achete ou trouve.

#### Implications application

- Module Boutique initiale.
- Module Argent de depart.
- Module Objet magique contextuel.
- Module Poison / Antipoison.
- Module Provisions libres hors combat.
- Module Objectif de quete principal.
- Parcours: noter les achats et objets importants des le depart.

### Livre: Defis Fantastiques 04 - La Galaxie Tragique

#### Profil distinct

Ce livre ne suit pas simplement le profil Defis Fantastiques classique. Il conserve des jets proches, mais ajoute un cadre de vaisseau, equipage, combat spatial et combat au phaseur.

#### Ressources du vaisseau

- Force de Frappe: 1d6 + 6.
- Boucliers de Defense: 1d6 + 12.
- Si les Boucliers de Defense tombent a 0 et que le vaisseau est touche, le vaisseau est detruit.

#### Personnage et equipage

Le joueur est le Commandant du vaisseau Voyageur.

Chaque membre important de l'equipage a:

- Habilete: 1d6 + 6.
- Endurance: 2d6 + 12.

Roles utiles:

- Commandant
- Officier Scientifique
- Officier Medical
- Officier Ingenieur
- Officier de Securite
- Agents de Securite

#### Chance

- Le livre utilise aussi une Chance, calculee par 1d6 + 6.
- La Chance est moins centrale dans les extraits observes que dans les DF classiques.

#### Choix de groupe

- Lors des debarquements, le joueur choisit souvent 2 ou 3 membres d'equipage.
- Seuls les membres emmenees peuvent aider sur la planete.
- Les roles influencent les solutions disponibles: scientifique, medical, ingenieur, securite.

#### Mort / remplacement d'un officier

- Si un officier ou agent meurt ou disparait, il est raye.
- Un assistant remplace le role.
- L'assistant a une Habilete reduite: total initial du membre remplace -2.
- Son Endurance est relancee normalement.
- L'assistant ne peut pas debarquer sur les planetes et ne peut pas participer aux missions de surface.
- Il ne peut exister qu'un seul remplacant par poste.

#### Combat corps a corps

Le paragraphe 342 donne les regles internes:

- Similaire au combat DF classique.
- 2d6 + Habilete de chaque cote.
- Le plus eleve touche.
- Egalite: pas de degat, on recommence.
- Degats standards: -2 Endurance.
- Les non-combattants qui se battent subissent un malus de -3 Habilete pendant l'affrontement.

#### Combat au phaseur

Le paragraphe 343 donne les regles internes:

- Le phaseur peut etre regle sur "paralyser" ou "tuer".
- Un tir utilise 2d6 compare a l'Habilete, avec modificateurs eventuels de taille, distance, mobilite, etc.
- Si le resultat est inferieur a l'Habilete, la cible est touchee.
- Si le resultat est superieur ou egal, le tir rate.
- Les ennemis armes a distance peuvent riposter.
- Les non-combattants subissent aussi le malus de -3 Habilete.

#### Combat spatial

Le paragraphe 341 donne les regles internes:

- Les vaisseaux tirent chacun leur tour.
- Sauf indication contraire, le vaisseau du joueur tire en premier.
- Pour toucher: lancer 2d6 et obtenir un resultat strictement inferieur a la Force de Frappe.
- Si le tir touche, lancer 2d6 pour les degats contre les Boucliers de Defense ennemis.
- Resultat <= Boucliers: 2 points de degats.
- Resultat > Boucliers: 4 points de degats.
- Double 6: 6 points de degats automatiques.
- Le combat continue jusqu'a ce que les Boucliers d'un vaisseau tombent a 0.

#### Mecaniques observees dans les paragraphes

- Choix de planete / exploration.
- Missions avec selection d'equipage.
- Tests relies au role de l'equipage.
- Blessures ou disparition de membres.
- Reparation possible du vaisseau: restaurer Force de Frappe et Boucliers.
- Objets technologiques qui donnent des bonus, par exemple un objet porte donnant +1 Habilete.
- Combat au phaseur avec distance, cible aleatoire ou plusieurs tireurs.
- Combat spatial avec vaisseaux ennemis ayant Force de Frappe et Boucliers.

#### Implications application

- Nouveau profil "Defis Fantastiques science-fiction / vaisseau".
- Module Vaisseau: Force de Frappe, Boucliers, degats spatiaux.
- Module Equipage: fiches de compagnons, roles, stats, statut vivant/disparu/remplace.
- Module Choix de mission: selectionner les compagnons emmenes.
- Module Combat au phaseur: paralyser/tuer, test sous Habilete, modificateurs.
- Module Combat spatial separe du combat normal.
- Module Reparation du vaisseau.
- Parcours: enregistrer debarquement, membres choisis, pertes d'equipage, reparations.

### Livre: Defis Fantastiques 05 - La Cite des Voleurs

#### Base

- Utilise le profil Defis Fantastiques classique.

#### Equipement initial

- Epee
- Bouclier
- Sac a dos avec Provisions
- Armure de cuir
- Lanterne
- Une potion de depart a choisir

#### Provisions

- Sac a dos avec 10 repas.
- Un repas restaure 4 Endurance.
- Repas libres hors combat selon les regles lues.

#### Potion de depart

Meme structure que les potions classiques:

- Adresse
- Vigueur
- Bonne Fortune
- 2 mesures

#### Objectif central

- Trouver Nicodeme au Port du Sable Noir.
- Vaincre Zanbar Bone / le Prince de la Nuit.
- Le heros recoit au debut 30 pieces d'or et une epee speciale de Owen Carralif.
- Plusieurs objets ou ingredients sont necessaires pour la fin.

#### Objets et conditions importantes

Elements reperes:

- Laissez-passer de marchand pour entrer ou circuler.
- Fleur de lotus.
- Cheveux de Sorciere.
- Perles noires.
- Tatouage avec soleil jaune et licorne blanche.
- Anneaux speciaux: Feu, Glace, Invisibilite, Oeil d'Or.
- Fleche d'argent.
- Miroir / objets reflechissants.
- Articles en argent.

Le texte peut exiger une combinaison ou selection d'ingredients, pas seulement la possession d'un objet.

#### Mecaniques observees dans les paragraphes

- Ville avec achats, boutiques, prix et monnaies.
- Entrees conditionnelles: payer, posseder un laissez-passer, donner un objet, soudoyer.
- Objets qui remplacent un combat ou neutralisent un ennemi.
- Ingredients de quete a combiner.
- Combat a plusieurs ennemis actifs: deux chiens, plusieurs gardes.
- Degats variables: certains ennemis infligent 3 Endurance, souffle de feu, combat a mains nues avec malus, arme improvisee.
- Jeux de hasard avec mises.
- Vols ou pertes d'objets / argent.
- Objets pris au hasard ou demandes par le texte.
- Tatouage comme condition narrative durable.

#### Implications application

- Module Ville / boutiques.
- Module Argent de depart.
- Module Objet requis et objectif de quete.
- Module Combinaison d'ingredients.
- Module Condition narrative durable: tatouage, laissez-passer, marque, titre, etc.
- Module Combat a plusieurs ennemis actifs.
- Module Vol / perte d'objets.
- Module Objet anti-ennemi: objet qui remplace un combat ou change une issue.
- Parcours: evenement achat, vol, tatouage, obtention d'indice, objet utilise.

### Livre: Defis Fantastiques 06 - Le Labyrinthe de la Mort

#### Base

- Utilise le profil Defis Fantastiques classique.

#### Equipement initial

- Epee
- Armure de cuir
- Sac a dos avec Provisions
- Une potion de depart a choisir

#### Provisions

- 10 repas.
- Repas utilisables a n'importe quel moment sauf en combat.
- Un repas restaure 4 Endurance.

#### Potion de depart

- Adresse
- Vigueur
- Bonne Fortune
- 2 mesures

#### Objectif central

- Participer a l'Epreuve des Champions dans le Labyrinthe de la Mort.
- Le heros est un concurrent parmi plusieurs autres.
- La recompense annoncee est tres elevee, mais elle sert surtout de contexte narratif.

#### Mecaniques observees dans les paragraphes

- Donjon tres piege: nombreuses morts instantanees ou effets directs.
- Objets de survie contextuels: tube en bois, corde, poignard, potions speciales, anneau, livre lu auparavant, etc.
- Certains objets doivent avoir ete obtenus ou utilises avant une scene pour changer l'issue.
- Combats a plusieurs ennemis actifs, avec cible principale et ennemis secondaires.
- Combats avec malus d'Habilete temporaire: mains nues, fatigue, obscurite, perte d'arme.
- Effets persistants: perte d'epee, provisions mouillees ou detruites, objets brises par un PNJ.
- Concurrents/PNJ recurrents, notamment Throm, qui peut accompagner ou interagir avec le heros.
- Potions speciales hors liste classique, par exemple potion de mimetisme.

#### Implications application

- Module Donjon/pieges: evenement de mort instantanee ou echec de quete.
- Module Objet contextuel obligatoire.
- Module Etat d'objet: detruit, perdu, mouille, inutilisable.
- Module PNJ recurrent / compagnon temporaire.
- Module Combat avec malus temporaire ou perte d'arme.

### Livre: Defis Fantastiques 07 - L'Ile du Roi Lezard

#### Base

- Utilise le profil Defis Fantastiques classique.

#### Equipement initial

- Epee
- Sac a dos avec Provisions
- Armure de cuir
- Lanterne
- Une potion de depart a choisir

#### Provisions

- 10 repas.
- Repas libres hors combat.
- Un repas restaure 4 Endurance.

#### Objectif central

- Atteindre l'ile du Roi Lezard.
- Liberer ou aider des prisonniers/esclaves.
- Vaincre le Roi Lezard et l'influence du Gonchong.

#### Mecaniques observees dans les paragraphes

- Voyage et exploration d'ile avec rencontres de prisonniers, tribus, hommes-lezards et creatures.
- Objets ou indices specifiques contre le Roi Lezard: peur des singes, armes ou aides particulieres.
- Presence d'allies et de prisonniers a secourir.
- Combat a mains nues ou sans pouvoir degainer, avec malus de Force d'Attaque.
- Effets de potion negatifs ou durables, par exemple maladresse qui peut faire perdre automatiquement le premier assaut d'un futur combat.
- Combats a plusieurs ennemis actifs.
- Objets qui modifient durablement le heros ou donnent une option plus tard.

#### Implications application

- Module Compagnons / prisonniers / allies.
- Module Condition durable negative: maladresse, malediction, perte d'arme au debut du combat.
- Module Objet/indice anti-boss.
- Module Combat sans arme ou malus automatique.

### Livre: Defis Fantastiques 08 - Le Marais aux Scorpions

#### Base

- Utilise le profil Defis Fantastiques classique, mais avec structure de carte beaucoup plus ouverte.

#### Equipement initial

- Epee
- Cotte de mailles
- Quelques Pieces d'Or
- Sac a dos pour tresors

Le livre ne met pas les Provisions au centre comme les livres 1, 3, 5, 6 et 7.

#### Difference principale

Le livre donne le droit de revenir sur ses pas. Les clairieres sont numerotees, reliees par des directions cardinales, et le joueur doit cartographier le marais.

#### Quetes

- Le joueur choisit entre trois quetes possibles au debut.
- La fin depend du patron choisi et du succes/echec de la mission.
- Les noms reperes dans les paragraphes incluent Gayolard, Stratagus et Pompatarte.

#### Magie

Le livre utilise des Pierres de Magie:

- Chaque pierre permet de lancer un sort une seule fois.
- La pierre se desintegre apres usage.
- Le joueur peut posseder plusieurs pierres du meme type.
- Les pierres sont reparties en categories: neutres, benefiques, malefiques.
- Certains sorciers ne donnent pas toutes les categories.

Types reperes:

- Habilete
- Endurance
- Chance
- Feu
- Glace
- Illusion
- Amitie
- Benediction
- Terreur
- Fletrissure
- Malediction

#### Mecaniques observees dans les paragraphes

- Carte ouverte: retour possible dans des clairieres deja visitees.
- Les ennemis blesses peuvent rester dans une clairiere; si le joueur revient, le combat peut reprendre avec l'Endurance restante.
- Direction d'entree/sortie importante: nord, sud, est, ouest.
- Anneau de Cuivre: indique toujours le nord et chauffe en presence d'un etre malfaisant.
- Patron/quete choisie: certaines fins demandent a quel patron on sert.
- Sorts consommables contextuels: certaines pierres fonctionnent seulement dans des situations adaptees.

#### Implications application

- Module Carte ouverte / lieux revisites.
- Module Etat de lieu: ennemis restants, objets deja pris, evenement deja resolu.
- Module Combat persistant: sauvegarder l'Endurance restante d'un ennemi si le joueur fuit.
- Module Quete initiale / patron choisi.
- Module Sorts par objets consommables.
- Module Directions cardinales.

### Livre: Defis Fantastiques 09 - La Sorciere des Neiges

#### Base

- Utilise le profil Defis Fantastiques classique.

#### Equipement initial

- Epee
- Sac a dos avec Provisions
- Armure de cuir
- Lanterne
- Une potion de depart a choisir

#### Provisions

- 10 repas.
- Repas libres hors combat.
- Un repas restaure 4 Endurance.

#### Objectif central

- Partir d'une mission de chasse au Yeti.
- Entrer dans les cavernes de la Sorciere des Neiges.
- Survivre a la suite du voyage avec des compagnons et conditions durables.

#### Mecaniques observees dans les paragraphes

- Compagnons importants: Meynaf et Stubb.
- Certains compagnons peuvent aider, mourir ou etre affectes par une condition.
- Esclaves et colliers d'obeissance dans les cavernes.
- Anneaux et talismans portes donnant bonus ou protections.
- Talisman de Courage: bonus d'Habilete et protection dans certains cas.
- Anneau contre le froid: protection narrative et bonus de Chance observe.
- Fuite apres un nombre precis d'assauts dans certains combats.
- Combats a plusieurs ennemis actifs.
- Effets par assaut, par exemple gaz congelant.
- Poison, point d'eau empoisonne, morsures, pertes directes d'Endurance/Habilete.
- Sortilege de Mort / condition durable narrative qui peut tuer un personnage avec le temps.

#### Implications application

- Module Compagnons avec statut: present, separe, mort, affecte.
- Module Condition durable: sortilege, maladie, poison, froid, peur.
- Module Objet porte protecteur.
- Module Fuite apres X assauts.
- Module Degats/effets elementaires par assaut.

### Livre: Defis Fantastiques 10 - Le Manoir de l'Enfer

#### Profil distinct

Ce livre differe clairement des DF classiques.

#### Creation du personnage

- Habilete, Endurance et Chance restent presentes.
- Le heros commence sans arme, sans provisions et sans potion.
- L'Habilete de depart est reduite de 3 tant que le heros n'a pas d'arme.
- Le total d'Habilete original doit etre conserve comme maximum / reference.

#### Peur

- Peur Maximale: 1d6 + 6.
- Total de Peur commence a 0.
- Certaines scenes ajoutent des points au Total de Peur.
- Certaines circonstances peuvent reduire le Total de Peur, par exemple repos ou situation speciale.
- Si le Total de Peur atteint la Peur Maximale, le heros meurt de peur.

#### Equipement initial

- Aucun equipement utile au depart.
- Les armes trouvees plus tard augmentent l'Habilete de depart selon leur valeur.
- Le mot ARME est signale comme categorie importante.

#### Mecaniques observees dans les paragraphes

- Ambiance horreur avec nombreux messages, mots de passe, recommandations et numeros de reference a noter.
- Objets tres contextuels: clef, cognac, arme, nourriture, indices.
- Combat avec degats variables: certains ennemis infligent 3 ou 4 Endurance selon Chance.
- Fuite possible dans certains combats.
- Repos ou recuperation possible pour Endurance et/ou Peur.
- Pas de provisions standard; la nourriture est trouvee ponctuellement.

#### Implications application

- Module Peur: jauge cumulative avec maximum et mort si seuil atteint.
- Module Profil sans equipement de depart.
- Module Arme qui restaure/augmente l'Habilete effective jusqu'au maximum original.
- Module Notes importantes: mots de passe, messages, numeros de reference.
- Module Repos: reduire Peur et/ou restaurer Endurance.

### Livre: Defis Fantastiques 11 - Le Talisman de la Mort

#### Base

- Utilise largement le profil Defis Fantastiques classique.
- Monde distinct: Orbus.

#### Equipement initial

- Epee
- Sac a dos avec Provisions
- Torches
- Armure de cuir
- Une potion de depart a choisir

#### Mecaniques observees

- Combat a plusieurs ennemis actifs explicitement decrit dans les regles.
- Provisions et potions classiques.
- Objets importants et talisman central lie a la quete.
- Le livre insiste sur notes, carte, choix de chemin et evenements de destin.
- Presence de magie et de pouvoirs dans le monde, mais pas de systeme de magie joueur complet dans les regles initiales relevees.

#### Implications application

- Profil DF classique avec objets de quete.
- Module Torches / ressource simple possible.
- Module Objet central de quete.

### Livre: Defis Fantastiques 12 - Le Mercenaire de l'Espace

#### Profil distinct

Science-fiction en mission d'infiltration dans un vaisseau spatial.

#### Statistiques

- Habilete
- Endurance
- Chance
- Protection

#### Protection

- Protection: 1d6 + 6.
- La combinaison spatiale peut absorber un coup.
- Quand le heros est touche par certaines armes, lancer 2d6.
- Si le resultat est inferieur ou egal a la Protection actuelle, la combinaison absorbe le coup.
- Si le resultat est superieur, le heros est blesse.
- Chaque test de Protection coute 1 point de Protection, comme la Chance.

#### Choix des armes

- Le joueur lance 1d6 pour obtenir un budget de points.
- Il doit prendre un Pistolet-Laser ou un Desintegrateur avant tout autre achat.
- Achat possible:
  - Pistolet-Laser;
  - Desintegrateur;
  - Grenades Spatiales;
  - Charges d'Antimatiere;
  - points de Protection supplementaires.

#### Combat arme

- Pistolet-Laser: degats fixes de 2 Endurance.
- Desintegrateur: degats variables de 1d6 Endurance.
- Grenade Spatiale: degats de 1d6 a chaque cible presente, seulement si le texte l'autorise.
- Charge d'Antimatiere: objet explosif contextuel tres puissant, surtout contre obstacles/portes.
- Combat a mains nues conserve une base proche du DF classique.
- Si le heros est sans arme dans un combat arme, ses coups infligent un bonus particulier observe dans les regles.

#### Soin

- Pilules de Vigueur.
- 4 pilules de depart.
- Chaque pilule restaure 5 Endurance.
- Ne depasse pas l'Endurance de depart.

#### Implications application

- Module Protection consommable.
- Module Creation avec budget d'equipement.
- Module Combat arme moderne.
- Module Arme avec degats fixes ou variables.
- Module Grenade multi-cibles.
- Module Explosif contextuel.
- Module Soin a charges.

### Livre: Defis Fantastiques 13 - Le Combattant de l'Autoroute

#### Profil distinct

Post-apocalyptique avec vehicule.

#### Statistiques du heros

- Habilete
- Endurance
- Chance

#### Vehicule

La voiture est centrale.

Stats relevees:

- Puissance de Feu: 1d6 + 6.
- Blindage: 2d6 + 24.

La Puissance de Feu mesure a la fois le moteur et l'armement. Le Blindage mesure la defense du vehicule.

#### Equipement du vehicule

- Mitrailleuses a munitions illimitees.
- 4 roquettes.
- 3 boites de clous pour crever les pneus.
- Pulvérisateur d'huile avec 2 reservoirs.
- Essence / ravitaillements a suivre.
- Transformations et accessoires du vehicule a noter.

#### Combats

- Le livre distingue plusieurs types de combat:
  - combat rapproche;
  - combat a distance / fusillade;
  - combat motorise.
- Les armes speciales du vehicule sont utilisables seulement quand le texte l'autorise.

#### Objectif central

- Transporter des cereales/grain jusqu'a San Angelo.
- Ramener un camion-citerne rempli d'essence vers Nouvelle Esperance.

#### Implications application

- Module Vehicule.
- Module Combat motorise.
- Module Ressource carburant/essence.
- Module Armes de vehicule a charges.
- Module Accessoires de vehicule.
- Module Mission de transport / cargaison.

### Livre: Defis Fantastiques 14 - Le Temple de la Terreur

#### Base

- Utilise le profil Defis Fantastiques classique.

#### Equipement initial

- Epee
- Bouclier
- Sac a dos avec Provisions
- Une potion de depart a choisir

#### Provisions

- 10 repas.
- Repas seulement quand le livre l'autorise.
- Un repas restaure 4 Endurance.

#### Magie

- Yaztromo enseigne une selection de sortileges.
- Sorts reperes dans les regles/narration:
  - Ouverture des Portes;
  - Sommeil de la Creature;
  - Fleche Magique;
  - Langage;
  - Lecture des Symboles;
  - Lumiere;
  - Feu;
  - Saut;
  - Detection des Pieges;
  - Creation d'Eau.

#### Objectif central

- Empecher Malbordus d'utiliser des statuettes de Dragon.
- Trouver/detruire les statuettes.

#### Implications application

- Module Sorts appris au depart.
- Module Sorts contextuels.
- Module Objets de quete multiples a trouver/detruire.
- Module Provisions restreintes par autorisation du texte.

### Livre: Defis Fantastiques 15 - Les Trafiquants de Kelter

#### Profil distinct

Science-fiction policiere avec vaisseau et credits.

#### Statistiques

- Habilete
- Endurance
- Chance
- Armement du vaisseau
- Defense du vaisseau

#### Vaisseau

- Armement: 1d6 + 6.
- Defense: 1d6.
- Si la Defense tombe a 0, le vaisseau explose.

#### Combat arme

- 2d6 sous Habilete pour toucher.
- Si le heros touche: l'adversaire perd 4 Endurance.
- Si l'adversaire touche: le heros perd 4 Endurance.
- Combats brefs et meurtriers.

#### Combat entre vaisseaux

- Desintegrateurs: un vaisseau touche perd 1 Defense.
- Missiles a Tete Chercheuse: 2 missiles de depart.
- Un missile touche automatiquement et detruit le vaisseau cible, quel que soit son total de Defense.
- Le joueur peut parfois utiliser desintegrateurs et missile dans le meme assaut.

#### Soin et argent

- 4 Pilules de Stimuline au depart.
- Chaque pilule restaure 5 Endurance.
- 5 000 Credits au depart.

#### Implications application

- Module Vaisseau simplifie: Armement/Defense.
- Module Missiles a charges avec destruction automatique.
- Module Combat arme moderne a degats fixes de 4.
- Module Credits.
- Module Soin a charges.

### Livre: Defis Fantastiques 16 - Defis Sanglants sur l'Ocean

#### Profil distinct

Piraterie avec equipage, butin, temps limite et combat de groupe.

#### Statistiques du heros

- Habilete
- Endurance
- Chance

#### Equipage

Le joueur est capitaine de la Terrifiante.

Stats de l'equipage:

- Combativite: 1d6 + 6.
- Force d'equipage: 2d6 + 6.

La Force d'equipage represente le nombre et la resistance des hommes. Si elle tombe a 0, l'aventure est terminee.

#### Combat de groupe

Utilise quand l'equipage combat, ou quand un adversaire a Combativite/Force au lieu d'Habilete/Endurance.

- 2d6 + Combativite de chaque cote.
- Si l'equipage gagne l'assaut: l'adversaire perd 2 Force.
- Si l'adversaire gagne: l'equipage perd 2 Force.
- Egalite: pas de degat.

#### Livre de Bord

- Le temps est une ressource.
- Les voyages et actions ajoutent des jours.
- Le joueur doit surveiller le nombre de jours ecoules pour remporter le pari contre Abdul le Sanguinaire.

#### Butin

- Le Butin est une ressource centrale.
- Il inclut l'or et les esclaves dans les regles du livre.
- Le joueur commence avec 20 pieces d'or.

#### Implications application

- Module Equipage avec statistiques propres.
- Module Combat de groupe.
- Module Temps / jours ecoules.
- Module Butin / score de pillage.
- Module Carte maritime / choix de destination.

### Livre: Defis Fantastiques 17 - Rendez-vous avec la M.O.R.T.

#### Profil distinct

Super-heros moderne avec pouvoirs, indices et score de reussite.

#### Statistiques

- Habilete
- Endurance
- Chance

#### Superpouvoirs

Le joueur choisit un seul superpouvoir au depart. La solution et les scenes accessibles changent selon ce choix.

Pouvoirs reperes:

- Superforce: Habilete de depart fixee a 13 et capacite de voler.
- Pouvoirs Psi: lecture des pensees, influence mentale, telekinesie; chaque usage coute 2 Endurance.
- AMI: accessoires miniaturises d'intervention dans une ceinture.
- Souffle d'Energie: decharges d'energie.

#### Indices

- Deux indices de depart.
- Des indices supplementaires peuvent etre obtenus en arretant des criminels ou en resolvant des pistes.
- Certains criminels ou lieux ne sont accessibles qu'avec les bons indices.

#### Points de Reussite

- Score separe de la survie.
- Gagne lors de victoires ou resolutions d'enigmes.
- Sert a comparer les performances entre parties et entre superpouvoirs.

#### Equipement special

- Crimmontre: communication avec la police et Gaston l'Indic.
- Peut declencher des informations ou evenements.

#### Implications application

- Module Pouvoir initial exclusif.
- Module Pouvoir a cout d'Endurance.
- Module Gadgets / ceinture d'accessoires.
- Module Indices.
- Module Score de reussite.
- Module Communication / alerte narrative.

### Livre: Defis Fantastiques 18 - La Planete Rebelle

#### Profil distinct

Science-fiction d'infiltration interplanetaire.

#### Statistiques

- Habilete
- Endurance
- Chance

#### Contexte mecanique

- Le joueur voyage seul comme negociant.
- Le vaisseau sert au deplacement, mais les regles lues indiquent qu'il n'y a pas de combat spatial.
- Le vaisseau est protege contre les dangers ordinaires de l'espace, sauf evenements narratifs.

#### Equipement et argent

- Epee laser de depart.
- 2 000 credits de depart.
- Sac antigravitationnel limite a 6 objets sans penalite.
- L'equipement trop suspect peut causer des problemes aux controles planetaires.

#### Combat

- Combat arme proche du DF classique avec epee laser.
- Combat a mains nues possible si le joueur perd son arme ou quand le texte l'impose.
- En combat a mains nues, le heros peut tuer ou neutraliser instantanement sur un 6 apres un assaut victorieux: regle de Mort Subite.
- Cette regle ne profite normalement qu'au heros, sauf indication speciale.

#### Mission

- Detruire l'Ordinateur central d'Arcadion.
- Rechercher un code numerique manquant.
- Voyager entre plusieurs planetes sous couverture commerciale.

#### Implications application

- Module Infiltration / couverture.
- Module Argent en credits.
- Module Sac a capacite limitee.
- Module Controle d'equipement suspect.
- Module Combat a mains nues avec mort subite.
- Module Code numerique de mission.
- Module Voyage interplanetaire sans combat spatial.

### Livre: Defis Fantastiques 19 - Les Demons des Profondeurs

#### Base

- Utilise le profil Defis Fantastiques classique.

#### Equipement initial

- Sabre
- Armure de cuir
- Sac avec Provisions

#### Provisions

- 10 repas.
- Repas libres sauf pendant les combats.
- Un repas restaure 4 Endurance.

#### Particularite principale

Le debut de l'aventure transforme le heros pour l'exploration sous-marine:

- le heros obtient des branchies;
- il peut respirer sous l'eau;
- les provisions restent intactes malgre l'eau de mer.

#### Mecaniques observees

- Exploration sous-marine.
- Objets et monnaies sous-marines: Perles Noires, objets aquatiques.
- Nombreux objets contextuels, par exemple Poisson-Lampion, Poisson-Outil, sabre magique.
- Certains combats se terminent apres un nombre de blessures plutot qu'a 0 Endurance.
- Interaction avec pirates, sorciere et creatures marines.

#### Implications application

- Module Transformation durable.
- Module Milieu special: sous l'eau.
- Module Respiration / capacite narrative.
- Module Monnaie alternative: Perles Noires.
- Module Combat a condition de fin speciale.

### Livre: Defis Fantastiques 20 - L'Epee du Samourai

#### Base

- Utilise le profil Defis Fantastiques classique avec modules de discipline et honneur.

#### Equipement initial

- Deux sabres
- Sac avec Provisions

#### Provisions

- 10 repas.
- Repas libres sauf pendant un combat.
- Un repas restaure 4 Endurance.

#### Disciplines de samourai

Le joueur choisit une discipline au depart.

- Kyujutsu: ajoute un arc et 12 fleches de plusieurs types.
  - 3 fleches en bois de saule: 2 Endurance.
  - 3 fleches-harpons: 3 Endurance.
  - 3 fleches perforantes: 2 Endurance, necessaires contre certains adversaires.
  - 3 fleches hurleuses: 1 Endurance, effet de peur/bruit.
  - Tir: 2d6 sous Habilete pour toucher.
- Iaijutsu: au premier assaut d'un combat, touche automatiquement et inflige 3 Endurance.
- Karumijutsu: saut acrobatique utilisable quand le texte le permet.
- Ni-to-Kenjutsu: combat avec katana et wakizashi; si le joueur obtient 9 ou plus aux des lors d'une attaque, il peut enchainer une seconde attaque avant la riposte, mais pas une troisieme.

#### Honneur

- Honneur de depart: 3.
- Certains actes augmentent ou reduisent l'Honneur.
- Certaines actions dependent du niveau d'Honneur.
- Si l'Honneur tombe a 0, aller immediatement au paragraphe 99.

#### Objectif central

- Rechercher la Dai-Katana.

#### Implications application

- Module Discipline initiale exclusive.
- Module Honneur.
- Module Munitions par types.
- Module Attaque automatique au premier assaut.
- Module Attaque supplementaire conditionnelle.
- Module Action disponible selon niveau d'Honneur.

### Livre: Defis Fantastiques 21 - L'Epreuve des Champions

#### Base

- Utilise le profil Defis Fantastiques classique.
- Suite thematique du Labyrinthe de la Mort.

#### Equipement initial

- Epee
- Bouclier
- Sac avec Provisions
- Potion de depart classique probable selon les regles lues.

#### Provisions

- 10 repas.
- Repas classiques de 4 Endurance.

#### Particularites observees

- Le heros commence comme esclave/galerien avant l'epreuve.
- Structure de donjon/arena avec concurrents.
- Nombreux pieges, objets contextuels, enigmes et combats.
- Certains soins proviennent d'objets trouves, par exemple pate curative.

#### Implications application

- Profil DF classique avec module Donjon/pieges.
- Module Concurrents / PNJ d'epreuve.
- Module Objet contextuel de survie.

### Livre: Defis Fantastiques 22 - La Grande Menace des Robots

#### Profil distinct

Science-fiction avec robots pilotables.

#### Statistiques du heros

- Habilete
- Endurance
- Chance

#### Robots

Le joueur peut piloter certains robots, un seul a la fois.

Stats d'un robot:

- Defense: equivalent de l'Endurance du robot.
- Vitesse: Lente, Moyenne, Rapide, Tres Rapide pour certains robots volants.
- Bonus de Combat: modificateur positif ou negatif applique a l'Habilete du heros pendant qu'il pilote le robot.
- Caracteristiques particulieres: notes ou capacites propres au modele.

#### Combat avec un robot

- Utilise si le joueur pilote un robot, affronte un grand robot ou un dinosaure, ou si l'adversaire a Defense/Habilete/Vitesse.
- 2d6 + Habilete + bonus de robot + eventuel bonus de vitesse.
- Le robot le plus rapide donne +1 a la Force d'Attaque.
- Si la vitesse du robot du joueur est inferieure a celle de l'adversaire, la fuite peut etre impossible meme si le paragraphe la propose.
- Les degats retirent de la Defense au lieu de l'Endurance.

#### Equipement initial

- Epee.
- 5 pilules de Vigueur.

#### Implications application

- Module Robot pilotable.
- Module Vitesse qualitative.
- Module Combat robot avec Defense au lieu d'Endurance.
- Module Bonus de combat lie au vehicule/robot.
- Module Capacites de modele a noter.
- Module Pilules de soin a charges.

### Livre: Defis Fantastiques 23 - Les Sceaux de la Destruction

#### Base

- Semble rester proche du profil Defis Fantastiques classique.

#### Mecaniques observees

- Provisions et potions classiques presentes.
- Forte presence de magie, pouvoirs, dieux/sceaux et objets de quete.
- Le titre et les occurrences indiquent un objectif lie a des sceaux a trouver/proteger/detruire.
- Besoin de notes, codes/mots et objets speciaux.

#### Implications application

- Profil DF classique avec objets de quete multiples.
- Module Sceaux / objectifs multiples.
- Module Notes de mots/codes.
- A approfondir dans une passe plus fine avant codage.

### Livre: Defis Fantastiques 24 - La Creature venue du Chaos

#### Profil atypique

Le joueur incarne une creature monstrueuse, pas un aventurier ordinaire.

#### Statistiques

- Habilete
- Endurance
- Chance

#### Combat

Les degats sont asymetriques:

- Quand la creature-joueur blesse un adversaire: l'adversaire perd 2 Endurance.
- Quand un adversaire blesse la creature-joueur: le joueur perd seulement 1 Endurance.

#### Mort instantanee

- Si le joueur obtient un double en lancant les des de Force d'Attaque, il tue instantanement l'adversaire.
- Cette regle represente un coup de patte mortel.

#### Combat contre plusieurs adversaires

- Le joueur choisit une cible principale.
- Il peut blesser seulement cette cible.
- Les autres adversaires comparent leur Force d'Attaque a celle du joueur et peuvent le blesser.

#### Provisions / soins

- Pas de Provisions au depart.
- Le joueur peut regagner de l'Endurance de diverses manieres, parfois en mangeant ce qu'il trouve.
- Certains objets ou aliments ne sont pas compris comme tels par la creature.

#### Particularites narratives

- Creature issue de la marrangha / mutations.
- Compréhension progressive du monde.
- Signes, mots de passe et choix instinctifs importants.
- Objets dont la valeur ou la fonction n'est pas forcement comprise par le personnage.

#### Implications application

- Module Profil creature.
- Module Degats recus reduits.
- Module Mort instantanee sur double.
- Module Inventaire avec comprehension partielle.
- Module Langage / signes / mots de passe.
- Module Soins par nourriture improvisee.

### Livre: Defis Fantastiques 25 - La Forteresse du Cauchemar

#### Profil distinct leger

Base DF classique avec une statistique supplementaire importante.

#### Statistiques

- Habilete
- Endurance
- Chance
- Volonte

#### Volonte

- Volonte: 1d6 + 6.
- Si la Volonte tombe sous 6, le heros sombre dans la folie et l'aventure prend fin.
- La Volonte represente la resistance psychique face aux horreurs, au desespoir et aux mauvaises surprises.

#### Equipement initial

- Epee
- Armure
- Sac
- Tres peu d'argent
- Pas de provisions au depart.

#### Soins / repas

- Le heros peut trouver de la nourriture pendant l'aventure.
- Un repas restaure 4 Endurance.
- Possibilite de partager un repas avec un PNJ, ce qui peut reduire le soin recu.

#### Combat

- Base DF classique.
- Mention d'Armes Speciales pouvant aggraver une blessure.
- Certains objets, potions ou armes donnent des effets temporaires.

#### Implications application

- Module Volonte.
- Module Echec si ressource descend sous seuil.
- Module Depart sans provisions.
- Module Partage de repas avec compagnon/PNJ.
- Module Arme speciale.

### Livre: Defis Fantastiques 26 - La Crypte du Sorcier

#### Base

- Utilise le profil Defis Fantastiques classique.
- Aventure de quete avec arme finale obligatoire.

#### Statistiques

- Habilete
- Endurance
- Chance

#### Equipement initial / depart

- Les regles suivent le cadre classique.
- Yaztromo fournit une Potion de Guerison.
- La Potion de Guerison contient 5 doses.
- Chaque dose restaure 4 points d'Endurance.

#### Objectif central

- Arreter Razaak, necromancien revenu d'entre les morts.
- Recuperer ou utiliser l'arme capable de le detruire.
- L'arme speciale liee a Razaak est indispensable pour la resolution finale.

#### Mecaniques observees

- Aide exceptionnelle de Suma, qui agit comme une intervention narrative limitee.
- Compagnons ou allies ponctuels pouvant aider dans certaines sequences.
- Nombreux morts-vivants, zombies, poison et effets de necromancie.
- Enigmes et reponses numeriques liees a des paragraphes.
- Objets de quete qui deviennent plus importants que leur simple presence dans l'inventaire.

#### Implications application

- Module Potion a charges fixes.
- Module Objet final obligatoire.
- Module Intervention d'allie a usage limite.
- Module Compagnons simples.
- Module Enigme / reponse numerique.

### Livre: Defis Fantastiques 27 - Le Chasseur des Etoiles

#### Profil distinct

- Profil science-fiction.
- Base proche du Defis Fantastiques classique, mais avec Peur, Temps, arme speciale et epreuves physiques.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Peur
- Temps

#### Mission / compte a rebours

- Sauver Xerin, president de la Federation.
- Delai narratif: quarante-huit heures avant l'echec.
- Le Temps est une ressource de mission.
- Si le Temps tombe a 0, les Gromulans obtiennent les codes de defense et la mission echoue.

#### Equipement / armes

- Englueur: arme non letale qui immobilise la cible.
- L'Englueur peut eviter certains combats.
- Son taux d'echec est important.
- Code pour contacter des androides-espions.

#### Mecaniques observees

- Les Gromulans utilisent l'illusion et l'Hallucinoscope.
- Certains androides ont un point faible.
- Contre des androides, un double 6 peut permettre de decouvrir le point faible et de terminer le combat.
- Certaines epreuves utilisent Habilete ou Endurance comme valeur d'exploit, sans reduire le total reel.
- Peur comme ressource de pression ou de danger psychologique.

#### Implications application

- Module Temps / compte a rebours.
- Module Peur.
- Module Arme non letale avec chance d'echec.
- Module Ennemis avec point faible.
- Module Illusion / fausse menace.
- Module Epreuves physiques separees.

### Livre: Defis Fantastiques 28 - Les Spectres de l'Angoisse

#### Profil distinct

- Base Defis Fantastiques avec magie shamanique.
- Le personnage est un Elfe des Bois et shaman protecteur.
- Le livre alterne monde reel et Monde des Reves.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Pouvoir: 2d6 + 6

#### Pouvoir / magie

- Le Pouvoir sert a lancer les sortileges.
- Le Pouvoir sert aussi a agir dans le Monde des Reves.
- Le heros connait plusieurs sorts au depart.
- Chaque sort coute 1 point de Pouvoir.
- Un sort dure environ un quart d'heure.
- Les sorts ne sont utilisables en combat que si le texte l'autorise.

#### Equipement / provisions / potion

- Epee Telessa.
- Sac a dos.
- Cotte de cuir souple.
- Pas de provisions au depart.
- Nourriture a trouver ou cueillir en route.
- Une seule potion au choix.
- La potion ne peut pas etre utilisee en combat.

#### Mecaniques observees

- Reves premonitoires.
- Monde des Reves comme espace de jeu complet avec choix et rencontres.
- Combats de reve bases sur le Pouvoir plutot que l'Endurance physique.
- Certaines consequences de reve peuvent affecter le monde reel au reveil.
- Repos, sommeil et reve peuvent regenerer ou modifier le Pouvoir.

#### Implications application

- Module Pouvoir.
- Module Magie a cout de ressource.
- Module Effets temporaires de sort.
- Module Monde alternatif / reve.
- Module Combat mental ou onirique.
- Module Provisions non initiales.

### Livre: Defis Fantastiques 29 - Les Rodeurs de la nuit

#### Profil distinct

- Base Defis Fantastiques orientee voleur.
- Aventure d'infiltration, cambriolage et epreuve de Guilde.

#### Statistiques

- Habilete
- Endurance
- Chance

#### Talents Inavouables

- Le joueur choisit 3 Talents Inavouables au depart.
- Talents reperes:
  - Decrypteur;
  - Monte-en-l'Air;
  - Crocheteur;
  - Vide-Gousset;
  - Cache-Tampon.
- Le joueur ne doit pas pretendre posseder un talent non choisi.

#### Equipement / inventaire

- Epee.
- Bouclier.
- Armure de cuir.
- Provisions.
- Potion classique au choix.
- Limite de 6 objets dans le sac.
- Provisions et potion comptent comme objets.
- Arme, cuirasse et pieces d'or ne comptent pas comme objets speciaux.
- Certains objets peuvent etre portes hors du sac.

#### Mecaniques observees

- Infiltration dans le Port du Sable Noir.
- Tests ou choix lies au crochetage, a l'escalade, au vol, a la fouille et a la discretion.
- Objets caches ou proteges par des serrures/pieges.
- Ville criminelle avec factions, guildes et lieux a revisiter.

#### Implications application

- Module Talents choisis.
- Module Capacite inventaire avec exceptions.
- Module Infiltration / actions de voleur.
- Module Objet hors sac.
- Module Ville criminelle / factions.

### Livre: Defis Fantastiques 30 - Le Gouffre de la Cruaute

#### Profil distinct

- Base Defis Fantastiques modifiee.
- Quete avec aide surnaturelle limitee, artefacts et objectifs nommes.

#### Statistiques

- Habilete
- Endurance
- Chance

#### Equipement initial

- Epee de Lumiere.
- Armure de cuir.
- Cape.
- Pas de potion classique au depart.
- 5 repas au depart.

#### Provisions

- Un repas restaure 4 Endurance.
- Certains repas cuisines peuvent restaurer 2 points d'Endurance supplementaires.

#### Aide speciale: Tabasha

- Tabasha peut etre appelee comme aide speciale.
- 9 recours disponibles.
- Peut restaurer l'Habilete.
- Peut restaurer la Chance.
- Peut parfois augmenter la Chance de depart.

#### Objectifs / artefacts

- Liste des sept Khuddams a barrer un par un.
- Bouclier / Grands Sceaux / Epee de Lumiere comme artefacts centraux.
- Codes secrets presents dans certains passages.

#### Mecaniques observees

- Combat special au bord d'un gouffre.
- Chaque camp lance les des.
- Le plus faible tombe.
- Egalite = relancer.
- Certaines resolutions sont instantanees plutot que des combats classiques.

#### Implications application

- Module Aide limitee a charges.
- Module Objectifs nommes a cocher.
- Module Combat special instantane.
- Module Repas ameliore.
- Module Codes secrets.
- Module Artefacts de quete.

### Livre: Defis Fantastiques 31 - L'Empire des Hommes-Lezards

#### Base

- Utilise le profil Defis Fantastiques classique.
- Mission militaire dans un contexte de siege.

#### Statistiques

- Habilete
- Endurance
- Chance

#### Equipement initial

- Epee.
- Couteau de chasse.
- Cuirasse legere.
- Manteau.
- 4 rations de provisions.
- Choix de 2 objets parmi 3 objets herites du pere.
- Objets reperes dans le choix: arc avec trois fleches d'argent, potion de guerison, globe de verre.

#### Provisions / potion

- Seulement 4 rations au depart.
- Possibilite de trouver de la nourriture dans la jungle.
- La potion de guerison a 2 utilisations.
- Chaque usage restaure 1d6 + 2 Endurance.

#### Objectif / contexte

- Sauver Vymorna du siege des Hommes-Lezards.
- Telak le Porte-Glaive intervient dans le recit comme puissance divine ou protectrice.

#### Mecaniques observees

- Choix d'objets initial limite.
- Munitions limitees avec les fleches d'argent.
- Rationnement important.
- Mission militaire sous pression.
- Aide divine narrative.

#### Implications application

- Module Choix d'objets initial.
- Module Munition limitee.
- Module Potion a restauration variable.
- Module Rations faibles + cueillette.
- Module Intervention divine narrative.

### Livre: Defis Fantastiques 32 - Les Esclaves de l'Eternite

#### Base

- Utilise le profil Defis Fantastiques classique.
- Ajoute une course contre la montre et un pouvoir de combat lie a l'epee.

#### Statistiques

- Habilete
- Endurance
- Chance

#### Equipement initial

- Epee de Fangtane.
- Armure de cuir.
- Sac pour provisions et tresors.
- 5 pieces d'or.

#### Pouvoir de combat: Coup Mortel

- Si le joueur obtient un double 6 pendant un combat, il inflige un Coup Mortel.
- Le Coup Mortel termine immediatement le combat.
- Le pouvoir fonctionne seulement avec l'epee.
- Si l'epee est perdue, le pouvoir est perdu.

#### Temps / Sablier du Destin

- Le joueur coche des cases du Sablier du Destin.
- Les cases representent le temps qui passe.
- Certaines cases contiennent un numero.
- Quand une case numerotee est cochee, le joueur note le paragraphe actuel et va immediatement au paragraphe indique.

#### Mecaniques observees

- Bouclier de Barolo: +1 Habilete en combat.
- Certains combats interdisent l'epee ou le bouclier.
- Restrictions contextuelles d'equipement.
- Course contre la montre liee a Kallamere.

#### Implications application

- Module Coup Mortel.
- Module Capacite liee a un objet equipe.
- Module Sablier du Destin.
- Module Evenement automatique sur progression du temps.
- Module Restriction contextuelle d'equipement.

### Livre: Defis Fantastiques 33 - Le Justicier de l'Univers

#### Profil distinct

- Profil science-fiction.
- Base Defis Fantastiques + combat spatial avance.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Credits
- Cachets-Repas

#### Equipement / ressources initiales

- 10 Cachets-Repas.
- 10 credits.
- Vaisseau spatial associe au heros.

#### Combat contre creatures

- Tres proche du combat classique.
- La Chance peut etre utilisee dans les combats contre creatures.
- La Chance ne s'applique pas au combat spatial.

#### Combat spatial

- Un combat spatial se declenche si l'adversaire possede:
  - NIVEAU;
  - LASERS;
  - ECRANS.
- NIVEAU represente la maitrise du pilotage.
- L'ordre de tir depend du NIVEAU.
- Pour toucher, on lance 1 de et on compare aux LASERS.
- Un tir reussi retire 2 ECRANS.

#### Manoeuvres de vaisseau

- Certaines sequences utilisent des coefficients de tangage, roulis et lacet.
- L'objectif est d'aligner les coefficients du vaisseau avec ceux de l'adversaire.
- L'ordinateur de bord, le radar et les antidedecteurs peuvent proposer ou ouvrir des choix tactiques.

#### Implications application

- Module Combat spatial avance.
- Module Vaisseau: Niveau, Lasers, Ecrans.
- Module Ordre d'action par stat technique.
- Module Manoeuvres de vaisseau.
- Module Nourriture futuriste.
- Module Credits.

### Livre: Defis Fantastiques 34 - Le Voleur d'Ames

#### Base

- Utilise le profil Defis Fantastiques classique.
- Aventure magique dans l'Empire des Illusions.

#### Statistiques

- Habilete
- Endurance
- Chance

#### Magie / sortileges

- Le heros n'est pas principalement un magicien.
- La magie vient surtout d'objets ou de sortileges appris.
- Sortilege Rompt-la-Peur utilisable une seule fois.
- Sortilege Rompt-l'Illusion repere.

#### Equipement / objets

- Objets contextuels importants: levier, cotte de mailles, pierres, encens, plume, statuette.
- Cotte de mailles: +1 Habilete sauf si l'Habilete initiale est deja tres elevee.

#### Objectif central

- Sauver Alsander.
- Explorer le domaine de Mordranez.
- L'Empire des Illusions demande de cartographier et memoriser les lieux.

#### Mecaniques observees

- Attaques par la peur pouvant infliger un malus temporaire d'Habilete.
- Anti-peur et anti-illusion comme solutions contextuelles.
- Carte de donjon fortement recommandee.
- Fausses routes et secteurs dangereux.

#### Implications application

- Module Sort a usage unique.
- Module Malus temporaire de peur.
- Module Anti-illusion.
- Module Bonus conditionnel plafonne.
- Module Carte de donjon.

### Livre: Defis Fantastiques 35 - Le Vampire du Chateau Noir

#### Profil distinct

- Base Defis Fantastiques gothique.
- Ajoute Foi, afflictions, reliques et conditions speciales contre les vampires.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Foi: 1d6 + 3

#### Foi

- La Foi mesure la purete du coeur et la confiance dans les forces du Bien.
- La Foi peut depasser son total initial.
- Une Foi elevee peut repousser certaines creatures.
- Une Foi elevee peut aussi rendre le heros plus facile a reperer par des creatures malefiques.

#### Afflictions

- Les Afflictions sont des handicaps surnaturels.
- Elles peuvent venir de sortileges, maledictions ou envoutements.
- Elles sont notees au crayon.
- Elles peuvent etre levees si le texte le permet.

#### Equipement / objets anti-vampire

- Crucifix d'argent.
- Ecran de la Foi.
- Pieu.
- Epee magique Astre Polaire.
- Eau benite.

#### Mecaniques observees

- Detruire le vampire exige une combinaison:
  - une relique sacree;
  - une arme adaptee.
- Certaines scenes donnent un nombre limite d'actions avant le retour d'un ennemi.
- Exemples d'actions: boire une potion, manger, liberer quelqu'un, lancer un sort.

#### Implications application

- Module Foi.
- Module Afflictions.
- Module Condition de destruction par combinaison d'objets.
- Module Relique sacree.
- Module Actions limitees dans une scene.

### Livre: Defis Fantastiques 36 - La Nuit des Mutants

#### Base

- Utilise le profil Defis Fantastiques classique.
- Aventure autour d'une porte vers un autre monde, de guerriers-esclaves et de transformations.

#### Statistiques

- Habilete
- Endurance
- Chance

#### Equipement / provisions

- Epee.
- Bouclier.
- Sac a dos.
- Seulement 2 repas au depart.
- Repos et repas seulement quand le texte l'autorise.

#### Equipement obtenu en cours de recit

- Potion de Clairvoyance.
- Laissez-passer.
- 10 pieces d'or.
- 5 repas supplementaires.

#### Mecaniques observees

- Enigmes ou codes sur inscriptions.
- Porte ancienne capable de deformation, permutation et epreuve corporelle/mentale.
- Guerriers-esclaves et creatures mutantes.
- Choix moral: aider ou non certaines creatures.
- Certains objets servent surtout d'autorisation ou de preuve.

#### Implications application

- Module Provisions tres limitees.
- Module Gain d'equipement en cours d'introduction.
- Module Laissez-passer / autorisation.
- Module Code et inscription.
- Module Transformation/alteration narrative.

### Livre: Defis Fantastiques 37 - Les Sombres Cohortes

#### Profil distinct

- Base Defis Fantastiques + commandement d'armee.
- Le joueur gere a la fois le heros et des unites militaires.

#### Statistiques

- Habilete
- Endurance
- Chance

#### Equipement / provisions

- Pas de provisions au depart.
- Recuperation d'Endurance possible autrement au cours de l'aventure.

#### Armee

- Le heros commande une armee.
- Unites reperees:
  - Nains;
  - Elfes;
  - guerriers;
  - chevaliers;
  - autres recrues possibles.
- Les soldats perdus le sont par groupes de cinq.
- Si plusieurs types d'unites participent, le joueur choisit quelles unites subissent les pertes.

#### Combat d'escarmouche

- Comparer le nombre de soldats allies et ennemis.
- Determiner une situation: inferieure, egale ou superieure.
- Lancer 1 de et consulter une table de pertes.
- Deduir les pertes.
- Si les soldats du heros sont tous tues, le heros meurt dans la bataille.

#### Mecaniques observees

- Combats singuliers classiques pour le heros.
- Demoralisation possible de l'armee.
- Arcs elfes: nombre d'Elfes x2, puis ajustement par les des.
- Mort ou transformation du heros peut provoquer la fin de la campagne militaire.

#### Implications application

- Module Armee.
- Module Unites par race/type.
- Module Pertes par groupes.
- Module Combat d'escarmouche.
- Module Moral/Demoralisation.
- Module Attaque d'unite speciale.

### Livre: Defis Fantastiques 38 - L'Elu des Six Clans

#### Profil distinct

- Base Defis Fantastiques + poison progressif + objectifs de clans.
- Le livre ajoute une structure de pelerinage, medaillons et labyrinthes.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Poison
- Or

#### Equipement / provisions / potion

- 10 repas au depart.
- Potion classique unique au choix.
- 6 pieces d'or.
- Une piece d'or est cousue dans une botte comme piece porte-bonheur.
- La piece porte-bonheur ne doit etre utilisee que si le texte le demande.

#### Poison

- Le poison est represente par une silhouette a cocher.
- Le poison gagne de proche en proche.
- Chaque nouvelle unite doit etre contigue a une zone deja infectee.
- Si toute la silhouette est infectee, l'aventure est terminee.

#### Clans / medaillons

- Le Kazan est divise en six regions/clans.
- Chaque region possede un Medaillon.
- Les Medaillons sont caches dans des labyrinthes.
- Chaque Medaillon permet de survivre a trois combats perdus.
- Apres une defaite sauvee par un Medaillon:
  - Endurance ramenee a 4;
  - combat considere comme gagne;
  - -1 Habilete;
  - -1 Chance;
  - 3 unites de Poison cochees.

#### Mecaniques observees

- Tueurs Mamliks et Necromanciens poursuivent le heros.
- Montures et deplacements payants ou temporaires.
- Labyrinthes multiples associes aux clans.
- Objectif de reunir le plus possible de Medaillons et d'atteindre Sharrabbas.

#### Implications application

- Module Poison progressif spatial.
- Module Objectifs de clans / medaillons.
- Module Sauvetage de combat couteux.
- Module Objet porte-bonheur reserve.
- Module Labyrinthes multiples.
- Module Monture temporaire.

### Livre: Defis Fantastiques 39 - Le Volcan de Zamarra

#### Profil distinct

- Base Defis Fantastiques + compte a rebours de siege.
- Le livre suit l'effondrement progressif des murailles de Zamarra.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Or
- Murailles / drapeaux

#### Equipement initial

- Epee.
- Tunique de cuir.
- Sac a dos.
- Lanterne.
- Potion classique unique au choix.
- Pieces d'or de Zamarra transportables sans limite.

#### Siege / compte a rebours

- La citadelle compte 14 murailles.
- Un bracelet avertit quand une enceinte defensive est detruite.
- A chaque mur tombe, le joueur noircit un drapeau blanc.
- Quand les 14 drapeaux sont noirs, le temps est epuise.
- A ce moment, le bracelet tue le heros instantanement.

#### Objectif

- Rallumer ou proteger les Sentinelles de Pierre de Zamarra.
- Utiliser le feu du volcan / des Crocs de l'Enfer.

#### Protection contre la chaleur

- Le heros recoit quatre cubes noirs.
- Chaque cube protege de la chaleur de la lave.
- Chaque cube se desintegre apres usage.
- Il est possible ou utile d'en trouver d'autres.

#### Implications application

- Module Siege / murs a cocher.
- Module Compte a rebours visuel.
- Module Bracelet fatal.
- Module Protection consommable contre environnement.
- Module Objet a usage automatique possible.

### Livre: Defis Fantastiques 40 - Le Sceptre Noir

#### Base

- Utilise le profil Defis Fantastiques classique.
- Quete d'artefact en territoire chaotique.

#### Statistiques

- Habilete
- Endurance
- Chance

#### Magie / objets

- Le heros est un guerrier, pas un sorcier.
- Il ne peut pas lancer librement des sortileges.
- La magie passe surtout par des objets trouves ou achetes.
- Certains objets magiques peuvent etre inconnus ou non identifies.
- Possibilite d'acheter des accessoires magiques.

#### Inventaire / provisions

- Pas de sac a dos au depart.
- Sans sac a dos, le heros peut transporter seulement 4 repas.
- Avec un sac a dos, il peut transporter jusqu'a 12 repas.
- La capacite de provisions depend donc du contenant.

#### Objectif central

- Retrouver le Sceptre du Commandement / Sceptre Noir.
- Voyager vers Koulgrah, la Terre du Chaos, et Klakduhr.

#### Mecaniques observees

- Scenes chronometrees en secondes.
- Exemple: 30 secondes disponibles.
- Certaines actions coutent 10 secondes.
- Certaines actions peuvent prendre toute la scene.
- Actions reperees: boire une potion, utiliser un anneau de Chance, manipuler un objet magique, manger, boire du vin.

#### Implications application

- Module Inventaire dependant du contenant.
- Module Objets magiques non identifies.
- Module Achat d'accessoires magiques.
- Module Scene chronometree en actions/secondes.
- Module Capacite de provisions variable.

### Livre: Defis Fantastiques 41 - La Vengeance des Demons

#### Profil distinct

- Base Defis Fantastiques avec dimension morale et religieuse.
- Le heros est un Saint Guerrier, Chasseur de Demons.
- Ajoute Noirceur et Dons.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Noirceur
- Or
- Dons choisis

#### Noirceur

- La Noirceur commence a 0.
- Elle represente le degre de malveillance ou de corruption du heros.
- Elle augmente notamment quand le heros recourt a la magie noire.
- Le texte peut demander de Tester la Noirceur.
- L'objectif est de garder cette ressource aussi basse que possible.

#### Dons

- Le joueur choisit 3 Dons au depart.
- Dons reperes:
  - Anti-Zombie;
  - Voile Noir;
  - Cercle Sacre;
  - Meditation.
- Les Dons sont des techniques mystiques de Saint Guerrier.
- Certains Dons ouvrent des options contre morts-vivants, demons ou creatures malefiques.

#### Equipement initial

- Epee Foudre Nocturne.
- Costume de Saint Guerrier.
- 10 pieces d'or.
- Sac a dos.
- Provisions pour 5 repas.
- 3 fioles d'Eau Benite.
- Croix d'Argent.
- Carte du pays d'Arion.

#### Provisions

- 5 repas au depart.
- Un repas restaure 4 Endurance.
- Les repas peuvent etre pris librement sauf pendant un combat.
- Le repos peut aussi restaurer l'Endurance lorsque le texte l'autorise.

#### Mecaniques observees

- Magie noire parfois necessaire contre certains demons.
- Utiliser la magie noire augmente la Noirceur.
- Potions trouvees en cours de route, dont Potion d'Heroisme et Potion du Destin.
- Objets sacres utiles contre les morts-vivants ou demons.
- Plusieurs demons demandent des solutions autres que le combat direct.

#### Implications application

- Module Noirceur / corruption.
- Module Dons choisis.
- Module Objet sacre.
- Module Magie noire a cout moral.
- Module Test de ressource morale.

### Livre: Defis Fantastiques 42 - L'Ancienne Prophecie

#### Profil distinct

- Base Defis Fantastiques, mais depart atypique.
- Le heros commence sans savoir qui il est ni ce qui l'attend.
- Les statistiques ne sont pas lancees immediatement au debut de l'aventure.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Provisions acquises en route

#### Creation du personnage

- Le livre demande de ne pas calculer les totaux au tout debut.
- Les totaux d'Habilete, Endurance et Chance sont determines plus tard, a un moment precise par le texte.
- Ce depart amnesique ou retarde doit etre gere differemment d'une creation classique.

#### Equipement initial

- Aucun equipement au debut.
- Le heros se reveille dans un sarcophage.
- Des objets peuvent etre acquis au fil de l'aventure.

#### Provisions

- Pas de provisions au depart.
- Des provisions peuvent etre acquises plus tard.
- Un repas restaure 4 Endurance.
- Les repas peuvent etre pris librement sauf pendant un combat.

#### Mecaniques observees

- Debut sans objectif clair pour le joueur.
- Le joueur decouvre progressivement son identite, ses forces et la situation.
- Morts-vivants de Mortis de Balthor.
- Objets de tresor ou objets speciaux peuvent etre donnes, echanges ou utilises pour ouvrir des options.
- La structure demande a l'application de permettre une fiche incomplete au debut.

#### Implications application

- Module Creation retardee.
- Module Depart sans equipement.
- Module Fiche incomplete temporaire.
- Module Identite / objectif revele progressivement.
- Module Provisions acquises en route.

### Livre: Defis Fantastiques 43 - Le Repaire des Morts-Vivants

#### Profil distinct

- Base Defis Fantastiques orientee infiltration contre morts-vivants.
- Ajoute Determination et Risque d'Alerte.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Determination
- Risque d'Alerte
- Provisions
- Or

#### Determination

- La Determination sert surtout face aux morts-vivants.
- Total de depart repere: 1d6 + 5.
- Le livre demande de Tester la Determination lorsque le heros affronte les morts-vivants.
- Plus les morts-vivants sont nombreux, plus un echec peut etre grave.
- Cette ressource represente la capacite a ne pas ceder a la terreur.

#### Risque d'Alerte

- Utilise lors de l'infiltration dans la Citadelle de Brulesang.
- Commence a 0 lorsque le heros entre dans la Citadelle.
- Augmente ou diminue selon les bruits, combats, choix et incidents.
- Sert a mesurer la probabilite d'attirer les patrouilles de morts-vivants.

#### Equipement initial

- Epee.
- Cuirasse.
- Carte d'une partie de la region.
- Anneau aux pouvoirs particuliers.
- Havresac avec provisions, pieces d'or et objets utiles.

#### Provisions

- Des provisions sont disponibles ou acquises.
- Un repas restaure 4 Endurance.
- Les repas peuvent etre pris librement sauf pendant un combat.

#### Mecaniques observees

- Vampires, zombies, goules et autres morts-vivants.
- Mission solitaire pour neutraliser Mortis.
- Potions speciales, dont Potion de Determination.
- La discretion compte autant que le combat.
- Des objets speciaux peuvent etre achetes, echanges ou utilises pour resoudre des rencontres.

#### Implications application

- Module Determination.
- Module Risque d'Alerte.
- Module Infiltration dans forteresse.
- Module Patrouilles / niveau d'alerte.
- Module Peur specifique aux morts-vivants.

### Livre: Defis Fantastiques 44 - La Legende des Guerriers Fantomes

#### Base

- Utilise le profil Defis Fantastiques classique.
- Ajoute un fort accent sur l'equipement achete, les armes remplacees et les armures a durabilite.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Or
- Provisions

#### Equipement initial

- Epee.
- Balluchon.
- Quelques pieces d'or.
- Or initial: 2d6 + 12.
- Pas de provisions au depart.

#### Provisions

- Pas de provisions au debut.
- Le joueur peut en acheter ou en trouver rapidement.
- Un repas restaure jusqu'a 4 Endurance.
- Les repas peuvent etre pris librement sauf pendant un combat.

#### Armes et armures

- Le heros ne peut porter qu'une seule arme a la fois.
- Prendre une nouvelle arme oblige a abandonner l'ancienne.
- Les armures se remplacent aussi.
- Une armure a une protection precise et une duree limitee.
- Quand une armure protege, elle encaisse des coups et finit par se detruire.

#### Boutique / equipement special

- Marche de Champs-Royaux pour acheter du materiel.
- Certains objets ne peuvent etre achetes qu'en un seul exemplaire.
- Amulette Porte-bonheur: restaure la Chance de depart une fois.
- Bague Agile: aide aux Tests d'Habilete, 3 utilisations.
- Potion Somnifere: peut mettre hors de combat certains monstres.
- Cape Cameleon et autres objets contextuels reperes.

#### Mecaniques observees

- Guerriers Fantomes comme menace centrale.
- Equipements contextuels utilisables seulement quand le texte le precise, sauf exceptions.
- Armes speciales avec degats modifies.
- Armures a protection et usure.
- Plusieurs adversaires geres selon trois cas: groupe unique, suite d'ennemis, ou tous en meme temps.

#### Implications application

- Module Arme unique equipee.
- Module Armure a durabilite.
- Module Boutique avec limite d'achat.
- Module Objet a charges pour tests.
- Module Equipement contextuel.

### Livre: Defis Fantastiques 45 - La Tour de la Destruction

#### Profil distinct leger

- Base Defis Fantastiques classique.
- Ajoute Honneur et Temps Passe.
- Aventure en milieu glacial avec carte et exploration importante.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Honneur
- Temps Passe
- Provisions
- Or

#### Honneur

- L'Honneur commence a 6.
- Il represente la bienseance, l'honnetete, la justice, la compassion et le respect des morts.
- Les actes commis ou evites peuvent modifier l'Honneur.

#### Temps Passe

- Utilise dans la premiere partie de l'aventure.
- Mesure le nombre de jours ecoules avant l'arrivee au Palais de Glace.
- Chaque nuit de repos ajoute 1 jour.
- Le temps joue surtout avant l'arrivee au Palais de Glace.

#### Equipement initial

- Epee.
- Bouclier.
- Tunique de cuir doublee de fourrure.
- Sac a dos.
- Provisions pour 10 repas.
- Couverture en fourrure.
- Lanterne.

#### Provisions

- 10 repas au depart.
- Un repas restaure 4 Endurance.
- Les repas peuvent etre pris librement sauf pendant un combat.

#### Equipement possible

- Arbalete et carreaux.
- Les carreaux doivent etre comptes.
- Sans carreaux, l'arbalete devient inutilisable jusqu'a trouver de nouvelles munitions.
- Boutique possible avec potions, provisions, levier, arbalete, massue, sel, materiel d'escalade.

#### Mecaniques observees

- Objectif: comprendre et arreter une sphere destructrice venue du froid.
- Palais de Glace comme objectif de la premiere partie.
- Exploration de regions glacees ou froides.
- Notes et carte fortement recommandees.
- Certaines creatures ou lieux demandent magie, objets ou choix tactiques.

#### Implications application

- Module Honneur avec themes personnalises.
- Module Temps Passe en jours.
- Module Munitions d'arbalete.
- Module Exploration avec carte.
- Module Environnement froid / equipement de survie.

### Livre: Defis Fantastiques 46 - L'Arpenteur de la Lune

#### Profil distinct leger

- Base Defis Fantastiques classique.
- Le heros est un Chasseur de Primes experimente.
- Ajoute des talents speciaux utilisables selon les situations.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Talents speciaux
- Provisions
- Or

#### Talents speciaux

- Plusieurs talents representent l'experience du Chasseur de Primes.
- Talents reperes:
  - Grimpeur;
  - Combattant;
  - Je-sais-tout;
  - Deguisement;
  - Passe-partout;
  - Pas-de-loup;
  - Renifleur.
- Quand plusieurs talents sont mentionnes dans le texte, le joueur ne peut en utiliser qu'un seul.

#### Equipement initial

- Epee.
- Bouclier.
- Tunique de cuir doublee de fourrure.
- Sac a dos.
- Provisions pour 10 repas.
- Equipement adapte au froid.

#### Provisions

- 10 repas au depart.
- Un repas restaure 4 Endurance.
- Les repas peuvent etre pris librement sauf pendant un combat.

#### Mecaniques observees

- Enquete urbaine a Port-Noir.
- Objectif de traque lie a Karam Gruul et a la Cabale du Loup-Garou.
- Mots/notes a inscrire sur la Feuille d'Aventure.
- Certaines options dependent directement des talents connus.
- Certaines scenes utilisent l'heure ou le temps qui passe.

#### Implications application

- Module Talents choisis ou predefinis.
- Module Enquete urbaine.
- Module Notes / mots-cles importants.
- Module Utilisation exclusive d'un talent.
- Module Traque de cible.

### Livre: Defis Fantastiques 47 - Les Mercenaires du Levant

#### Profil distinct

- Livre tres atypique.
- Le heros commence enfant/adolescent et vieillit au cours de l'aventure.
- Les statistiques peuvent evoluer au-dessus de leur total de depart avant l'age adulte.

#### Statistiques / ressources

- Habilete
- Endurance permanente
- Endurance temporaire
- Ferocite
- Chance
- Age
- Provisions

#### Creation du personnage

- Le heros commence a 13 ans.
- Habilete, Endurance, Ferocite et Chance sont determinees au depart.
- Avant 18 ans, Habilete, Endurance et Ferocite peuvent progresser avec l'age.
- A 18 ans, Habilete et Endurance permanente ne peuvent plus augmenter normalement.

#### Age

- Le texte peut demander de modifier l'age.
- Chaque fois que le heros grandit:
  - Ferocite diminue de 2 points;
  - Endurance temporaire revient a son total de depart.
- Le temps qui passe fait donc partie de la progression du personnage.

#### Ferocite

- Ressource propre au livre.
- Si la Ferocite tombe a 0, il faut noter le paragraphe actuel et se rendre au paragraphe 200.
- La Ferocite represente une forme de rage, energie ou impulsion violente.

#### Equipement initial

- Vetements ordinaires.
- Epee de bois.
- 2 repas au depart apres le depart du village.

#### Mecaniques observees

- Groupe initial d'enfants et d'adolescents.
- Le heros est considere comme chef par les autres.
- Notes a recopier avec precision.
- Guerre civile et mercenaires comme menace centrale.
- Evolution du personnage sur plusieurs mois ou annees.

#### Implications application

- Module Age / vieillissement.
- Module Endurance permanente et temporaire.
- Module Ferocite.
- Module Progression avant age adulte.
- Module Groupe narratif non combattant.

### Livre: Defis Fantastiques 48 - Les Mondes de l'Aleph

#### Profil distinct

- Base Defis Fantastiques avec voyage entre mondes.
- Le heros voyage dans les spheres du Macrocosmos grace a l'Aleph.
- Ajoute Detection, liee aux Spectres Chasseurs.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Detection
- Provisions
- Or

#### Detection

- La Detection commence a 0.
- Les Spectres Chasseurs ne peuvent pas detecter le heros au debut.
- Chaque passage prolonge, combat ou action marquante peut laisser des traces psychiques.
- Le total de Detection augmente quand ces traces s'accumulent.
- Plus la Detection augmente, plus les Spectres Chasseurs peuvent retrouver le heros.
- Certains passages demandent de tester la Detection immediatement apres l'avoir augmentee.

#### Equipement initial

- Epee.
- Sac avec 2 repas.
- Bourse contenant 8 pieces d'or apres la scene du diseur de bonne aventure.
- Aleph obtenu tres tot sous forme d'objet/sphere.

#### Provisions

- 2 repas au depart.
- Le texte indique que la faim peut obliger a prendre un repas pour eviter de perdre de l'Endurance.
- Un repas restaure 4 Endurance quand il est consomme.

#### Mecaniques observees

- Voyage entre mondes et univers du Macrocosmos.
- L'Aleph sert a quitter certains lieux ou changer de monde.
- Perdre l'Aleph peut coincer le heros dans un monde.
- Spectres Chasseurs poursuivent le porteur de l'Aleph.
- Objets bizarres ou magiques propres a chaque monde.
- Cartographie et notes fortement recommandees.

#### Implications application

- Module Detection / traque interdimensionnelle.
- Module Voyage entre mondes.
- Module Objet de voyage obligatoire.
- Module Perte d'objet critique.
- Module Faim obligatoire.

### Livre: Defis Fantastiques 49 - Le Siege de Sardath

#### Profil distinct leger

- Base Defis Fantastiques classique.
- Le heros est un Elfe des Bois, membre du Conseil des Sages.
- Remplace les provisions classiques par des plantes de soin.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Plantes
- Potions
- Fleches
- Or
- Temps / calendrier

#### Equipement initial

- Tunique de cuir souple des Elfes des Bois.
- Arc.
- Carquois avec 6 fleches, qui est le maximum.
- Epee forge par les Forgerons Nains de Sardath.
- Sac a dos.
- 15 pieces d'or.
- 5 potions.
- Anneau Sigillaire des Conseillers.

#### Plantes

- Le heros n'a pas besoin de transporter des vivres classiques.
- Il peut se soigner avec des plantes trouvees en chemin.
- Chaque plante utilisee restaure 4 Endurance.
- Les plantes peuvent etre utilisees librement sauf pendant un combat.

#### Armes / munitions

- Les fleches sont limitees a 6.
- L'epee est importante: si elle est perdue, la Force d'Attaque subit -2 jusqu'a obtention d'une nouvelle arme.

#### Temps / calendrier

- Le livre mentionne un calendrier allansien de sept jours.
- Le temps et les jours peuvent avoir de l'importance dans le suivi de l'aventure.

#### Mecaniques observees

- Exploration de la Foret des Ombres.
- Notes sur plantes, creatures et objets recommandees.
- Conflit autour de Sardath, Batrakks, Araignees Geantes et Ailes Noires.
- Le role politique du heros peut ouvrir ou justifier certaines decisions.

#### Implications application

- Module Plantes de soin.
- Module Carquois limite.
- Module Arme perdue avec malus de Force d'Attaque.
- Module Calendrier local.
- Module Statut politique / sceau officiel.

### Livre: Defis Fantastiques 50 - Retour a la Montagne de Feu

#### Base

- Utilise le profil Defis Fantastiques classique.
- Retour dans le donjon de Zagor avec objets, cles, magie noire et enigmes.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance

#### Equipement initial

- Fine lame.
- Vetements solides.
- Sac a dos.
- Pas de provisions au depart.

#### Provisions / soins

- Le heros commence sans provisions.
- Le livre indique qu'il y aura d'autres occasions de regagner de l'Endurance.

#### Objectif central

- Empecher le retour definitif de Zagor.
- Explorer de nouveau la Montagne de Feu.
- Comprendre ou contrer les effets de resurrection et de necromancie.

#### Mecaniques observees

- Cles numerotees: certaines portes demandent de se rendre au paragraphe correspondant au numero de cle.
- Enigmes numeriques.
- Objets classiques et objets de donjon requis.
- Magie noire, necromancie, demons et morts-vivants.
- Composants de potions ou connaissances utiles a memoriser.
- Certains objets ou elements peuvent contrer des entites elementaires.

#### Implications application

- Module Cles numerotees.
- Module Retour vers paragraphe selon objet.
- Module Donjon classique avance.
- Module Enigmes numeriques.
- Module Objet contre entite elementaire.

### Livre: Defis Fantastiques 51 - Les Mages de Solani

#### Profil distinct leger

- Base Defis Fantastiques classique.
- Aventure insulaire avec magie, mages disparus et morts-vivants.
- Le heros n'est pas magicien au depart, mais peut activer des objets ou effets magiques trouves en chemin.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Presence
- Provisions
- Tresor
- Potions
- Possessions

#### Presence

- Nouvelle ressource de depart: lancer 1 de, diviser par deux en arrondissant au superieur, puis ajouter 4.
- La Presence mesure la force morale et la capacite a resister a certaines influences ou attaques surnaturelles.
- Elle peut baisser a cause d'attaques speciales et remonter par certains combats ou effets magiques.

#### Equipement / provisions

- Provisions pour 12 repas.
- Chaque repas restaure 4 Endurance, hors combat.
- Tresor separe des objets ordinaires.
- Les bouteilles de potion vides doivent etre conservees apres utilisation, car elles peuvent servir plus tard de recipients.

#### Armes / combat

- Une seule arme magique peut donner son bonus a la fois.
- Si le heros combat avec un couteau au lieu d'une epee, les degats sont reduits selon un jet: certains resultats infligent 2 points, les autres 1 point seulement.
- Si le heros n'a pas de bouclier, il subit un malus de 1 Habilete en combat.

#### Mecaniques observees

- Objets magiques contextuels, parfois incompris au moment de leur decouverte.
- Importance de garder une carte et des notes.
- Tresor utile surtout comme suivi, avec peu d'occasions d'echange.
- Contenants vides a conserver comme objets utiles.

#### Implications application

- Module Presence.
- Module Contenants reutilisables.
- Module Arme de secours a degats reduits.
- Module Bouclier / malus defensif.
- Module Tresor separe de l'inventaire courant.

### Livre: Defis Fantastiques 52 - La Legende de Zagor

#### Profil distinct

- Profil Defis Fantastiques avance avec choix de heros avant la creation.
- Quatre heros possibles: Anvar le Barbare, Braxus le Guerrier, Rablaix le Nain, Sallazar le Magicien.
- Le choix du heros modifie les formules de depart, les competences et l'acces a certains objets ou sorts.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Magie
- Provisions

#### Creation du personnage

- Habilete:
  - Anvar ou Braxus: 1d6 + 6.
  - Rablaix: 1d6 + 5.
  - Sallazar: 1d6 + 4.
- Endurance:
  - Anvar: 1d6 + 18.
  - Braxus ou Rablaix: 2d6 + 12.
  - Sallazar: 3d6 + 6.
- Chance:
  - Rablaix: 1d6 + 5.
  - Anvar: 1d6 + 4.
  - Braxus ou Sallazar: 1d6 + 3.
- Magie:
  - Anvar: 1.
  - Braxus: 3.
  - Rablaix: 2.
  - Sallazar: 7.

#### Magie

- Les points de Magie servent a lancer des sorts et a activer certains objets magiques.
- L'utilisation d'un objet magique coute souvent 1 point de Magie.
- Tous les heros peuvent utiliser des parchemins magiques si les instructions le permettent.
- Sallazar a acces a des sortileges du Grimoire Amarillien et a des objets reserves au magicien.

#### Provisions / combat

- Provisions pour 12 repas.
- Chaque repas restaure 4 Endurance, hors combat.
- Combats classiques Defis Fantastiques, avec variante contre plusieurs creatures.
- Certains combats permettent des actions avant l'assaut: sort, repas, potion, puis attaque libre.

#### Mecaniques observees

- Choix de personnage avec avantages narratifs et mecaniques.
- Objets reserves a certains heros ou a certains niveaux de Magie.
- Tests d'Habilete de localisation pour passages secrets ou objets caches.
- Armes magiques non cumulables.

#### Implications application

- Module Choix de heros / archetype.
- Module Formules de creation conditionnelles.
- Module Magie comme ressource d'activation d'objets.
- Module Sorts reserves a un personnage.
- Module Test d'Habilete specialise.

### Livre: Defis Fantastiques 53 - Le Sepulcre des Ombres

#### Profil distinct leger

- Base Defis Fantastiques classique avec une ressource spirituelle centrale.
- Aventure de pelerinage, demons, sorciers, reliques et forces de l'Ordre.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Foi
- Provisions
- Pieces d'or

#### Foi

- Le heros commence avec 1 point de Foi.
- La Foi n'est pas limitee par un total de depart.
- Les saintes reliques, benedictions et actes meritoires peuvent augmenter la Foi.
- Les maledictions ou actes indignes peuvent la diminuer.
- Une Foi elevee peut repousser certains demons ou esprits malfaisants et donner d'autres avantages.

#### Equipement initial

- Epee.
- Lanterne.
- Briquet.
- Sac a dos.
- Provisions pour 5 repas.
- Pieces d'or: 1d6 + 4.

#### Mecaniques observees

- Combat contre plusieurs adversaires avec gestion differenciee: ennemi principal attaque normalement, autres ennemis peuvent blesser sans recevoir de degats si le heros ne les cible pas.
- Objets sacres ou armes magiques peuvent etre requis contre certains spectres.
- Certaines armes magiques ou sacrees peuvent perdre leur charge magique apres un combat special.
- Benedictions et choix moraux influencent la Foi.

#### Implications application

- Module Foi.
- Module Objets sacres / anti-demons.
- Module Objet magique decharge.
- Module Moralite religieuse / benedictions.
- Module Combat multi-adversaires avec cible principale.

### Livre: Defis Fantastiques 54 - Le Voleur de Vie

#### Base

- Utilise le profil Defis Fantastiques classique.
- Aventure de poursuite et de sauvetage autour d'Arion, Fang-Zen, la princesse Telessa et Arachnos.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Provisions
- Pieces d'or

#### Equipement initial

- Cotte de cuir.
- Epee.
- Sac a dos.
- 10 repas.
- Gourde pleine d'eau.
- 20 pieces d'or.
- 1 Perle Rouge.
- Choix d'une potion: Habilete, Force ou Chance.

#### Potions / soins

- Potion d'Habilete: ramene l'Habilete au total de depart.
- Potion de Force: ramene l'Endurance au total de depart.
- Potion de Chance: ramene la Chance au total de depart et l'augmente de 1.
- Les potions ne peuvent pas etre bues en combat.

#### Mecaniques observees

- Certains adversaires secondaires peuvent attaquer pendant que le heros combat une cible principale.
- Un poison peut avoir un effet durable: apres une blessure empoisonnee, chaque repas peut ne restaurer que 3 Endurance au lieu de 4.
- Objets de mission et objets de preuve, comme la Perle Rouge ou la Pierre de Verite.
- Rival narratif important, Fang-Zen, qui peut devancer ou compliquer la mission.

#### Implications application

- Module Poison durable sur soins.
- Module Rival / concurrent narratif.
- Module Objet de preuve ou de quete.
- Module Combat avec attaquant secondaire.

### Livre: Defis Fantastiques 55 - Les Chevaliers du Destin

#### Profil distinct

- Profil Defis Fantastiques avance de chevalier-templier.
- Le heros est un Chevalier de Telak, pretre-guerrier avec disciplines speciales, Honneur et pouvoirs mystiques.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Honneur
- Temps Ecoule
- Provisions
- Disciplines Speciales

#### Creation / disciplines

- Habilete: 1d6 + 6.
- Endurance: 2d6 + 12.
- Chance: 1d6 + 6.
- Honneur: 6 au depart.
- Choisir quatre Disciplines Speciales.
- Le choix doit inclure au moins une Discipline Guerriere et une Discipline Mystique.

#### Disciplines observees

- Disciplines Guerrieres: Art des Armes, Depistage, Commandement, Tir.
- Disciplines Mystiques: Arcanes, Communication, Coup sacre, Exorcisme.
- Coup sacre touche demons et morts-vivants avec une energie sacree.
- Exorcisme permet de conjurer un mort-vivant ou de renvoyer un spectre, un seul a la fois.

#### Equipement initial

- Uniforme des Chevaliers de Telak.
- Cotte de mailles fine.
- Tunique blanche brodee d'un glaive dore.
- Epee magique sacree.
- Cheval Flamboyant.
- Pas de sac a dos, pas de provisions et pas de pieces d'or au depart selon l'equipement initial de voyage.

#### Armes / monture

- L'epee magique ne donne pas de bonus de Force d'Attaque ordinaire, mais elle est efficace contre demons et morts-vivants.
- Une seule arme peut etre portee et utilisee a la fois.
- Tant que Flamboyant accompagne le heros, une arme de reserve peut etre gardee sur sa selle.

#### Honneur / temps

- Honneur augmente par actions heroiques.
- Honneur diminue par egoisme, bassesse ou trahison du serment.
- Temps Ecoule est suivi en jours, avec ajout d'un jour a la fin de chaque jour.

#### Implications application

- Module Disciplines Speciales.
- Module Honneur chevaleresque.
- Module Temps Ecoule en jours.
- Module Monture / selle comme stockage.
- Module Arme sacree anti-demons / morts-vivants.

### Livre: Defis Fantastiques 56 - Le Chasseur de Mages

#### Profil distinct leger

- Base Defis Fantastiques classique.
- Le heros est un chasseur specialise dans la capture et la neutralisation des mages.
- L'aventure repose beaucoup sur des outils anti-sorcellerie, des indices de detection et la poursuite de Mencius.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Provisions
- Pieces d'or
- Compagnon possible

#### Equipement initial

- Vetements en tissu non teint ou cuir, qui attenuent certains sortileges et affaiblissent les sorciers au contact.
- Pistolet.
- Boite de poudre.
- Trois balles, dont une en argent.
- Grand sabre.
- 12 miroirs.
- Aiguille de boussole.
- Corde de cheveux humains.
- Pieces d'or: 1d6.

#### Techniques anti-mage

- Un mage peut etre affaibli ou piege par tissu non teint, balle d'argent, epee touchee par son sang, corde de cheveux humains ou sa propre magie.
- La detection des mages passe par des signes: poisson refuse, etoffe rouge, oiseaux malades, mensonge sur l'origine, corps qui double dans l'eau.
- La traque peut utiliser symbole sacre, pierre, aiguille de boussole trempee dans du sang de mage, empreintes ou chien pisteur.

#### Compagnon

- Le livre prevoit une case Compagnon.
- Le compagnon peut avoir Habilete, Endurance, Chance et equipement.
- Le heros peut utiliser les objets du compagnon tant que leurs chemins ne se separent pas.

#### Implications application

- Module Kit anti-mage.
- Module Munitions speciales.
- Module Indices de detection d'entite.
- Module Compagnon avec inventaire partage.
- Module Capture / prisonnier transporte.

### Livre: Defis Fantastiques 57 - La Revanche du Vampire

#### Profil distinct

- Base Defis Fantastiques avancee avec Foi et Points de Sang.
- Aventure de chasse au vampire contre le comte Heydrich Reiner.
- Le temps et les erreurs renforcent indirectement l'ennemi.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Foi
- Points de Sang
- Provisions
- Tresor

#### Creation du personnage

- Habilete: 1d6 + 6.
- Endurance: 2d6 + 12.
- Chance: 1d6 + 6.
- Foi: 1d6 + 3.

#### Foi

- La Foi represente la purete des intentions et la confiance dans les forces du bien.
- Elle peut repousser ou effrayer certaines creatures malefiques.
- Une Foi elevee peut aussi rendre le heros plus reperable par les forces du mal.
- La Foi peut depasser son total de depart.
- Reliques benefiques et victoires contre des creatures diaboliques peuvent l'augmenter.

#### Points de Sang

- Le heros commence avec 10 Points de Sang.
- Retards et mauvais choix peuvent faire perdre des Points de Sang.
- Certaines actions peuvent en faire gagner.
- Plus le total est faible, plus Reiner est avantage.
- Le total peut descendre sous zero et doit continuer a etre comptabilise.

#### Equipement initial

- Tunique de cuir.
- Epee.
- Bouclier.
- Sac a dos.
- Lanterne.
- Provisions jusqu'a un maximum de 12 repas.
- Tresor sous forme de pieces d'or ou objets de valeur trouves.

#### Mecaniques observees

- Test de Detection, base sur l'Habilete, pour trouver personnes cachees ou objets dissimules.
- Maledictions, maladies et poisons avec symptomes et remedes possibles.
- Reliques benefiques importantes contre le vampire.
- Quete d'information sur le Receptacle de l'Ame.

#### Implications application

- Module Points de Sang.
- Module Foi ambivalente.
- Module Detection.
- Module Malediction / maladie / poison avec remede.
- Module Receptacle d'ame / objet-source de pouvoir.

### Livre: Defis Fantastiques 58 - Le Dragon de la Nuit

#### Profil distinct

- Base Defis Fantastiques avancee avec Fuite du Temps et Oeil de la Nuit.
- Aventure ou l'exploration, les objets magiques et le temps se concurrencent.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Provisions
- Tresor
- Oeil de la Nuit
- Fuite du Temps

#### Provisions / soins

- Havresac avec 12 repas.
- Chaque repas restaure 4 Endurance, hors combat.
- Certains repas obligatoires retirent une provision sans restaurer d'Endurance.
- Si un repas obligatoire est demande et qu'il n'y a plus de provisions, le heros perd 2 Endurance.
- Maximum de 12 repas transportes.

#### Oeil de la Nuit

- Ressource de depart a 0.
- Elle represente la conscience et la volonte hostiles des forces ennemies.
- Plus le total augmente, plus les ennemis s'acharnent contre le heros.
- En contrepartie, les ennemis de ces ennemis peuvent etre plus prompts a aider le heros.

#### Fuite du Temps

- Ressource de depart a 0.
- Le temps ecoule augmente selon les choix et deplacements.
- Plus le total est eleve, plus l'objectif final devient difficile.
- Le joueur doit arbitrer entre exploration utile et urgence.

#### Equipement initial

- Epee.
- Cotte de cuir.
- Bouclier.
- Lanterne.
- Sac a dos avec 12 repas.
- Pieces d'or: 2d6 + 3, avec possibilite d'en recevoir davantage dans l'introduction.

#### Mecaniques observees

- Objets magiques souvent inconnus au moment de leur decouverte.
- Poison ajoute des pertes d'Endurance aux blessures normales.
- Antidotes, herbes ou potions peuvent attenuer ou annuler les effets du poison sans soigner la blessure physique.
- Tresor utile pour equipement, informations ou aide.

#### Implications application

- Module Oeil de la Nuit.
- Module Fuite du Temps.
- Module Repas obligatoire sans soin.
- Module Poison ajoute aux blessures.
- Module Objet magique non identifie.

### Livre: Defis Fantastiques 59 - La malediction de la Momie

#### Base

- Utilise le profil Defis Fantastiques classique.
- Aventure d'exploration, desert, tombeau, momies, feu et poison.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Provisions
- Poison

#### Equipement initial

- Epee.
- Bouclier.
- Sac avec provisions.
- Armure de cuir.
- Lanterne.
- Choix d'une potion magique.

#### Provisions / potions

- Provisions pour 10 repas.
- Chaque repas restaure 4 Endurance, hors combat.
- Choix entre Potion d'Adresse, Potion de Vigueur ou Potion de Bonne Fortune.
- Chaque bouteille contient deux mesures.
- Chaque mesure restaure la statistique choisie a son niveau initial.
- La Potion de Bonne Fortune restaure la Chance et ajoute 1 au total de depart.

#### Poison

- Certains ennemis ou pieges ajoutent des points au total de Poison.
- Le Poison est une ressource/compteur distincte a suivre.
- Le texte indique les consequences selon les situations.

#### Feu contre momies

- Les torches peuvent servir d'arme contre les momies.
- Combattre avec une torche reduit la Force d'Attaque de 1, mais un assaut gagne inflige 4 Endurance au lieu de 2.
- Des objets enflammes peuvent etre lances: lampe, oeuf d'Yokka, mesure d'huile.
- Chaque objet lance est perdu.

#### Implications application

- Module Potion a deux mesures.
- Module Poison comme compteur.
- Module Arme de feu improvisee.
- Module Objet lance et perdu.
- Module Ennemi vulnerable au feu.

### Livre: Defis Fantastiques 60 - L'Oeil d'Emeraude

#### Base

- Utilise le profil Defis Fantastiques classique.
- Retour a Fang et au Labyrinthe de la Mort.
- Objectif: retrouver le Dragon d'Or et ses deux yeux d'emeraude.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Provisions
- Delai de poison
- Oeil d'Emeraude

#### Provisions / creation

- Habilete: 1d6 + 6.
- Endurance: 2d6 + 12.
- Chance: 1d6 + 6.
- Provisions pour 10 repas.
- Chaque repas restaure 4 Endurance, hors combat.

#### Des integres au livre

- Le livre prevoit une alternative si le joueur ne possede pas de des.
- Des resultats de des figurent au bas des pages de droite.
- Pour un seul de, le de de gauche est utilise.

#### Quete / delai

- Henry Delacor confie une mission liee au Dragon d'Or.
- Le heros avale un poison lent.
- Il dispose de 14 jours pour trouver le dragon et revenir chercher l'antidote.
- Une emeraude taillee en forme d'oeil est remise au heros.
- Toucher le dragon sans ses deux yeux mene a une mort certaine selon l'avertissement.

#### Mecaniques observees

- Labyrinthe dense avec carte et notes recommandees.
- Objets, potions, armes et indices caches.
- Pieges qui peuvent faire perdre l'or ou remplacer l'epee par une dague avec malus d'Habilete.
- Timole peut apparaitre comme compagnon dans certains passages.

#### Implications application

- Module Delai en jours avec poison lent.
- Module Objet de quete incomplet / paire d'objets.
- Module Des imprimes / tirage alternatif.
- Module Labyrinthe avance.
- Module Perte/remplacement force d'equipement.

### Livre: Defis Fantastiques 61 - Les Pirates du Crane Noir

#### Base

- Utilise le profil Defis Fantastiques classique avec contexte pirate.
- Aventure de vengeance contre Cinabre, aussi appele Os-de-Sang.
- La premiere partie demande de suivre le temps ecoule.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Repas
- Pieces d'or
- Temps Ecoule

#### Creation / equipement

- Habilete: 1d6 + 6.
- Endurance: 2d6 + 12.
- Chance: 1d6 + 6.
- Le heros commence sans repas, mais peut en obtenir pendant l'aventure.
- Chaque repas restaure jusqu'a 4 Endurance, hors combat.
- Equipement initial: epee, lanterne, briquet, sac a dos.
- Pieces d'or: 2d6 + 12.

#### Temps Ecoule

- Pendant la premiere partie, certains passages demandent d'ajouter une ou plusieurs heures.
- Le total est note dans une case Temps Ecoule.
- La raison exacte du suivi devient claire pendant l'aventure.

#### Mecaniques observees

- Combat contre plusieurs adversaires avec cible principale et adversaires secondaires.
- Port pirate, tavernes, informations a acheter et pistes de vengeance.
- Cinabre est lie au culte de Quezkari et a un retour possible d'entre les morts.
- Exploration maritime et pirate, avec objets de navigation ou de contrebande possibles.

#### Implications application

- Module Temps Ecoule en heures.
- Module Depart sans provisions.
- Module Enquete de taverne / rumeur.
- Module Ennemi pirate mort-vivant.

### Livre: Defis Fantastiques 62 - Les Hurlements du Loup-Garou

#### Profil distinct

- Base Defis Fantastiques avancee avec Points de Mutation.
- Aventure de loup-garou, transformation progressive et horreur gothique.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Mutation
- Provisions
- Pieces d'or

#### Creation / equipement

- Habilete: 1d6 divise par 2, arrondi au superieur, + 7. Total entre 8 et 10.
- Endurance: 2d6 + 10.
- Chance: 1d6 + 6.
- Mutation: 0 au depart.
- Equipement initial: epee, armure de cuir, sac a dos, lanterne, briquet amadou.
- Provisions: 10.
- Pieces d'or: 2d6 + 6.

#### Mutation

- Le heros subit une transformation au fil de l'aventure.
- Les changements sont mesures en Points de Mutation.
- Le total commence a 0, augmente inevitablement, mais peut parfois baisser.
- Des que la transformation commence, la Mutation ne peut plus tomber sous 1.
- Certains passages decrivent des effets physiques visibles: poils, oreilles pointues, hurlement de loup.

#### Mecaniques observees

- Pleine lune et poursuite par des loups.
- Dague en argent et autres objets utiles contre des creatures surnaturelles.
- Cirque ambulant et reaction sociale a la transformation.
- Plusieurs choix peuvent accepter, cacher ou exploiter l'etat de monstre.

#### Implications application

- Module Points de Mutation.
- Module Transformation progressive.
- Module Objet en argent anti-lycanthrope.
- Module Etat visible / reaction sociale.

### Livre: Defis Fantastiques 63 - Le Maitre des Tempetes

#### Profil distinct

- Profil Defis Fantastiques avance avec heros veteran, Volonte, objets legendaires et calendrier hebdomadaire.
- Le livre propose des personnages pretires comme Aldar Corbeau-Loup et Erien Fille de la Tempete.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Volonte
- Provisions
- Pieces d'or
- Jour de la semaine

#### Creation / equipement

- Habilete: 1d6 + 6.
- Endurance: 2d6 + 12.
- Chance: 1d6 + 6.
- Volonte: 6 au depart.
- Equipement de base: armure de cuir, sac a dos, lanterne, briquet.
- Pieces d'or: 2d6 + 12.
- Le heros possede aussi l'epee Fléau du Dragon et choisit deux objets parmi: Tatouage de Dragon, Corne de Chasse, Croc-Dague, Talisman Soleil.

#### Fleau du Dragon

- Epee enchantee capable de blesser morts-vivants, demons, elementaires et creatures magiques.
- Contre les drakeides, dragons et vouivres: +2 Force d'Attaque et +1 degat tant que l'epee est portee.

#### Calendrier / nourriture

- La semaine contient sept jours: Tempete, Lune, Feu, Terre, Vent, etc.
- Le jour de depart est determine par 1d6.
- Quand le Haut Jour est passe, le cycle reprend au Jour de la Tempete.
- Le heros regagne 1 Endurance par jour ecoule sans manger de provisions, sauf indication contraire.

#### Mecaniques observees

- Tempete surnaturelle attaquant un village.
- Rival recurrent, Varick Briseur de Serments.
- Deplacements rapides par Bottes de Sept Lieues, effacees apres usage.
- Reputation de heros veteran et choix d'anciens trophees.

#### Implications application

- Module Heros pretires veterans.
- Module Volonte.
- Module Objet legendaire avec bonus par type d'ennemi.
- Module Calendrier hebdomadaire cyclique.
- Module Recuperation quotidienne sans repas.
- Module Objet a usage de voyage rapide.

### Livre: Defis Fantastiques 64 - La nuit du Necromancien

#### Profil distinct

- Profil tres atypique: le heros est tue au debut et poursuit l'aventure comme esprit mort-vivant.
- Choix possible entre personnages pretires ou creation classique.
- Aventure de vengeance, necromancie, forme etheree et forme physique.

#### Statistiques / ressources

- Habilete
- Endurance
- Chance
- Volonte
- Mots codes
- Forme / etat spectral

#### Personnages pretires

- Anvus Ravalan: Habilete 8, Endurance 21, Chance 9, Volonte 6.
- Evrain Peredur: Habilete 10, Endurance 17, Chance 11, Volonte 6.
- Isolde Laodegan: Habilete 12, Endurance 19, Chance 7, Volonte 6.
- Tous commencent avec l'epee Exterminatrice de Tenebres.

#### Creation / equipement

- Habilete: 1d6 + 6.
- Endurance: 2d6 + 12.
- Chance: 1d6 + 6.
- Volonte: 6 au depart.
- La Volonte ne descend jamais sous 1.
- Equipement: armure de cuir, sac a dos, Exterminatrice de Tenebres.

#### Exterminatrice de Tenebres

- Epee sacree qui peut blesser morts-vivants, demons, elementaires et creatures magiques.
- Elle est centrale dans l'identite de chasseur d'etres malefiques du heros.

#### Etat spectral / forme physique

- Le heros peut agir sous forme etheree.
- Certaines armes ordinaires peuvent traverser le corps spectral sans effet.
- Des portes spirituelles bloquent les esprits morts-vivants.
- Obtenir une forme physique permet d'interagir avec certains lieux ou objets.
- Des nombres et mots codes sont notes pour revenir a des etats ou lieux precis.

#### Mecaniques observees

- Capacites speciales comme Esprit, permettant par exemple de voler vers certains lieux.
- Mort du heros comme point de depart et redirections quand l'Endurance tombe a zero.
- Gain de Volonte et Chance par soutien d'allies.
- Maledictions qui peuvent retirer Endurance, Habilete, Chance et Volonte.

#### Implications application

- Module Heros mort-vivant jouable.
- Module Forme etheree / forme physique.
- Module Volonte minimale.
- Module Porte spirituelle.
- Module Redirection de mort par numero note.
- Module Mots codes.

### Livre: Defis Fantastiques 65 - Massacre a la Tronconneuse de Zombies

#### Profil distinct majeur

- Systeme de combat different du Defis Fantastiques classique.
- Le heros commence sans armes, sans provisions et sans potion.
- L'aventure se concentre sur des hordes de zombies, armes modernes, munitions et soins.

#### Statistiques / ressources

- Endurance
- Dommages
- Zombies tues
- Nourriture
- Argent
- Armes
- Munitions
- Trousses de Soins
- Informations

#### Creation / endurance

- Endurance: 2d6 + 20.
- L'Endurance peut depasser son total de depart.
- Les zombies ont generalement 1 Endurance chacun.

#### Combat par Dommages

- Les armes indiquent une valeur de Dommages, par exemple 1D, 1D+2 ou 2D+5.
- Les Dommages indiquent combien de zombies sont tues dans l'assaut.
- Les zombies survivants infligent chacun 1 Endurance avant l'assaut suivant.
- Une arme a feu ne fonctionne que si le heros possede les munitions compatibles.

#### Armes / munitions

- Armes blanches et armes a feu sont trouvees dans le chateau.
- Au debut d'un combat, le joueur choisit l'arme utilisee pour toute la duree de ce combat.
- Les armes a feu utilisent des Balles, sauf les fusils qui demandent des Cartouches.
- Une fois les munitions appropriees obtenues, il n'est pas necessaire de compter chaque tir.

#### Soins / infection

- Une Trousse de Soins restaure 4 Endurance, hors combat, puis est rayee de l'equipement.
- Les morsures de zombies peuvent provoquer la transformation du heros en zombie et mettre fin a l'aventure.
- Certains passages impliquent sang de zombie, infection et mutation.

#### Implications application

- Module Combat par hordes.
- Module Dommages d'arme.
- Module Munitions compatibles non comptees.
- Module Zombies tues.
- Module Trousse de Soins.
- Module Infection zombie.

## Modules complementaires a extraire

### Modules prioritaires a extraire du lot 1

#### 1. Profil Defis Fantastiques classique

Doit couvrir livres 1, 2, 3 et 5 avec modules optionnels.

#### 2. Provisions configurables

Parametres:

- quantite de depart;
- soin par repas;
- repas libre hors combat ou seulement quand autorise;
- plafond d'Endurance initial.

#### 3. Potion de depart

Parametres:

- choix unique parmi plusieurs potions;
- charges;
- effet de restauration;
- modification possible du maximum de Chance.

#### 4. Objets importants et conditions

L'application doit distinguer:

- objet simple;
- objet important;
- objet requis pour une fin;
- objet utilisable;
- objet porte;
- objet qui ouvre une option de paragraphe;
- objet qui remplace un combat.

#### 5. Combat avance

Options a prevoir:

- plusieurs ennemis actifs;
- cible principale;
- ennemis secondaires qui peuvent blesser mais ne sont pas blesses;
- ennemis combattus comme une seule creature;
- fuite apres X assauts;
- malus/bonus de Force d'Attaque;
- degats variables;
- effet a chaque assaut;
- allie temporaire;
- cible aleatoire.

#### 6. Magie a charges

Pour La Citadelle du Chaos:

- selection initiale selon score de Magie;
- plusieurs exemplaires d'une meme formule;
- utilisation qui consomme toujours une charge;
- sort libre hors combat;
- sort contextuel propose par paragraphe.

#### 7. Argent, boutiques et achats

Deja utile aux livres 1, 3 et 5.

Parametres:

- devise;
- prix;
- achat d'objet;
- paiement obligatoire;
- pot-de-vin;
- pari;
- perte/vol.

#### 8. Parcours enrichi

Nouveaux evenements utiles:

- Objet obtenu
- Objet perdu
- Objet utilise
- Achat
- Pari / jeu
- Repas
- Potion
- Sort
- Rappel de paragraphe
- Condition acquise
- Compagnon choisi
- Compagnon mort/disparu
- Reparation
- Combat spatial
- Combat au phaseur

### Modules prioritaires ajoutes par le lot 2

#### 9. Carte ouverte / lieux revisites

Necessaire surtout pour Le Marais aux Scorpions.

Parametres:

- lieux numerotes;
- sorties cardinales;
- direction d'arrivee;
- etat du lieu;
- ennemis blesses restants;
- objets deja pris;
- retour autorise.

#### 10. Conditions durables

Exemples:

- peur;
- poison;
- maladie;
- sortilege de mort;
- maladresse;
- froid;
- perte d'arme;
- objet detruit ou inutilisable.

#### 11. Compagnons simples

Parametres:

- nom;
- role;
- statut;
- notes;
- peut aider dans un test;
- peut mourir ou etre separe;
- peut etre affecte par une condition.

#### 12. Peur

Parametres:

- maximum;
- valeur actuelle;
- gain de peur;
- reduction de peur;
- mort si valeur actuelle atteint le maximum.

#### 13. Sorts par objets consommables

Exemples:

- Pierre de Feu;
- Pierre d'Habilete;
- Pierre de Terreur;
- Potion de Mimetisme.

Comportement:

- l'objet est le sort;
- une utilisation consomme l'objet;
- plusieurs objets identiques donnent plusieurs charges.

### Modules prioritaires ajoutes par le lot 3

#### 14. Combat arme moderne

Parametres:

- jet pour toucher sous Habilete;
- degats fixes;
- degats variables;
- protection ou esquive separee;
- arme obligatoire ou combat a mains nues de secours;
- cible unique ou multi-cibles.

#### 15. Protection consommable

Parametres:

- valeur maximale;
- valeur actuelle;
- test sous Protection;
- perte de 1 point par test;
- absorption du degat en cas de reussite.

#### 16. Vehicule

Parametres:

- nom;
- Puissance de Feu;
- Blindage;
- carburant/essence;
- armes a charges;
- accessoires;
- reparations;
- transformations;
- cargaison.

#### 17. Combat motorise

Parametres:

- attaque avec Puissance de Feu;
- Blindage comme endurance du vehicule;
- armes speciales contextuelles;
- pneus, huile, roquettes, clous;
- fuite/poursuite.

#### 18. Vaisseau simplifie

Parametres:

- Armement;
- Defense;
- missiles ou armes speciales;
- destruction a Defense 0;
- degats fixes ou destruction automatique selon arme.

#### 19. Creation avec budget d'equipement

Parametres:

- lancer de depart pour budget;
- liste d'equipement achetable;
- prerequis d'achat;
- conversion budget vers protection ou objets;
- objets a charges.

### Modules prioritaires ajoutes par le lot 4

#### 20. Equipage

Parametres:

- Combativite;
- Force d'equipage;
- maximum de depart;
- perte d'hommes;
- recrutement ou recuperation;
- mort/echec si Force tombe a 0.

#### 21. Combat de groupe

Parametres:

- Combativite contre Combativite;
- Force contre Force;
- degats standards sur Force;
- fuite possible ou non;
- adversaire de groupe distinct d'un monstre classique.

#### 22. Temps / calendrier

Parametres:

- jours ecoules;
- limite de jours;
- cout en jours par voyage/action;
- verification d'echeance;
- journal de bord.

#### 23. Score secondaire

Exemples:

- Butin;
- Points de Reussite;
- Honneur.

Ces scores peuvent influencer la fin, debloquer des actions, ou simplement evaluer la performance.

#### 24. Pouvoir initial exclusif

Parametres:

- choix unique au depart;
- modification de creation;
- options de paragraphe disponibles;
- cout d'utilisation;
- score ou ressource liee.

#### 25. Indices

Parametres:

- indices de depart;
- indices trouves;
- indices requis pour une piste;
- categorie d'indice;
- source dans le Parcours.

#### 26. Capacite d'inventaire

Parametres:

- limite d'objets;
- objets sans penalite;
- penalite si depassement;
- objets suspects ou interdits selon contexte.

#### 27. Transformation durable

Exemples:

- branchies;
- maladresse;
- malediction;
- statut honneur faible;
- couverture compromise.

#### 28. Honneur / reputation

Parametres:

- valeur de depart;
- gain/perte;
- seuils;
- action disponible si seuil atteint;
- echec automatique a 0.

#### 29. Disciplines martiales

Parametres:

- choix initial;
- technique passive;
- technique utilisable seulement au premier assaut;
- munitions par type;
- attaque supplementaire conditionnelle;
- usage contextuel hors combat.

### Modules prioritaires ajoutes par le lot 5

#### 30. Robot pilotable

Parametres:

- nom/modele;
- Defense;
- Vitesse;
- Bonus de Combat;
- caracteristiques speciales;
- pilote actuel;
- paragraphe ou le modele est decrit.

#### 31. Combat robot

Parametres:

- utilise Defense au lieu d'Endurance;
- bonus/malus de robot;
- bonus de vitesse;
- fuite bloquee si vitesse inferieure;
- degats sur Defense.

#### 32. Volonte

Parametres:

- valeur de depart;
- valeur actuelle;
- seuil de folie/echec;
- pertes et gains;
- interactions avec horreur, cauchemar ou magie mentale.

#### 33. Profil creature

Parametres:

- degats recus differents du standard;
- mort instantanee sur double;
- comprehension limitee des objets;
- nourriture improvisee;
- langage/signes a apprendre;
- reactions instinctives.

#### 34. Seuil d'echec sur ressource

Exemples:

- Honneur a 0;
- Volonte sous 6;
- Force d'equipage a 0;
- Peur au maximum.

Comportement:

- l'application doit pouvoir associer une ressource a une consequence automatique.

#### 35. Objectifs multiples scelles/reliques

Parametres:

- liste d'objectifs;
- statut de chaque objectif;
- objet associe;
- paragraphe de decouverte;
- condition de fin.

### Modules prioritaires ajoutes par le lot 6

#### 36. Intervention d'allie a usage limite

Parametres:

- nom de l'allie;
- nombre d'utilisations;
- conditions d'appel;
- effet: sauvetage, soin, restauration, indice ou teleportation;
- evenement ajoute au Parcours.

#### 37. Temps / compte a rebours

Parametres:

- valeur initiale;
- unite affichee;
- pertes par action ou paragraphe;
- gains possibles;
- seuil d'echec;
- raison narrative de l'echec.

#### 38. Arme non letale avec chance d'echec

Parametres:

- nom de l'arme;
- type d'effet: immobiliser, eviter combat, neutraliser;
- probabilite ou test d'echec;
- consequence de l'echec;
- utilisable en combat ou hors combat.

#### 39. Ennemis avec point faible

Parametres:

- type d'ennemi;
- declencheur de decouverte;
- exemple: double 6;
- effet: fin immediate du combat, bonus, desactivation;
- note automatique dans le combat.

#### 40. Pouvoir / magie a cout

Parametres:

- ressource Pouvoir;
- cout par sort;
- liste de sorts connus;
- duree d'effet;
- autorisation en combat;
- recuperation par repos, reve ou instruction speciale.

#### 41. Monde alternatif / reve

Parametres:

- etat courant: reel, reve, vision, autre monde;
- stats utilisees dans ce monde;
- combats speciaux;
- consequences au reveil;
- evenements de Parcours distincts.

#### 42. Talents choisis

Parametres:

- liste de talents disponibles;
- nombre a choisir;
- description courte;
- verification dans les paragraphes;
- impossibilite de pretendre posseder un talent non choisi.

#### 43. Combat special instantane

Parametres:

- declencheur;
- formule de jet;
- resultat gagnant/perdant;
- gestion des egalites;
- consequence immediate.

### Modules prioritaires ajoutes par le lot 7

#### 44. Choix d'objets initial

Parametres:

- liste d'objets proposes;
- nombre maximal a choisir;
- objets exclusifs ou compatibles;
- ajout automatique a l'inventaire;
- note dans la creation du personnage.

#### 45. Coup Mortel

Parametres:

- declencheur de des;
- condition d'equipement;
- effet: victoire immediate, degats supplementaires ou autre;
- exceptions par combat;
- trace dans le journal de combat.

#### 46. Sablier du Destin

Parametres:

- cases a cocher;
- cases speciales avec paragraphes automatiques;
- declencheur de progression;
- affichage dans la fiche;
- evenement de Parcours quand une case speciale se declenche.

#### 47. Combat spatial avance

Parametres:

- stats du vaisseau: Niveau, Lasers, Ecrans;
- ordre de tir;
- regle de touche;
- degats aux ecrans;
- interdiction ou adaptation de la Chance;
- options tactiques: radar, ordinateur, antidedecteurs, manoeuvres.

#### 48. Manoeuvres de vaisseau

Parametres:

- coefficients: tangage, roulis, lacet;
- valeur absolue ou relative;
- objectif d'alignement;
- choix proposes par ordinateur de bord;
- consequence d'une mauvaise manoeuvre.

#### 49. Foi

Parametres:

- valeur initiale;
- valeur actuelle;
- peut depasser le depart;
- effets positifs;
- effets de reperage ou d'attraction;
- interactions avec reliques et creatures surnaturelles.

#### 50. Afflictions

Parametres:

- nom de l'affliction;
- effet actif;
- duree ou condition de levee;
- source;
- affichage dans la fiche;
- evenement de Parcours a l'obtention et a la guerison.

#### 51. Condition de destruction par combinaison d'objets

Parametres:

- cible;
- groupe d'objets requis A;
- groupe d'objets requis B;
- variante acceptable;
- paragraphe ou scene de resolution;
- message clair si la combinaison est incomplete.

### Modules prioritaires ajoutes par le lot 8

#### 52. Armee

Parametres:

- liste d'unites;
- type/race de chaque unite;
- effectif;
- chef associe;
- etat: actif, perdu, demoralise;
- evenements de recrutement et de pertes.

#### 53. Combat d'escarmouche

Parametres:

- effectifs allies;
- effectifs ennemis;
- situation: inferieure, egale, superieure;
- table de pertes;
- pertes par groupes;
- choix des unites qui subissent les pertes.

#### 54. Moral / demoralisation

Parametres:

- declencheur;
- effet sur l'armee;
- fuite, defaite ou penalite;
- lien avec la mort ou transformation du heros;
- evenement de Parcours.

#### 55. Poison progressif spatial

Parametres:

- schema ou zones a cocher;
- zone de depart;
- obligation de cocher une zone contigue;
- seuil de mort;
- remedes ou ralentissements possibles.

#### 56. Sauvetage de combat couteux

Parametres:

- objet ou pouvoir qui sauve;
- nombre de combats perdus supportes;
- nouvelle Endurance;
- couts associes;
- victoire consideree comme acquise ou combat repris.

#### 57. Siege / compte a rebours visuel

Parametres:

- nombre de defenses;
- statut de chaque defense;
- declencheur de perte;
- consequence au seuil final;
- affichage visuel dans la fiche.

#### 58. Scene chronometree en actions

Parametres:

- duree totale;
- liste d'actions disponibles;
- cout de chaque action;
- actions repetables ou non;
- resolution quand le temps tombe a zero.

### Modules prioritaires ajoutes par le lot 9

#### 59. Noirceur / corruption

Parametres:

- valeur initiale;
- valeur actuelle;
- sources de gain;
- test associe;
- seuils ou consequences;
- affichage moral dans la fiche.

#### 60. Dons choisis

Parametres:

- liste de Dons disponibles;
- nombre de Dons a choisir;
- conditions d'utilisation;
- effet contextuel;
- lien avec une ressource morale ou magique;
- options affichees seulement si le Don est connu.

#### 61. Creation retardee

Parametres:

- statistiques non calculees au depart;
- moment ou chaque statistique est revelee;
- fiche temporairement incomplete;
- blocage des modules qui exigent une stat non encore connue;
- evenement de Parcours quand la fiche devient complete.

#### 62. Risque d'Alerte

Parametres:

- valeur initiale;
- valeur actuelle;
- actions qui augmentent le risque;
- actions qui reduisent le risque;
- seuils d'alerte;
- declenchement possible de patrouilles ou combats.

#### 63. Determination

Parametres:

- valeur initiale;
- valeur actuelle;
- type d'ennemi ou scene qui demande un test;
- consequence d'un echec;
- cout ou baisse apres test;
- affichage comme ressource de courage.

#### 64. Armure a durabilite

Parametres:

- nom de l'armure;
- protection offerte;
- nombre de coups encaissables;
- usure automatique quand elle protege;
- destruction ou remplacement;
- penalite possible d'encombrement.

#### 65. Temps Passe en jours

Parametres:

- compteur de jours;
- declencheur: repos, voyage, evenement;
- phase de l'aventure ou le compteur compte vraiment;
- consequences selon le total atteint;
- affichage dans la fiche ou le Parcours.

#### 66. Munitions d'arbalete

Parametres:

- arme associee;
- type de munition;
- nombre actuel;
- consommation par tir;
- arme inutilisable a 0 munition;
- possibilite de racheter ou trouver des munitions.

#### 67. Equipement contextuel limite

Parametres:

- objet;
- nombre d'utilisations;
- utilisable librement ou seulement quand le texte le propose;
- effet sur test, combat ou choix;
- disparition, usure ou epuisement apres usage.

### Modules prioritaires ajoutes par le lot 10

#### 68. Age / vieillissement

Parametres:

- age initial;
- age actuel;
- moments ou l'age augmente;
- effets automatiques du vieillissement;
- age de stabilisation des statistiques;
- evenement de Parcours a chaque changement important.

#### 69. Endurance permanente et temporaire

Parametres:

- total permanent;
- total temporaire;
- effets qui modifient chaque type;
- restauration automatique possible;
- seuil d'age ou le permanent devient fixe;
- affichage clair pour eviter la confusion.

#### 70. Ferocite

Parametres:

- valeur initiale;
- valeur actuelle;
- gains et pertes;
- seuil critique;
- paragraphe de redirection si la valeur tombe a 0;
- lien avec l'age ou les choix violents.

#### 71. Detection / traque interdimensionnelle

Parametres:

- valeur initiale;
- valeur actuelle;
- actions qui ajoutent des traces;
- test de Detection;
- poursuivants associes;
- consequence quand les poursuivants reperent le heros.

#### 72. Voyage entre mondes

Parametres:

- objet ou pouvoir de voyage;
- monde actuel;
- mondes visites;
- conditions de sortie;
- perte ou blocage de l'objet de voyage;
- notes/cartes par monde.

#### 73. Faim obligatoire

Parametres:

- declencheur de faim;
- obligation de consommer un repas;
- consequence sans repas;
- lien avec Endurance;
- difference avec les provisions libres classiques.

#### 74. Plantes de soin

Parametres:

- nom ou type de plante;
- quantite;
- effet de soin;
- usage libre ou contextuel;
- interdiction en combat;
- notes sur lieux ou biomes ou la plante est trouvee.

#### 75. Calendrier local

Parametres:

- nom des jours;
- jour courant;
- passage du temps;
- evenements lies au jour;
- affichage dans la fiche et le Parcours.

#### 76. Cles numerotees

Parametres:

- nom de la cle;
- numero associe;
- porte ou serrure associee;
- paragraphe de destination;
- affichage du numero sur la carte d'objet.

### Modules prioritaires a extraire du lot 11

#### 77. Presence

Parametres:

- valeur initiale;
- valeur actuelle;
- formule de depart;
- attaques qui reduisent la Presence;
- sources qui restaurent ou augmentent la Presence;
- liens avec morts-vivants, magie mentale ou influences surnaturelles;
- affichage comme ressource speciale.

#### 78. Contenants reutilisables

Parametres:

- objet consomme qui laisse un contenant vide;
- nom du contenant obtenu;
- possibilite de remplir ou reutiliser le contenant plus tard;
- evenement de Parcours lors de la transformation;
- distinction entre potion pleine et bouteille vide.

#### 79. Arme de secours a degats reduits

Parametres:

- arme principale requise;
- arme de secours autorisee;
- jet ou regle qui determine les degats;
- degats normaux;
- degats reduits;
- condition de retour a une arme normale.

#### 80. Choix de heros / archetype

Parametres:

- liste de heros disponibles;
- description courte;
- formules de creation par heros;
- ressources initiales par heros;
- competences ou restrictions;
- objets ou sorts reserves;
- affichage clair avant la creation du personnage.

#### 81. Magie comme ressource d'activation d'objets

Parametres:

- total de Magie initial;
- cout d'activation;
- objets activables;
- sorts ou parchemins utilisables;
- restrictions par personnage;
- recuperation de Magie;
- message quand le heros garde un objet sans pouvoir l'activer.

#### 82. Foi

Parametres:

- valeur initiale;
- valeur actuelle;
- absence ou presence de maximum;
- gains par reliques, benedictions ou actes meritoires;
- pertes par maledictions ou actes indignes;
- effets contre demons, esprits ou forces malefiques;
- integration avec les evenements moraux du Parcours.

#### 83. Objet magique decharge

Parametres:

- objet magique ou sacre;
- charge active;
- condition qui retire la charge;
- effet apres decharge;
- affichage dans l'inventaire;
- evenement de Parcours quand l'objet perd son pouvoir.

#### 84. Poison durable sur soins

Parametres:

- source du poison;
- nombre de blessures necessaires;
- effet immediat;
- effet persistant;
- modification des soins de repas ou potions;
- condition de guerison si elle existe;
- indication visible sur la fiche du heros.

#### 85. Rival / concurrent narratif

Parametres:

- nom du rival;
- objectif partage ou oppose;
- statut du rival;
- scenes ou le rival peut devancer le heros;
- objets ou informations lies au rival;
- evenements de Parcours associes.

#### 86. Disciplines Speciales

Parametres:

- liste de disciplines;
- categorie de discipline;
- nombre a choisir;
- minimum par categorie;
- effets passifs ou actifs;
- conditions d'utilisation en paragraphe ou en combat;
- affichage dans la fiche du heros.

#### 87. Monture / selle comme stockage

Parametres:

- nom de la monture;
- statut presente/perdue;
- objets stockes sur la selle;
- arme de reserve autorisee;
- effet si la monture est absente;
- affichage dans equipement ou compagnon.

#### 88. Arme sacree anti-demons / morts-vivants

Parametres:

- arme ou pouvoir sacre;
- types d'ennemis affectes;
- bonus ou effet special;
- absence de bonus contre ennemis ordinaires;
- utilisation active ou passive;
- interaction avec disciplines comme Coup sacre ou Exorcisme.

### Modules prioritaires a extraire du lot 12

#### 89. Kit anti-mage

Parametres:

- liste des outils anti-mage;
- effets de chaque outil;
- conditions de neutralisation;
- indices de vulnerabilite;
- combinaison requise ou recommandee;
- evenement de capture ou de neutralisation.

#### 90. Munitions speciales

Parametres:

- arme a distance;
- type de munition;
- quantite;
- cible ou creature vulnerable;
- effet special;
- consommation automatique apres tir.

#### 91. Indices de detection d'entite

Parametres:

- type d'entite recherchee;
- liste d'indices observables;
- test requis ou detection automatique;
- fiabilite de l'indice;
- notes de Parcours associees.

#### 92. Compagnon avec inventaire partage

Parametres:

- nom du compagnon;
- statistiques du compagnon;
- inventaire du compagnon;
- objets accessibles au heros;
- condition de separation;
- objets a retirer si le compagnon part.

#### 93. Capture / prisonnier transporte

Parametres:

- nom du prisonnier;
- methode de capture;
- statut ligote, inconscient ou escorte;
- risque d'evasion;
- destination obligatoire;
- effets narratifs si le transport echoue.

#### 94. Points de Sang

Parametres:

- valeur initiale;
- valeur actuelle;
- gains et pertes;
- possibilite de descendre sous zero;
- lien avec puissance d'un vampire ou ennemi final;
- affichage comme compteur critique.

#### 95. Foi ambivalente

Parametres:

- valeur de Foi;
- effets protecteurs;
- effets de reperage par les forces du mal;
- reliques ou victoires qui augmentent la Foi;
- risques si la Foi est elevee;
- affichage clair des avantages et inconvenients.

#### 96. Detection

Parametres:

- statistique de base;
- cible de la detection;
- modificateurs;
- resultat succes/echec;
- objets ou competences qui ameliorent la detection.

#### 97. Receptacle d'ame / objet-source de pouvoir

Parametres:

- nom de l'objet-source;
- ennemi lie;
- effet tant que l'objet existe;
- methode de destruction;
- consequence sur l'ennemi;
- information requise pour l'identifier.

#### 98. Oeil de la Nuit

Parametres:

- valeur initiale;
- valeur actuelle;
- evenements qui l'augmentent;
- effets hostiles quand le total monte;
- aides possibles de factions opposees;
- affichage comme attention ennemie.

#### 99. Fuite du Temps

Parametres:

- valeur initiale;
- valeur actuelle;
- actions ou trajets qui ajoutent du temps;
- seuils de difficulte;
- impact sur objectif final;
- historique dans le Parcours.

#### 100. Repas obligatoire sans soin

Parametres:

- declencheur du repas obligatoire;
- perte de provision;
- soin active ou non;
- consequence si aucune provision;
- difference visuelle avec un repas volontaire.

#### 101. Poison ajoute aux blessures

Parametres:

- source de l'empoisonnement;
- degats physiques;
- degats de poison additionnels;
- antidotes disponibles;
- ce que l'antidote annule ou non;
- evenement de Parcours detaille.

#### 102. Potion a deux mesures

Parametres:

- type de potion choisi;
- nombre de mesures initial;
- effet par mesure;
- restauration au total de depart;
- bonus special possible;
- suppression apres derniere mesure.

#### 103. Poison comme compteur

Parametres:

- valeur initiale;
- valeur actuelle;
- sources qui ajoutent du poison;
- seuils ou consequences;
- remedes;
- affichage dans les etats du heros.

#### 104. Arme de feu improvisee

Parametres:

- objet utilise comme arme;
- malus de Force d'Attaque;
- degats modifies;
- types d'ennemis vulnerables;
- objet consomme ou conserve;
- restrictions en combat.

#### 105. Objet de quete incomplet / paire d'objets

Parametres:

- objet principal;
- nombre de pieces requises;
- pieces deja possedees;
- consequence si l'objet est utilise incomplet;
- affichage de progression;
- notes sur lieux ou pieces manquantes.

#### 106. Des imprimes / tirage alternatif

Parametres:

- mode de tirage classique;
- mode de tirage sans des;
- source des resultats alternatifs;
- choix d'un seul de;
- compatibilite avec l'application.

#### 107. Delai en jours avec poison lent

Parametres:

- nombre de jours total;
- jour courant;
- declencheur du delai;
- objectif avant expiration;
- antidote ou condition de survie;
- evenement de fin si le delai expire.

#### 108. Perte/remplacement force d'equipement

Parametres:

- objet perdu;
- objet de remplacement;
- malus applique;
- condition de recuperation ou remplacement;
- mise a jour automatique de l'inventaire;
- evenement de Parcours.

### Modules prioritaires a extraire du lot 13

#### 109. Temps Ecoule en heures

Parametres:

- valeur initiale;
- unite heures;
- ajouts par paragraphe;
- seuils ou consequences;
- affichage dans la fiche;
- evenement de Parcours quand le temps avance.

#### 110. Enquete de taverne / rumeur

Parametres:

- lieu d'enquete;
- cout en pieces d'or;
- information recueillie;
- personne source;
- fiabilite de la rumeur;
- note automatique dans le Parcours.

#### 111. Ennemi pirate mort-vivant

Parametres:

- identite de l'ennemi;
- statut vivant, mort ou revenu;
- lien avec culte ou malediction;
- indices de resurrection;
- effet sur objectif de vengeance.

#### 112. Points de Mutation

Parametres:

- valeur initiale;
- valeur actuelle;
- seuil minimum apres debut de transformation;
- gains et pertes;
- effets physiques ou sociaux;
- consequences de seuils eleves.

#### 113. Transformation progressive

Parametres:

- etapes de transformation;
- descriptions visibles;
- bonus ou malus;
- reactions des PNJ;
- possibilite de cacher ou accepter l'etat;
- evenement de Parcours a chaque changement.

#### 114. Objet en argent anti-lycanthrope

Parametres:

- nom de l'objet;
- type d'ennemi affecte;
- usage porte, lance ou consomme;
- effet special;
- perte possible de l'objet;
- condition narrative d'utilisation.

#### 115. Heros pretires veterans

Parametres:

- liste de personnages;
- statistiques fixes;
- equipement fixe;
- ressources fixes;
- historique court;
- option de creer son propre personnage.

#### 116. Objet legendaire avec bonus par type d'ennemi

Parametres:

- nom de l'objet;
- types d'ennemis affectes;
- bonus de Force d'Attaque;
- bonus de degats;
- condition de port;
- absence ou presence d'effet contre les autres ennemis.

#### 117. Calendrier hebdomadaire cyclique

Parametres:

- liste des jours;
- jour de depart aleatoire ou fixe;
- passage au jour suivant;
- retour au debut apres dernier jour;
- evenements lies au jour;
- affichage du jour courant.

#### 118. Recuperation quotidienne sans repas

Parametres:

- soin par jour;
- condition de declenchement;
- lien ou non avec provisions;
- exception indiquee par le texte;
- affichage distinct des soins par repos.

#### 119. Objet a usage de voyage rapide

Parametres:

- nom de l'objet;
- destinations possibles;
- limite d'une visite par destination;
- effet de deplacement instantane;
- suppression apres usage;
- historique de destinations visitees.

#### 120. Heros mort-vivant jouable

Parametres:

- etat vivant/mort-vivant;
- statistiques conservees;
- nouvelles restrictions;
- interactions impossibles ou facilitees;
- ennemis capables de blesser le heros;
- redirections si l'Endurance tombe a zero.

#### 121. Forme etheree / forme physique

Parametres:

- forme actuelle;
- actions possibles par forme;
- objets ou portes accessibles;
- vulnerabilites;
- cout ou condition de changement;
- affichage clair dans la fiche.

#### 122. Porte spirituelle

Parametres:

- type de porte ou barriere;
- forme bloquee;
- degats ou refoulement;
- mot code ou condition pour passer;
- indication visible dans les notes de lieu.

#### 123. Redirection de mort par numero note

Parametres:

- numero a noter;
- cause de defaite;
- paragraphe de retour;
- etat conserve apres redirection;
- difference avec mort definitive;
- trace dans le Parcours.

#### 124. Mots codes

Parametres:

- mot code;
- condition d'obtention;
- effet futur;
- affichage dans une section dediee;
- recherche rapide pendant les choix de paragraphe.

#### 125. Combat par hordes

Parametres:

- nombre d'ennemis;
- Endurance par ennemi;
- arme choisie;
- Dommages par assaut;
- ennemis restants;
- degats subis par survivant.

#### 126. Dommages d'arme

Parametres:

- formule de Dommages;
- minimum et maximum;
- type d'arme;
- cible;
- duree du choix d'arme;
- interaction avec hordes ou ennemis uniques.

#### 127. Munitions compatibles non comptees

Parametres:

- type d'arme a feu;
- type de munition requis;
- statut possede/non possede;
- pas de suivi du nombre de tirs;
- blocage si munition absente;
- message d'utilisation.

#### 128. Zombies tues

Parametres:

- compteur total;
- zombies tues par assaut;
- zombies tues par evenement;
- utilisation narrative ou score final;
- affichage dans la fiche.

#### 129. Trousse de Soins

Parametres:

- quantite;
- soin fixe;
- interdiction en combat;
- consommation apres usage;
- categorie medicament;
- evenement de Parcours.

#### 130. Infection zombie

Parametres:

- source d'infection;
- morsure ou contact sanguin;
- consequence immediate;
- delai ou fin directe;
- remede possible ou non;
- etat infecte dans la fiche.

## Structure cible possible pour bookProfiles

Exemple conceptuel:

```ts
type BookProfile = {
  id: string;
  title: string;
  series: string;
  baseProfile: string;
  modules: string[];
  characterCreation: unknown;
  stats: unknown;
  resources: unknown;
  initialInventory: unknown;
  initialChoices?: unknown;
  combatRules: unknown;
  luckRules?: unknown;
  healingRules?: unknown;
  magicRules?: unknown;
  shopRules?: unknown;
  journeyActions?: unknown;
  itemPresets?: unknown;
  specialConditions?: unknown;
  companions?: unknown;
  vehicle?: unknown;
};
```

Cette structure est volontairement provisoire. Elle devra etre raffinee quand plusieurs lots auront ete analyses.
