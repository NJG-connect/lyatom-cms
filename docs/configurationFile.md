## Configuration file and LyatomCMS Option

Additional information before starting:

LyatomCMS currently has two parameters:
**githubToken**: `string` which represents a personal access token
**config**: `Object` which will create the structure of the Panel

We will see the options of `config`

> For the construction of the config you can use the type `CmsPropsType

example of the `config` name:

```typescript
import { CmsPropsType } from "lyatom-cms";

const config: CmsPropsType = {
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

#### Options config

---

| Properties  |      Type       |            Description            | Required |
| :---------: | :-------------: | :-------------------------------: | :------: |
|    type     |   `"firstvl"`   |      Start always with this       |  `true`  |
|   branch    |    `string`     |         Branch to update          |  `true`  |
|    repo     |    `string`     | [org-or-username]**/**[repo-name] |  `true`  |
|    title    |    `string`     |      Title in the PanelAdmin      |  `true`  |
| urlForLogin |    `string`     | Url for access of the panelAdmin  |  `true`  |
| mediaFolder |    `string`     |   Root path to the media files    | `false`  |
|   fields    | `sectionType[]` | Retrieve content of your website  |  `true`  |

#### Options of Fields

##### Option sectionType

| Properties |       Type       |                Description                 | Required  |
| :--------: | :--------------: | :----------------------------------------: | :-------: | ------------ | -------------------------------- | ------ |
|    type    |   `"section"`    |                Description                 |  `true`   |
|   title    |     `string`     |             Title in the Panel             |  `true`   |
|    file    |     `string`     | Where the json file information is located |  `true`   |
|   fields   | `Array<inputType |                 objectType                 | arrayType | imageType>;` | Retrieve content of your website | `true` |

##### Option inputType

for edit text content will create a input

| Properties |    Type     |                       Description                       | Required |
| :--------: | :---------: | :-----------------------------------------------------: | :------: |
|    type    |  `"input"`  |                   will print a input                    |  `true`  |
|   title    |  `string`   |                  Title for your input                   |  `true`  |
|   value    | `undefined` |           dont write anything in this section           | `false`  |
|  disabled  |  `boolean`  |                     disabled input                      | `false`  |
|     id     |  `string`   |          reference of the key in the json file          |  `true`  |
|   htmlId   |  `string`   | Add this id in the HTML for see change in the real time | `false`  |

<br/>

##### Option objectType

Refers to an Object, will create a Section with the different fields inside

| Properties |        Type        |                        Description                        |  Required  |
| :--------: | :----------------: | :-------------------------------------------------------: | :--------: | --------- | ----------- | -------------------------- | ------ |
|    type    |     `"object"`     | refer to a Object in your JSON file will create a Section |   `true`   |
|   title    |      `string`      |                  Title for your Section                   |   `true`   |
|     id     |      `string`      |       reference of the Object key in the json file        |   `true`   |
|   fields   | `Array<sectionType |                         inputType                         | objectType | arrayType | imageType>` | Other Fields in the Object | `true` |

##### Option arrayType

Refers to an Array, will create a Section with the different fields inside

|    Properties     |       Type       |                       Description                        |         Required          |
| :---------------: | :--------------: | :------------------------------------------------------: | :-----------------------: | ------ |
|       type        |    `"array"`     | refer to a Array in your JSON file will create a Section |          `true`           |
|       title       |     `string`     |                   Title for your input                   |          `true`           |
|        id         |     `string`     |          reference of the key in the json file           |          `true`           |
|      fields       | `Array<inputType |                       imageType>`                        | Other Fields in the Array | `true` |
| referenceFieldKey |     `string`     |        Name of Key in your content of your array         |          `true`           |
|      canAdd       |    `boolean`     |            Can delete a element in your Array            |          `false`          |
|     canDelete     |    `boolean`     |            Can delete a element in your Array            |          `false`          |
|      htmlId       |     `string`     | Add this id in the HTML for see change in the real time  |          `false`          |
|       value       |   `undefined`    |           dont write anything in this section            |          `false`          |

<br/>
##### Option imageType

Refers to an Image, will create a ImagePicker, see a gallery , and upload new image

| Properties  |    Type     |                                    Description                                     | Required |
| :---------: | :---------: | :--------------------------------------------------------------------------------: | :------: |
|    type     |  `"image"`  |                              will print a ImagePicker                              |  `true`  |
|    title    |  `string`   |                             Title for your imagePicker                             |  `true`  |
|    value    | `undefined` |                        dont write anything in this section                         | `false`  |
| mediaFolder |  `string`   | Root path to the media files dont need if the same of the first mediaFolder fields | `false`  |
|     id      |  `string`   |                       reference of the key in the json file                        |  `true`  |
|   htmlId    |  `string`   |              Add this id in the HTML for see change in the real time               | `false`  |
