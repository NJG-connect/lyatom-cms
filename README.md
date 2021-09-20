<p align="center">
  <img src="./src/icons/logo.png" alt="Lyatom cms" width="50%" />
</p>
<h1 align="center">Lyatom CMS <small><sup>(React.js Package)</sup></small></h1>

[![LyatomCMS Demo](./src/icons/Lyatom-CMS.gif)](https://tina.io/)

## About

Lyatom CMS est un Package concu en React.js qui permet aux utilisateurs par un moyen simple de modifier et d'ajouter du contenu directement sur votre site concu en React.js

## Core characteristics

- Inscription + Connection
- Modifiez votre site en temps réel
- Edition Cross-Platform
- Authentification **external OAuth** (compte : Google, Netlify Identity, Github )
- Gestion des Utilisateurs
- Versionning

## Get started

1°) Installer le package sur votre projet
2°) Créer une clé personnel Github
3°) Créer son fichier de Configuration
4°) Initiliaser l'admin Panel sur la page souhaité

## Quick Start

⚙️ Installation

```
yarn add lyatom-cms
```

créer un fichier Json avec tes données initiales

```json
  "title" : "Title",
  "paragraph": "paragraph",
  "image": "logo.png"
```

créer un fichier de configuration ( vous pouvez vous aidez du typage "CmsPropsType")

```typescript
import { CmsPropsType } from "lyatom-cms";

const data: CmsPropsType = {
  branch: "main",
  repo: "NJG-connect/lyatom-cms",
  urlForLogin: "admin",
  mediaFolder: "/src/assets/images",
  title: "demo Lyatom CMS",
  type: "firstLvl",
};
export default data;
```

import-le dans votre projet

```javascript
import React from "react";
import AdminPanel, { CmsPropsType } from "lyatom-cms";

export default App = () => {
  return (
    <div >
      <AdminPanel
        parameter={data}
        githubToken={process.env.REACT_APP_GH_TOKEN_PERSONAL!}
      />

      <h1></h1>
      <p></p>
    </div>
  );
};
```

## Example

- [live demo](https://lyatomdemo.netlify.app/)
- tu veux le tester en locale suit ce [lien](./examples/demo/README.md)

## Features

- Enrichir les types Inputs
- Support de plusieurs langue
- Gestion de rôle ( edition, lecture )
- Outil permettant la création automatique du fichier de configuration

## Not for everyone ✌️

Prérequis necéssaires :

- le site doit-etre concu en [React.js](https://fr.reactjs.org/).
- Le site doit utiliser [Netlify](https://www.netlify.com/)

## Motivation

Nous avons créer ce CMS pour proposer une expérience légère & fluide à l'utilisateur avec un design épuré afin de s'adapter à tous type d'utilisation.

Avec des fonctionnalités d'un Content Manager System LyatomCMS à l'avantage de fonctionner sans serveur (Git-based CMS)

## Open Source

Nous avons développé & proposons l'utilisation de ce cms gratuitement afin d'en faire un outil collaboratif et évolutif.

## Need help

> Pas le temps de s'y pencher, des difficultés d'intégrations ? NJG Connect vous accompagne sur la mise en place de l'outil sur votre site web.

## Contributing

N'hesitez pas à proposer des améliorations, remonter des bugs pour faire de cette outil, NOTRE OUTIL.

## Creator ✍️

Propulsé par [NJG Connect](https://njgconnect.fr/) Entreprise digital spécialisé dans le Développement, graphisme et conseil digital.

- Designé par [Jonathan Nohile](https://www.linkedin.com/in/jonathan-nohile) (CEO - NJG Connect)
- Développé par [Jeremy Noh](https://github.com/JeremyNoh) (CTO - NJG Connect)

## Read this in other languages

- English
- French
