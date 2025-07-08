import { useContext } from "react";
import { DarkModeContext } from "./ThemeContext";
import styles from "./Container.module.css";
import LightSwitch from "../components/LightSwitch/LightSwitch";

function Container() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? styles.containerLight : styles.containerDark}>
      <LightSwitch />
    </div>
  );
}

export default Container;
