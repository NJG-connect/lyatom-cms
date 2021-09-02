import React from "react";
import styles from "./Input.module.css";

interface Props {
  onChange: (value: string) => void;
  label: string;
  value?: string;
  nameForAutoComplete?: string;
}

function Input({ onChange, label, value = "", nameForAutoComplete }: Props) {
  return (
    <div className={styles.content}>
      <label htmlFor={nameForAutoComplete} className={styles.label}>
        {label}
      </label>
      <input
        type="text"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
          onChange(ev.target.value)
        }
        value={value}
        name={nameForAutoComplete}
        className={styles.input}
      />
    </div>
  );
}

export default Input;
