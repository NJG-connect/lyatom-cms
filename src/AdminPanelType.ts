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
  disabled?: boolean;
  id: string;
  htmlId?: string;
}
export interface imageType {
  type: "image";
  title: string;
  mediaFolder?: string;
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

// The next type is the same but with value added after we add data on each type
// the value it's the path of the real data of the JSON file

export interface CmsPropsTypeWithValue extends CmsPropsType {
  fields: Array<sectionTypeWithValue>;
}
export interface inputTypeWithValue extends inputType {
  value?: string;
}
export interface imageTypeWithValue extends imageType {
  value?: string;
}
export interface arrayTypeWithValue extends arrayType {
  value?: string;
}
export interface objectTypeWithValue extends objectType {
  fields: Array<
    | sectionTypeWithValue
    | inputTypeWithValue
    | objectTypeWithValue
    | arrayTypeWithValue
    | imageTypeWithValue
  >;
}
export interface sectionTypeWithValue extends sectionType {
  fields: Array<
    | inputTypeWithValue
    | objectTypeWithValue
    | arrayTypeWithValue
    | imageTypeWithValue
  >;
}

export default CmsPropsType;
