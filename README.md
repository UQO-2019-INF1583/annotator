# Préface

Le projet Annotator est un projet réalisé par les étudiants de l'Université du Québec en Outaouais (UQO). Accessible à partir du Web, Annotator permettra de modifier des fichiers .xmi avec annotations produites par l'outil cTakes ou annoter des fichiers texte.

Pour plus d'informations, vous pouvez consulter le wiki du projet qui contient un extrait du cahier des charges et permet de mieux comprendre l'enjeu du projet.

# Installation

## 1. Création d’un projet Firebase

### 1.1. À partir de la console Firebase, créer un nouveau projet web en cliquant sur “New
Project”, puis en cliquant sur “Add Firebase to your web app”. Ceci génère cinq variables de
configuration (“apiKey”, “authDomain”, “databaseURL”, “projectId”, “storageBucket” et
“messagingSenderId”) qui seront intégrés au projet Angular dans une étape ultérieure.

### 1.2. Cliquer sur “Authentication” et choisir les modes d’authentification voulues. Pour
cette première étape, vous pouvez utiliser le mode d’authentification anonyme.

### 1.3. Cliquer sur l’onglet “Database”, puis sur “RULES” pour modifier les règles d’accès à la
base de données. Dans cette première étape du projet, les règles sont un accès universel,
soit donner la valeur “true” aux variables .read et .write. Ceci sera à modifier au fur et à
mesure que des modules et des types d’utilisateurs seront spécifiés.

## 2. Initialisation du projet Angular

## 2.1. À partir de la ligne de commande, exécuter la commande “npm install -g @angular/cli”
pour installer la dernière publication stable de Angular CLI. Une fois le
logiciel installé, exécuter ng new <<nom du projet>>, ​et accéder au projet (cd <<nom du
projet>>).

## 3. Cloner le projet

# Usage

# Dévelopment

##  Structure du projet
```
Annotator/                        -- racine du projet
├── e2e/                          -- les tests fonctionnels (de type end-to-end)
└── src/                          -- fichiers sources propre à l'excécution de l'application
    ├── app/                      -- les sources du projet
    │ ├── guard/                -- reimportation de la session
    │ ├── components/
    │       ├── admin
    │       ├── annotation        -- fonctionnalité de l'annotation
    │       ├── home
    │       ├── login
    │       ├── register
    │       └── ...
    │ ├── directives/
    │ ├── firebase/             -- serveur firebase
    │ ├── models/
    │ ├── services/
    │ └── shared/
    │       ├── component
    │           ├── header        -- l'en-tête des pages
    │           └── footer        -- le pied des pages
    │       └──modules            -- autres composantes partagées
    ├── assets/                   -- fichiers ressources
    ├── environments/             -- description des environnements (prod, test, dev)
    ├── README.md               -- fichier de présentation du projet au format Markdown
    ├── .angular-cli.json       -- fichier de configuration d'Angular CLI
    ├── .editorconfig           -- règles de codage pour les différents IDE utilisés par les contributeurs
    ├── .gitignore              -- une liste des fichiers qui doivent être ignorés par git
    ├── karma.conf.js           -- fichier de configuration du Test runner Karma
    ├── package.json            -- fichier de configuration du projet (dépendances)
    ├── protractor.conf.js      -- fichier de configuration pour Protractor
    ├── sonar-project.properties -- fichier de configuration pour SonarQube
    ├── tsconfig.json           -- fichier de configuration de [TypeScript](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
    └── tslint.json             -- fichier de configuration de TSlint
```

## Installation d'Angular :

L'utilisation de l'application nécessite l'installation de Angular CLI. Voici la commande ```<npm install @angular/cli>```.
Le projet a été généré avec Angular CLI version 1.4.7. [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
