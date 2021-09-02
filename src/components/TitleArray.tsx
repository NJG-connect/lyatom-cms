import React from "react";
import panelIcon from "../icons";
import styles from "./TitleArray.module.css";

interface Props {
  label: string;
  onClick: () => void;
  canDelete?: boolean;
  canReoder?: boolean;
  onDelete?: () => void;
  onReoder?: () => void;
}

function TitleArray({
  label,
  onClick,
  canDelete,
  canReoder,
  onDelete,
  onReoder,
}: Props) {
  return (
    <div className={styles.content}>
      {canReoder && (
        <div className={styles.first} onClick={onReoder}>
          <img alt="sixDots" src={panelIcon.sixDots} className={styles.icon} />
        </div>
      )}
      <div className={styles.middle} onClick={onClick}>
        <p className={styles.label}>{label}</p>
      </div>
      {canDelete && (
        <div className={styles.last} onClick={onDelete}>
          <img alt="trash" src={panelIcon.trash} className={styles.icon} />
        </div>
      )}
    </div>
  );
}

export default TitleArray;
