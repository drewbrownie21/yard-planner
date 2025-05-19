import styles from "./Header.module.css";
import React from "react";

const MainHeader = React.memo(() => {
  console.log("Header Renders Once...");
  return (
    <header className={styles.header}>
      <h1>Yard Planner!</h1>
    </header>
  );
});

export function Header() {
  return <MainHeader />;
}
