import styles from "./Header.module.css";
import LightSwitch from "../LightSwitch/LightSwitch";
import { Side } from "./Side/Side";
import type { SideTypes } from "./Side/Side";

export function Header({ handleReset, handleEditMode }: SideTypes) {
  return (
    <header className={styles.header}>
      <h1 className={styles.text}>Yard Planner!</h1>
      <div className={styles.side}>
        <figure>
          <LightSwitch />
        </figure>
        <Side handleReset={handleReset} handleEditMode={handleEditMode} />
      </div>
    </header>
  );
}
