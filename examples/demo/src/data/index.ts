import { CmsPropsType } from "lyatom-cms";

const data: CmsPropsType = {
  branch: "main",
  repo: "NJG-connect/lyatom-cms",
  urlForLogin: "admin",
  mediaFolder: "/examples/demo/src/assets/images",
  title: "demo Lyatom CMS",
  type: "firstLvl",
  fields: [
    {
      type: "none",
      title: "Menu",
      file: "/examples/demo/src/data/menu.json",
      fields: [
        {
          type: "image",
          title: "Logo",
          id: "logo",
          htmlId: "logo-Menu",
        },
      ],
    },
    {
      type: "none",
      file: "/examples/demo/src/data/header.json",
      title: "Header",
      fields: [
        {
          type: "input",
          htmlId: "title-header",
          id: "title",
          title: "Title :",
        },
        {
          type: "input",
          htmlId: "subtitle-header",
          id: "subtitle",
          title: "Subtitle :",
        },
        {
          type: "input",
          htmlId: "buttonTitle-header",
          id: "buttonTitle",
          title: "Button title :",
        },
        {
          type: "image",
          title: "Logo ",
          id: "logo",
          htmlId: "logo-Header",
        },
      ],
    },
    {
      type: "none",
      file: "/examples/demo/src/data/firstSection.json",
      title: "First Section",
      fields: [
        {
          type: "input",
          htmlId: "title-first-section",
          id: "title",
          title: "Title :",
        },
        {
          type: "input",
          htmlId: "subtitle-first-section",
          id: "subtitle",
          title: "Subtitle :",
        },

        {
          type: "image",
          title: "Logo :",
          id: "logo",
          htmlId: "logo-first-section",
        },
        {
          type: "array",
          title: "Information Section",
          referenceFieldKey: "title",
          id: "infoSection",
          canAdd: true,
          canDelete: true,
          fields: [
            {
              type: "input",
              htmlId: "title-first-section-item",
              id: "title",
              title: "Title :",
            },
            {
              type: "input",
              htmlId: "subtitle-first-section-item",
              id: "subtitle",
              title: "Subtitle :",
            },
            {
              type: "image",
              title: "Logo :",
              id: "logo",
              htmlId: "logo-first-section-item",
            },
          ],
        },
      ],
    },
    {
      type: "none",
      title: "Second Section",
      file: "/examples/demo/src/data/secondSection.json",
      fields: [
        {
          type: "input",
          htmlId: "title-second-section",
          id: "title",
          title: "Title :",
        },
        {
          type: "input",
          htmlId: "subtitle-second-section",
          id: "subtitle",
          title: "Subtitle :",
        },
        {
          type: "input",
          htmlId: "buttonName-second-section",
          id: "buttonName",
          title: "Button name :",
        },
      ],
    },
  ],
};

export default data;
