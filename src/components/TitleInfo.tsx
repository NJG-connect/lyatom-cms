import React from "react";
import panelIcon from "../icons";
import styles from "./TitleInfo.module.css";

interface Props {
  label: string;
  onClick: () => void;
}

function TitleArray({ label, onClick }: Props) {
  return (
    <div className={styles.content} onClick={onClick}>
      <div className={styles.middle}>
        <p className={styles.label}>{label}</p>
      </div>
      <div className={styles.last}>
        <img alt="trash" src={panelIcon.chevronRight} className={styles.icon} />
      </div>
    </div>
  );
}

export default TitleArray;
