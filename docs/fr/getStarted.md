## Quick Start

> Note : Pour chaque lien se trouve des éléments complémentaires afin de mieux cerné la partie en question

<div id="installation"></div>

#### ⚙️ Installation

```
yarn add lyatom-cms
```

ou

```
npm i lyatom-cms
```

crée un fichier Json avec les données initiales.

```json
{
  "title": "Title",
  "paragraph": "paragraph",
  "image": "logo.png"
}
```

<div id="configuration"></div>

#### Create a configuration file _( [voir les options](../configurationFile.md))_

> Vous pouvez vous aidez du typage "CmsPropsType" .

```typescript
import { CmsPropsType } from "lyatom-cms";

const data: CmsPropsType = {
  branch: "main", // Branch to update
  repo: "NJG-connect/lyatom-cms", // Follows the pattern [org-or-username]/[repo-name]
  urlForLogin: "admin", // url for access of the panelAdmin
  mediaFolder: "/src/assets/images", // root path to the media files
  title: "demo Lyatom CMS", // title in the PanelAdmin
  type: "firstLvl", // start always with this
  fields: [
    {
      type: "section", // start second with this its to create first section on Panel
      title: "Section 1",
      file: "/src/data/info.json", // root path specifies info of the first section
      fields: [
        {
          type: "input",
          title: "Title", // printing on AdminPanel
          id: "title", // key reference in the file ( info.json)
          htmlId: "title-example-id", // id to write in the html for real time editing
        },
        {
          type: "input",
          title: "paragraph",
          id: "paragraph",
          htmlId: "subtile-example-id",
        },
        {
          type: "image",
          title: "Logo",
          id: "image",
          htmlId: "logo-example-id",
        },
      ],
    },
  ],
};
export default data;
```

<div id="pat"></div>

#### Create Personnal Access Token on GitHub

Je vous invite à directement suivre le tuto de la documentation de github [dispo ici](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

une fois fait, pour une question de sécurité ajoutez-le dans un fichier `.env`

<div id="initAdminPanel"></div>

#### Boost your Content & Initialize < AdminPanel />

Puis import-le dans votre projet & remplacer également les valeurs du premier Json avec les informations

n'oubliez pas de matcher l'id des balises avec les valeurs `htmlId` du fichiers de configuration

```javascript
import React from "react";
import AdminPanel from "lyatom-cms";
import data from "./data";
import infoJson from "./data/info.json";

export default App = () => {
  return (
    <div>
      <AdminPanel
        config={data} // import une config here
        githubToken={process.env.REACT_APP_GH_TOKEN_PERSONAL} // create a PAT on github and add it to the .env
      />

      <h1 id="title-example-id">{infoJson.title}</h1>
      <p id="subtile-example-id">{infoJson.paragraph}</p>
      <img
        id="logo-example-id"
        src={require("./assets/images/" + infoJson.image).default}
      />
    </div>
  );
};
```

Hebergé votre site sur netlify [petit tuto](https://www.netlify.com/blog/2016/10/27/a-step-by-step-guide-deploying-a-static-site-or-single-page-app/) en 5min

dernière étape

Sur netlify Aller à Settings > Identity, and select Enable Identity service

> si vous voulez lancer votre projet en local copié l'api EndPoint et l'insérer lors du premier lancement en local quand une fenêtre vous demandera l'url de votre site Netlify

C'est tout !

vous pouvez lancer votre site ( soit en locale soit depuis l'url en ligne ) et accéder à votre espace à l'adresse de votre site suivie des informations fournit dans le fichier de configuration (urlForLogin) dans notre exemple nomdusite.com/admin ou localhost:300/admin
