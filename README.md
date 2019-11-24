# Préface

Le projet Annotator est un projet réalisé par les étudiants de l'Université du Québec en Outaouais (UQO). Accessible à partir du Web, Annotator permettra de modifier des fichiers .xmi avec annotations produites par l'outil cTakes ou annoter des fichiers texte.

Pour plus d'informations, vous pouvez consulter le wiki du projet qui contient un extrait du cahier des charges et permet de mieux comprendre l'enjeu du projet.

# 1 Installation

## 1.1 Installation de Node.js et npm
1.1.1 Vérifier que Node.js et npm sont installés dans votre environnement de travail :
``` node -v ``` et ``` npm -v``` devraient vous retourner les versions de Node.js et npm si c'est le cas.

1.1.2 Si Node.js et npm ne sont pas installés, suivre les instructions d'installation sur https://nodejs.org

## 1.2 Création d’un projet Firebase (si vous voulez votre propre base de données - optionnel)

1.2.1 À partir de la console Firebase, créer un nouveau projet web en cliquant sur “New
Project”, puis en cliquant sur “Add Firebase to your web app”. Ceci génère cinq variables de
configuration (“apiKey”, “authDomain”, “databaseURL”, “projectId”, “storageBucket” et
“messagingSenderId”) qui seront intégrés au projet à l'étape [2.2](#22-mise-à-jour-des-fichiers-environnement)

1.2.2 Cliquer sur “Authentication” et choisir les modes d’authentification voulues. Pour
cette première étape, vous pouvez utiliser le mode d’authentification anonyme.

1.2.3 Cliquer sur l’onglet “Database”, puis sur “RULES” pour modifier les règles d’accès à la
base de données. Dans cette première étape du projet, les règles sont un accès universel,
soit donner la valeur “true” aux variables .read et .write. Ceci sera à modifier au fur et à
mesure que des modules et des types d’utilisateurs seront spécifiés.

## 1.3 Installation du projet 

1.3.1 Cloner ou télécharger le projet

1.3.2 Pour installer les dépendances du projet exécuter la commande ```npm install```

# 2 Développement

##  2.1 Structure du projet

```
Annotator/                        -- racine du projet
├── e2e/                          -- les tests fonctionnels (de type end-to-end)
└── src/                          -- fichiers sources propre à l'excécution de l'application
    ├── app/                      -- les sources du projet
    │ ├── guard/                -- reimportation de la session
    │ ├── components/
    │       ├── adm
    │       ├── annotation        -- fonctionnalité de l'annotation
    │       ├── home
    │       ├── login
    │       ├── register
    │       └── ...
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
##  2.2 Mise à jour des fichiers environnement
Au besoin, mettre à jour les cinq variables de configuration “apiKey”, “authDomain”, “databaseURL”, “projectId”, “storageBucket” et
“messagingSenderId” de votre base de données firebase dans les fichiers environnement (src/environments/*.ts)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Possible issues:
1) To solve the error
  Error: Can't resolve 'webpack-dev-server/client?http://localhost:4200'
  you can

  npm install yarn -g
  ng set --global packageManager=yarn
  yarn install

  ng serve

2) To fix the error “npm ERR! Error: EPERM: operation not permitted”,
  see https://www.nikhildevre.com/ColdFusion,Java,jQuery,JavaScript,Angular,TypeScript,Node,NPM/npm-err-please-try-running-this-command-again-as-rootadministrator/

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
