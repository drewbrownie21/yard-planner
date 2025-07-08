import styles from "./Header.module.css";
import React from "react";
import LightSwitch from "../LightSwitch/LightSwitch";

const MainHeader = React.memo(() => {
  return (
    <header className={styles.header}>
      <h1>Yard Planner!</h1>
      <LightSwitch />
    </header>
  );
});

export function Header() {
  return <MainHeader />;
}
