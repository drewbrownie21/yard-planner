import styles from "./Header.module.css";
import React from "react";
import { LightModeButton } from "./LightModeButton/LightModeButton";

const MainHeader = React.memo(() => {
  return (
    <header className={styles.header}>
      <h1>Yard Planner!</h1>
      <LightModeButton />
    </header>
  );
});

export function Header() {
  return <MainHeader />;
}
