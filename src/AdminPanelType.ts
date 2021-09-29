export interface sectionType {
  type: "section";
  title: string;
  file: string;
  fields: Array<inputType | objectType | arrayType | imageType>;
  // urlPage?: string;
}

export interface inputType {
  type: "input";
  title: string;
  value?: any;
  disabled?: boolean;
  id: string;
  htmlId?: string;
}
export interface imageType {
  type: "image";
  title: string;
  mediaFolder?: string;
  value?: any;
  // canAdd?: boolean;
  // canEdit?: boolean;
  id: string;
  htmlId?: string;
}

export interface objectType {
  type: "object";
  title: string;
  id: string;
  fields: Array<sectionType | inputType | objectType | arrayType | imageType>;
}
export interface arrayType {
  type: "array";
  title: string;
  id: string;
  fields: Array<inputType | imageType>;
  referenceFieldKey: string;
  canAdd?: boolean;
  canDelete?: boolean;
  // canReoder?: boolean;
  htmlId?: string;
  value?: string;
}

export interface CmsPropsType {
  type: "firstLvl";
  branch: string;
  repo: string;
  title: string;
  urlForLogin: string;
  mediaFolder?: string;
  fields: Array<sectionType>;
}

export default CmsPropsType;
