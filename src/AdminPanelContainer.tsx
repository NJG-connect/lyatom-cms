import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  HTMLAttributes,
} from "react";

import CmsPropsType, {
  sectionType,
  inputType,
  objectType,
  arrayType,
  imageType,
  sectionTypeWithValue,
  inputTypeWithValue,
  objectTypeWithValue,
  arrayTypeWithValue,
  imageTypeWithValue,
  CmsPropsTypeWithValue,
} from "./AdminPanelType";
import {
  fetchImageDataFromGit,
  fetchJsonDataFromGit,
  postFileOnGit,
  updateJsonDataOnGit,
} from "./api/git";
import AdminPanel from "./AdminPanel";
import { resolvePathToRealObjectWithArray } from "./utils";

// Type use for connexion with netlifyIdentity
declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

// type Component
export interface AdminPanelProps extends HTMLAttributes<HTMLDivElement> {
  config: CmsPropsType;
  githubToken: string;
}

function AdminPanelContainer({
  config,
  githubToken,
}: AdminPanelProps): JSX.Element {
  // This State never change after initial just add value with good path of the jsonValue
  const [originConfig, setOriginConfig] = useState<CmsPropsTypeWithValue>({
    ...config,
  });

  // state of originConfig but add value property with path of real data
  const [currentConfig, setcurrentConfig] = useState<
    | CmsPropsTypeWithValue
    | sectionTypeWithValue
    | inputTypeWithValue
    | objectTypeWithValue
    | arrayTypeWithValue
    | imageTypeWithValue
  >({ ...originConfig });

  // real data
  const [jsonValue, setjsonValue] = useState({});

  // real data before any change
  const [originJsonValue, setOriginJsonValue] = useState({});
  const [jsonValueSha, setjsonValueSha] = useState({});

  // stock image
  const [imageJson, setImageJson] = useState<{
    [key: string]: {
      [key: string]: { name: string; url: string; sha: string };
    };
  }>({});
  // its the navigation of the panelAdmin
  const [position, setPosition] = useState<{
    positionInConfigFile: Array<number | undefined>;
    lineInArray: Array<number>;
  }>({ positionInConfigFile: [], lineInArray: [] });

  //  know if user is loggin or not
  const [userIsLoggin, setuserLoggin] = useState(false);

  // its url for login or not
  const [isUrlForLogin, setIsUrlForLogin] = useState(
    window.location.pathname.includes(config.urlForLogin)
  );

  // statut of the request when save element on git
  const [statusRequest, setstatusRequest] = useState<
    "null" | "InProgress" | "success" | "fail"
  >("null");

  const openNetlifyAuth = useCallback(() => {
    const netlifyIdentity = window.netlifyIdentity;
    if (netlifyIdentity) {
      netlifyIdentity.setLocale("fr");
      netlifyIdentity.open();
    } else {
      onDisconnected();
    }
  }, [window.netlifyIdentity]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
    script.async = true;
    document.body.appendChild(script);

    const userInfoString = localStorage.getItem("gotrue.user");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : false;

    // if already Connected
    if (!!userInfo) {
      const tokenExpiration = new Date(userInfo.exp * 1000);
      const dateNow = new Date();
      if (tokenExpiration < dateNow) {
        onDisconnected();
        isUrlForLogin && openNetlifyAuth();
      } else {
        setuserLoggin(true);
      }
    } else {
      isUrlForLogin && openNetlifyAuth();
    }
  }, [isUrlForLogin]);

  const onDisconnected = () => {
    localStorage.removeItem("gotrue.user");
    setuserLoggin(false);
  };

  useEffect(() => {
    if (window.netlifyIdentity) {
      const netlifyIdentity = window.netlifyIdentity;
      netlifyIdentity.on("login", () => setuserLoggin(true));
      netlifyIdentity.on("logout", () => onDisconnected);
    }
  }, [window.netlifyIdentity]);

  useEffect(() => {
    if (window.netlifyIdentity && isUrlForLogin && !userIsLoggin) {
      const netlifyIdentity = window.netlifyIdentity;
      netlifyIdentity.setLocale("fr");
      netlifyIdentity.open();
    }
  }, [window.netlifyIdentity, isUrlForLogin, userIsLoggin]);

  // transform the currentConfig with current Position ( if user click on element)
  const currentConfigWithGoodPosition = useMemo(() => {
    if (
      !position.positionInConfigFile.length &&
      position.positionInConfigFile.includes(undefined)
    ) {
      return currentConfig;
    }

    let newValue = position.positionInConfigFile.reduce(
      (prev, currentValue) => {
        if (
          currentValue !== undefined &&
          prev.type !== "input" &&
          prev.type !== "image"
        ) {
          return prev.fields[currentValue];
        } else {
          return prev;
        }
      },
      currentConfig
    );

    return newValue;
  }, [currentConfig, position]);

  const contentHasChange = useMemo(
    () => !(JSON.stringify(originJsonValue) === JSON.stringify(jsonValue)),
    [originJsonValue, jsonValue]
  );

  // recursive function configure and add real data on state JsonValue + add path the real value on input
  const handleStructureData = useCallback(
    async (
      subCategory: sectionType | inputType | objectType | arrayType | imageType,
      lvlNameOfArrayOrObject: Array<string> = [],
      dataFetched?: any | undefined
    ) => {
      try {
        if (subCategory.type === "array") {
          const newLvlNameOfArrayOrObject: Array<string> = [
            ...lvlNameOfArrayOrObject,
            subCategory.id,
            "[]",
          ];
          const newSubCategory = {
            ...subCategory,
            value: newLvlNameOfArrayOrObject.join("."),
          };
          newSubCategory.fields = (await Promise.all(
            newSubCategory.fields.map(async (element) => {
              const result = await handleStructureData(
                element,
                newLvlNameOfArrayOrObject,
                dataFetched
              );
              return result || element;
            })
          )) as inputType[];
          return newSubCategory;
        } else if (subCategory.type === "input") {
          const newLvlNameOfArrayOrObject: Array<string> = [
            ...lvlNameOfArrayOrObject,
            subCategory.id,
          ];

          return {
            ...subCategory,
            value: newLvlNameOfArrayOrObject.join("."),
          };
        } else if (subCategory.type === "image") {
          // if mediaFolder exist and not exist in state

          const newSubCategory = { ...subCategory };

          if (
            newSubCategory.mediaFolder &&
            !imageJson.hasOwnProperty(newSubCategory.mediaFolder)
          ) {
            const data = await fetchImageDataFromGit(
              originConfig.repo,
              githubToken,
              originConfig.branch,
              newSubCategory.mediaFolder
            );
            setImageJson((currentImageJson) => ({
              ...currentImageJson,
              [newSubCategory.mediaFolder]: {
                ...currentImageJson[newSubCategory.mediaFolder],
                ...data.data,
              },
            }));
          }

          // add on mediaFolder origin for for with the imageJson state;
          else if (!newSubCategory.mediaFolder) {
            newSubCategory.mediaFolder = "origin";
          }
          const newLvlNameOfArrayOrObject: Array<string> = [
            ...lvlNameOfArrayOrObject,
            newSubCategory.id,
          ];

          return {
            ...newSubCategory,
            value: newLvlNameOfArrayOrObject.join("."),
          };
        } else if (subCategory.type === "object") {
          const newLvlNameOfArrayOrObject: Array<string> = [
            ...lvlNameOfArrayOrObject,
            subCategory.id,
          ];
          const newSubCategory = { ...subCategory };

          newSubCategory.fields = (await Promise.all(
            newSubCategory.fields.map(async (element) => {
              const result = await handleStructureData(
                element,
                newLvlNameOfArrayOrObject,
                dataFetched
              );
              return result || element;
            })
          )) as unknown as objectType[];
          return newSubCategory;
        } else if (subCategory.type === "section") {
          // fetch json Value on specific branch with the path of the file
          const data = await fetchJsonDataFromGit(
            `${originConfig.repo}/contents${subCategory.file}?ref=${originConfig.branch}`,
            githubToken
          );

          setOriginJsonValue((currentOriginJsonValue) => ({
            ...currentOriginJsonValue,
            [subCategory.title]: data.data,
          }));

          setjsonValue((currentJsonValue) => ({
            ...currentJsonValue,
            [subCategory.title]: data.data,
          }));

          setjsonValueSha((currentJsonValueSha) => ({
            ...currentJsonValueSha,
            [subCategory.title]: data.sha,
          }));

          const newSubCategory = { ...subCategory };
          if (data.succes) {
            newSubCategory.fields = (await Promise.all(
              newSubCategory.fields.map(async (element) => {
                const result = await handleStructureData(
                  element,
                  [...lvlNameOfArrayOrObject, subCategory.title],
                  data.data
                );
                return result || element;
              })
            )) as unknown as any[];
          } else {
            console.log("probleme dans la récupération de donnée");
            return newSubCategory;
          }
          return newSubCategory;
        }
        return subCategory;
      } catch (error) {
        return subCategory;
      }
    },
    [githubToken, originConfig.branch, originConfig.repo]
  );

  // allow to add property "value" with the path of the real data depending on the JsonValue State
  useEffect(() => {
    (async () => {
      // fetch Image if mediaFolder Exist

      if (originConfig.mediaFolder) {
        const data = await fetchImageDataFromGit(
          originConfig.repo,
          githubToken,
          originConfig.branch,
          originConfig.mediaFolder
        );
        setImageJson((currentImageJson) => ({
          ...currentImageJson,
          origin: data.data,
        }));
      }

      const newOriginConfig: sectionType[] = (await Promise.all(
        originConfig.fields.map(async (category) => {
          const result = await handleStructureData(category);
          return result || category;
        })
      )) as sectionType[];
      setOriginConfig({ ...originConfig, fields: newOriginConfig });
      setcurrentConfig({ ...originConfig, fields: newOriginConfig });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when select a element
  function selectAnElement(index: number, newlineInArray?: number) {
    const lineInArray =
      newlineInArray === undefined
        ? position.lineInArray
        : [...position.lineInArray, newlineInArray];
    setPosition({
      positionInConfigFile: [...position.positionInConfigFile, index],
      lineInArray,
    });
  }

  // for come Back to the previous screen
  function onPressBack() {
    const newPosition = { ...position };
    if (currentConfigWithGoodPosition.type === "array") {
      newPosition.lineInArray.pop();
    }
    newPosition.positionInConfigFile.pop();
    setPosition({ ...newPosition });
  }

  // update input on every input
  function onUpdateInput(path: string, value: string, htmlId?: string) {
    setjsonValue(resolvePathToRealObjectWithArray(path, jsonValue, value));
    if (htmlId && document.getElementById(htmlId)) {
      document.getElementById(htmlId)!.innerHTML = value;
    }
  }

  function onReset() {
    setjsonValue(originJsonValue);
    window.location.reload();
  }

  async function onSave() {
    if (contentHasChange) {
      setstatusRequest("InProgress");
      const jsonToSend = (
        Object.keys(jsonValue) as Array<keyof typeof jsonValue>
      )
        .map((keyInJsonValue) => {
          if (
            JSON.stringify(jsonValue[keyInJsonValue]) !==
            JSON.stringify(originJsonValue[keyInJsonValue])
          ) {
            const sectionValue: sectionType | undefined =
              originConfig.fields.find(
                (element) =>
                  element.type === "section" && element.title === keyInJsonValue
              ) as sectionType;

            return {
              data: jsonValue[keyInJsonValue],
              file:
                sectionValue.file ||
                `/src/data/${(keyInJsonValue as string).toLowerCase()}.json`,
              sha: jsonValueSha[keyInJsonValue],
            };
          }
          return undefined;
        })
        .filter((el) => el !== undefined);
      const response = await updateJsonDataOnGit(
        originConfig.repo,
        originConfig.branch,
        jsonToSend,
        githubToken
      );
      if (response.succes) {
        setstatusRequest("success");
      } else {
        setstatusRequest("fail");
      }
      setOriginJsonValue({ ...jsonValue });
    }
  }

  function handleSelectImageFromGallery(
    path: string,
    value: string,
    urlImage: string,
    htmlId?: string
  ) {
    setjsonValue(resolvePathToRealObjectWithArray(path, jsonValue, value));
    if (htmlId && document.getElementById(htmlId)) {
      const componentImage = document.getElementById(htmlId)!;
      componentImage.setAttribute("src", urlImage);
    }
  }

  async function parseFile(file: File): Promise<string> {
    const reader = new FileReader();
    let blob = new Blob([file], { type: file.type });
    reader.readAsDataURL(blob);
    return await new Promise((resolve) => {
      reader.onload = () => {
        let dataurl: string = reader.result as string;
        resolve(dataurl.substr(dataurl.indexOf(",") + 1) as string);
      };
    });
  }

  // upload file from external
  async function handleSendFile(
    file: File,
    mediaFolder: string,
    path: string,
    htmlId?: string
  ) {
    const content = await parseFile(file);
    const newFile = {
      name: file.name,
      content,
      branch: originConfig.branch,
    };

    const data = await postFileOnGit(
      `${originConfig.repo}/contents${
        mediaFolder === "origin" ? originConfig.mediaFolder : mediaFolder
      }/${file.name}`,
      newFile,
      githubToken
    );

    // reset input
    (document.getElementById("fileUpload") as HTMLInputElement).value = "";

    if (!data.succes) {
      return null;
    }

    setImageJson((currentImageJson) => ({
      ...currentImageJson,
      [mediaFolder]: {
        ...currentImageJson[mediaFolder],
        [data.data.name]: data.data,
      },
    }));

    // add value to the JsonValue
    handleSelectImageFromGallery(path, data.data.name, data.data.url, htmlId);
  }

  const handleReoderArr = () => {};
  const handleDeleteElementOnArr = (
    newArr: any[],
    positionInJsonValue: string,
    htmlId?: string
  ) => {
    // if in positionInJsonValue finish with [] soo we retrieve it on path
    if (
      positionInJsonValue[positionInJsonValue.length - 1] === "]" &&
      positionInJsonValue[positionInJsonValue.length - 2] === "["
    ) {
      setjsonValue(
        resolvePathToRealObjectWithArray(
          positionInJsonValue.slice(0, positionInJsonValue.length - 3),
          jsonValue,
          newArr
        )
      );

      if (htmlId && document.getElementById(htmlId)) {
        const componentToDelete = document.getElementById(htmlId)!;
        componentToDelete.remove();
      }
    }
  };

  const handleAddElementOnArray = (
    newArr: any[],
    positionInJsonValue: string,
    index: number
  ) => {
    if (
      positionInJsonValue[positionInJsonValue.length - 1] === "]" &&
      positionInJsonValue[positionInJsonValue.length - 2] === "["
    ) {
      setjsonValue(
        resolvePathToRealObjectWithArray(
          positionInJsonValue.slice(0, positionInJsonValue.length - 3),
          jsonValue,
          newArr
        )
      );
      selectAnElement(index, newArr.length - 1);
    }
  };

  if (!userIsLoggin) {
    return <></>;
  }

  return (
    <AdminPanel
      data={jsonValue}
      images={imageJson}
      currentConfig={currentConfigWithGoodPosition}
      pressOnElement={selectAnElement}
      specificIndexInField={position.lineInArray}
      onPressBack={onPressBack}
      onUpdateInput={onUpdateInput}
      onReset={onReset}
      onSave={onSave}
      onLogout={onDisconnected}
      contentHasChange={contentHasChange}
      onReoderArr={handleReoderArr}
      onDeleteElementOnArr={handleDeleteElementOnArr}
      onAddElementOnArr={handleAddElementOnArray}
      title={config.title}
      onSelectImageFromGallery={handleSelectImageFromGallery}
      onSendFile={handleSendFile}
      statusRequest={statusRequest}
    />
  );
}

export default AdminPanelContainer;
