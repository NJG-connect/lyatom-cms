import React, {
  useState,
  Fragment,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import styles from "./AdminPanel.module.css";
import CmsPropsType, {
  noneType,
  inputType,
  objectType,
  arrayType,
  imageType,
} from "./AdminPanelType";
import panelIcon from "./icons";
import Input from "./components/Input";
import TitleArray from "./components/TitleArray";
import TitleInfo from "./components/TitleInfo";
import { resolvePathToRealObjectWithArray } from "./utils";

interface Props {
  data: any;
  currentConfig:
    | CmsPropsType
    | noneType
    | inputType
    | objectType
    | arrayType
    | imageType;
  pressOnElement: (index: number, lineInArray?: number) => void;
  specificIndexInField?: number[];
  onPressBack: () => void;
  onUpdateInput: (path: string, value: string, htmlId?: string) => void;
  onSelectImageFromGallery: (
    path: string,
    value: string,
    urlImage: string,
    htmlId?: string
  ) => void;
  onSendFile: (
    file: File,
    mediaFolder: string,
    path: string,
    htmlId: string
  ) => void;
  onReset: () => void;
  onSave: () => void;
  onLogout: () => void;
  contentHasChange: boolean;
  onReoderArr: () => void;
  onAddElementOnArr: (
    newArr: any[],
    positionInJsonValue: string,
    index: number
  ) => void;
  onDeleteElementOnArr: (newArr: any[], positionInJsonValue: string) => void;
  title: string;
  images: {
    [key: string]: {
      [key: string]: {
        name: string;
        url: string;
        sha: string;
      };
    };
  };
}

function AdminPanel({
  data: dataProps,
  currentConfig: currentConfigProps,
  pressOnElement,
  specificIndexInField,
  onPressBack,
  onUpdateInput,
  onReset,
  onSave,
  onLogout,
  contentHasChange = false,
  onReoderArr,
  onDeleteElementOnArr,
  onAddElementOnArr,
  title,
  images,
  onSelectImageFromGallery,
  onSendFile,
}: Props) {
  const [panelIsOpen, setPanelIsOpen] = useState(false);
  const [galleryOfImageIsOpen, setGalleryOfImageIsOpen] = useState({});

  const renderViewWithContent = useCallback(
    (
      configValue:
        | CmsPropsType
        | noneType
        | inputType
        | objectType
        | arrayType
        | imageType,
      indexOfField?: number | undefined,
      nbrIncrementation: number = 0
    ) => {
      if (configValue.type === "firstLvl") {
        return configValue.fields.map((el, index) => (
          <TitleArray
            key={el.title}
            label={el.title}
            onClick={() => {
              pressOnElement(index);
            }}
          />
        ));
      } else if (configValue.type === "none") {
        return configValue.fields.map((el, index) =>
          renderViewWithContent(el, index, nbrIncrementation + 1)
        );
      } else if (configValue.type === "array") {
        // for print a specif value on Array
        if (nbrIncrementation === 0) {
          return configValue.fields.map((el, index) =>
            renderViewWithContent(el, index, nbrIncrementation + 1)
          );
        }
        const arrOfNameValue = `${configValue.value}.${configValue.referenceFieldKey}`;
        return (
          <Fragment key={`${configValue.title}-div`}>
            <div className={styles.headerOfArrayType}>
              <p key={`${configValue.title}-paragraph`}>{configValue.title}</p>
              <img
                onClick={() => {
                  onAddElementOnArr(
                    [
                      ...resolvePathToRealObjectWithArray(
                        configValue.value!,
                        dataProps
                      ),
                      { [configValue.referenceFieldKey]: "" },
                    ],
                    configValue.value!,
                    indexOfField!
                  );
                }}
                src={panelIcon.add}
                className={styles.iconAdd}
                alt="Ajouter"
              />
            </div>
            {resolvePathToRealObjectWithArray(arrOfNameValue, dataProps).map(
              (el: string, line: number) => {
                return (
                  <TitleArray
                    key={`-key${el}`}
                    label={el}
                    onClick={() => {
                      pressOnElement(indexOfField!, line);
                    }}
                    canDelete={configValue.canDelete}
                    onDelete={() => {
                      onDeleteElementOnArr(
                        (
                          resolvePathToRealObjectWithArray(
                            configValue.value!,
                            dataProps
                          ) as any[]
                        ).filter((_el, index) => index !== line),
                        configValue.value!
                      );
                    }}
                    onReoder={() => {
                      console.log("onReoder");
                      onReoderArr();
                    }}
                    canReoder={false}
                  />
                );
              }
            )}
          </Fragment>
        );
      } else if (configValue.type === "input") {
        let path = configValue.value;
        if (
          configValue.value.includes("[]") &&
          specificIndexInField &&
          !!specificIndexInField.length
        ) {
          const newValue = configValue.value.split("[]");
          path =
            newValue.length === 0
              ? configValue.value
              : `${newValue[0]}[${specificIndexInField[0]}]${newValue[1]}`;
        }
        const value = resolvePathToRealObjectWithArray(path, dataProps);

        return (
          <Input
            label={configValue.title}
            value={value}
            onChange={(newValue) =>
              onUpdateInput(path, newValue, configValue.htmlId)
            }
            nameForAutoComplete={configValue.title}
            key={configValue.id}
          />
        );
      } else if (configValue.type === "object") {
        if (nbrIncrementation >= 1) {
          return (
            <TitleInfo
              key={`${configValue.title}-object`}
              label={configValue.title}
              onClick={() => pressOnElement(indexOfField!)}
            />
          );
        }
        return configValue.fields.map((el, index) =>
          renderViewWithContent(el, index, nbrIncrementation + 1)
        );
      } else if (configValue.type === "image") {
        const namesOfLogo = resolvePathToRealObjectWithArray(
          configValue.value!,
          dataProps
        );
        const nameOfLogo =
          namesOfLogo === undefined || typeof namesOfLogo === "string"
            ? namesOfLogo
            : namesOfLogo[
                specificIndexInField[specificIndexInField.length - 1]
              ];

        const imageInfo = images[configValue.mediaFolder!][nameOfLogo];

        return (
          <Fragment key={`${configValue.id}-fragment`}>
            <div
              className={styles.headerOfImageType}
              key={`${configValue.id}-Content`}
            >
              <p key={`${configValue.title}-title`}>{configValue.title}</p>
              <div
                key={`${configValue.id}-HeaderDiv`}
                className={styles.headerDivImg}
              >
                <span
                  className={styles.iconAddSpan}
                  key={`${configValue.id}-spanUploadImg`}
                >
                  <input
                    type="file"
                    className={styles.inputFile}
                    accept="image/*"
                    onChange={(event) =>
                      event.target &&
                      event.target.files &&
                      onSendFile(
                        event.target.files[0],
                        configValue.mediaFolder!,
                        configValue.value!,
                        configValue.htmlId
                      )
                    }
                    id="fileUpload"
                  />
                </span>

                <img
                  onClick={() => {
                    setGalleryOfImageIsOpen({
                      ...galleryOfImageIsOpen,
                      [configValue.title]:
                        !galleryOfImageIsOpen[configValue.title],
                    });
                  }}
                  src={panelIcon.gallery}
                  className={styles.iconAdd}
                  alt="Upload"
                  key={`${configValue.id}-galleryImg`}
                />
              </div>
            </div>
            {galleryOfImageIsOpen.hasOwnProperty(configValue.title) &&
            galleryOfImageIsOpen[configValue.title] ? (
              <div className={styles.galleryContentOfImageType}>
                {Object.keys(images[configValue.mediaFolder]).map(
                  (key, index) => {
                    return (
                      <img
                        placeholder={panelIcon.edit}
                        onClick={() => {
                          setGalleryOfImageIsOpen({
                            ...galleryOfImageIsOpen,
                            [configValue.title]:
                              !galleryOfImageIsOpen[configValue.title],
                          });
                          onSelectImageFromGallery(
                            configValue.value!,
                            images[configValue.mediaFolder][key].name,
                            images[configValue.mediaFolder][key].url,
                            configValue.htmlId
                          );
                        }}
                        src={images[configValue.mediaFolder][key].url}
                        className={`${styles.imageGallery} ${
                          images[configValue.mediaFolder][key].sha ===
                            imageInfo.sha && styles.imageGallerySelected
                        }`}
                        alt={images[configValue.mediaFolder][key].name}
                        key={`${configValue.id}-Img${index}`}
                      />
                    );
                  }
                )}
              </div>
            ) : (
              <div className={styles.contentOfImageType}>
                <img
                  onClick={() => {}}
                  src={imageInfo ? imageInfo.url : undefined}
                  className={styles.imagePreview}
                  alt="change Logo"
                  key={`${configValue.id}-Img`}
                />
              </div>
            )}
          </Fragment>
        );
      }
      return null;
    },
    [currentConfigProps, galleryOfImageIsOpen, dataProps, images]
  );

  function onTogglePanel() {
    setPanelIsOpen(!panelIsOpen);
  }

  const printCurrentTitle = useMemo(() => {
    if (!currentConfigProps || currentConfigProps.type === "firstLvl") {
      return undefined;
    }
    if (["none", "object", "array"].includes(currentConfigProps.type)) {
      return currentConfigProps.title;
    }
    return undefined;
  }, [currentConfigProps]);

  // for the resize
  let isDragging = false;
  let adminPanelElement = document.getElementById("AdminPanelId");
  let target = document.getElementById("AdminPanel-dragbar");

  function clearJSEvents() {
    isDragging = false;
    document.body.removeEventListener("mousemove", resize);
    adminPanelElement?.classList.remove(styles.resizing);
  }

  function resize(e: any) {
    if (e.pageX < 300) {
      return;
    }
    if (adminPanelElement) {
      adminPanelElement.style.setProperty("--card-width", e.pageX + "px");
    }
  }

  if (target) {
    target.onmousedown = function (e) {
      e.preventDefault();
      isDragging = true;
      document.body.addEventListener("mousemove", resize);
      adminPanelElement?.classList.add(styles.resizing);
    };
  }

  document.onmouseup = () => {
    isDragging! && clearJSEvents();
  };
  // end resizing

  return (
    <div
      className={`${styles.card} ${panelIsOpen ? "" : styles.cardIsClose}`}
      id="AdminPanelId"
    >
      <div className={styles.dragbar} id="AdminPanel-dragbar" />
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <div onClick={onLogout} className={styles.divLogout}>
          <img
            src={panelIcon.logout}
            className={styles.iconLogout}
            alt="décconexion"
          />
        </div>
      </div>
      <div className={styles.content}>
        {printCurrentTitle && (
          <div className={styles.currentContent} onClick={onPressBack}>
            <img
              alt="BackIcon"
              src={panelIcon.chevronLeft}
              className={styles.iconCurrentContent}
            />
            <p className={styles.textCurrentContent}>{printCurrentTitle}</p>
          </div>
        )}
        {renderViewWithContent(currentConfigProps)}
      </div>
      <div className={styles.footer}>
        {currentConfigProps.type === "firstLvl" ? (
          <>
            <div
              className={`${styles.buttonReset} ${
                !contentHasChange && styles.buttonDisabled
              }`}
              onClick={() => contentHasChange && onReset()}
            >
              <p>Reset</p>
            </div>
            <div
              className={`${styles.buttonSave} ${
                !contentHasChange && styles.buttonDisabled
              }`}
              onClick={() => contentHasChange && onSave()}
            >
              <p>Sauvegarder</p>
            </div>
          </>
        ) : (
          <p>
            {contentHasChange ? "Contenu modifié" : "Développé par NJG Connect"}
          </p>
        )}
      </div>
      <div className={styles.togglePanel} onClick={onTogglePanel}>
        <img
          alt="edit"
          src={panelIsOpen ? panelIcon.whiteChevronLeft : panelIcon.edit}
          className={styles.iconToggle}
        />
      </div>
    </div>
  );
}

export default AdminPanel;
