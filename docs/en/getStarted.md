## Quick Start

> Note: For each link there are additional elements to better understand the part in question

<div id="installation"></div>

#### ⚙️ Installation

```
yarn add lyatom-cms
```

or

```
npm i lyatom-cms
```

creates a Json file with the initial data.

```json
{
  "title": "Title",
  "paragraph": "paragraph",
  "image": "logo.png"
}
```

<div id="configuration"></div>

#### Create a configuration file _( [voir les options](../configurationFile.md))_

> You can use the "CmsPropsType" typing.

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
      type: "none", // start second with this its to create first section on Panel
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

I invite you to directly follow the tutorial of the github documentation [available here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

once done, for security reasons add it to a file `.env`

<div id="initAdminPanel"></div>

#### Boost your Content & Initialize < AdminPanel />

Then import it into your project & also replace the values ​​of the first Json with the information

don't forget to match the tag id with the `htmlId` values ​​from the configuration file

```javascript
import React from "react";
import AdminPanel from "lyatom-cms";
import data from "./data";
import infoJson from "./data/info.json";

export default App = () => {
  return (
    <div>
      <AdminPanel
        parameter={data}
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

Hosted your site on netlify [small tutorial](https://www.netlify.com/blog/2016/10/27/a-step-by-step-guide-deploying-a-static-site-or-single-page-app/) en 5min

last step

On Netlify go on Settings > Identity, and select Enable Identity service

> If you want to launch your project locally, copy the EndPoint API and insert it during the first local launch when a window will ask you for the url of your Netlify site

That's all !

You can launch your site (either locally or from the online url) and access your space at the address of your site followed by the information provided in the configuration file (urlForLogin) in our example sitename.com/admin or localhost:300/admin
