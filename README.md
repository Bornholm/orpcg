# O.R.P.C.G.

Open Role Playing Card Game

## Objectifs

- Simplification du démarrage d'une partie (decks préconfiguré, règles simplifiées)
- Combat orienté coopération et tactique (facteur aléatoire limité, importance du placement des personnages en combat)
- Ne gérer que le "minimum vital" avec les cartes, laisser le reste au maitre du jeu et aux joueurs.

## Règles

### Les cartes

[Voir les cartes existantes](./dist/cards.pdf)

Dans O-RPCG, la traditionnelle feuille de personnage est remplacée par un "deck" (paquet) de cartes qui représente les caractéristiques, l'inventaire et les capacités du personnage.

Chaque joueur crée et/ou personnalise son propres deck de cartes afin de définir les attributs de son personnage en début de campagne en fonction de la quantité **d'expérience** allouée par le maitre du jeu.

Il n'y a pas de limite au nombre de carte qu'un joueur peut avoir dans son deck.

### Expérience

L'expérience d'un joueur représente l'avancée de son personnage dans l'univers du jeu.

À sa création, un personnage démarre avec un niveau d'expérience défini par le maître du jeu, en fonction de la difficulté de la campagne de jeu.

Au cours de la partie, le maître du jeu pourra récompenser (on pénaliser) un joueur pour ses actions en lui remettant ou en retirant des points d'expérience supplémentaires.

Toutes les cartes d'O-RPCG ont un coût en expérience (qui peut être nul). Ce coût est indiqué en bas à droite sur les cartes.

L'expérience constitue une réserve de points que le joueur peut dépenser afin de définir son "deck" de cartes définissant les capacités de son personnage.

**Le total des coûts en expérience des cartes d'un deck de joueur ne peut pas dépasser son total d'expérience.**

### Caractéristiques des personnages

Les caractéristiques représentent les capacités physiques et mentales, innées ou acquises d'un personnage.

Tous les personnages démarrent avec leur caractéristiques à 0.

Les valeurs de caractéristique d'un personnage sont définies par les cartes _Caractéristique_ présentes dans sont deck et/ou les cartes comportant des modificateurs de caractéristique.

**Sauf si indiqué le contraire, les cartes de caractéristiques sont cumulatives.**

#### Force

Influe sur le nombre d'objets transportables et les jets associés à cette caractéristique.

#### Intelligence
#### Charisme
#### Sagesse
#### Constitution

Influe sur le nombre de points de vie total du personnage.

#### Agilité

Influe sur l'ordre d'exécution des rounds et les jets associés à cette caractéristique.

### Inventaire

L'inventaire d'un personnage correspond aux objets que celui ci transporte avec lui.

**Un personnage ne peut pas avoir dans son deck plus de carte de type _Objet_ que sa capacité totale d'inventaire.**

La capacité totale de l'inventaire d'un personnage est fonction de sa caractéristique de _Force_ et des cartes comportant un modificateur de capacité d'inventaire, tel que les carte de type _Sac_.


## Combats

Combats en "formation" par round (tour de jeu)

### Formations

Les combats se déroulent en formation, c'est à dire que le placement des cartes représentants les personnages ont une importance.

Exemple:

Soit A,B,C,D des monstres gérés par le maitre du jeu et 1,2,3 des personnages gérés par les joueurs.

```
  Bord du maitre du jeu

        C B A
          D
  --------------------- Ligne de front
          1 3
        2

  Bord des joueurs
```

Règles pour les affrontements:

- Les armes ou techniques de portée 0 (corps à corps) ne peuvent cibler des adversaires uniquement sur une ligne adjacente (Ex: 1 et D)
- Si un allié ou un adversaire encombre la ligne de vue vers la cible, celle ci est considérée comme hors d'atteinte (3 peut cibler A ou D avec une arme ou une technique de portée 1 ou plus, mais ne peut pas cibler B ou C)

### Déroulement d'un combat

1. Mise en place de la formation (sauf si le contexte/maitre du jeu impose une formation au joueurs)
2. Dans l'ordre d'initiative (ordre décroissant de l'agilité + intelligence), activation des monstres et des joueurs
3. Chaque personnage peut enclencher UNE action par round ou passer son tour:
  - Utiliser une carte de type "Technique"
  - Attaquer un adversaire
  - Echanger sa position avec un allié adjacent dans la formation. Attention, cette action consomme également l'action de l'allié ! L'allié en question ne doit donc pas avoir encore utilisé son action dans ce round.

## Inspirations

- http://www.expeditiongame.com/rules/

## Licence

Creative Commons 4.0 NC-BY-SA
