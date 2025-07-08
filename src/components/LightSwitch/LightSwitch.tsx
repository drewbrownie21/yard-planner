import { useContext } from "react";
import { DarkModeContext } from "../../context/ThemeContext";
import sunIcon from "../../images/sun.png";
import moonIcon from "../../images/moon.png";
import styles from "./LightSwitch.module.css"

function LightSwitch() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const handleClick = () => {
    toggleDarkMode();
  };

  return (
    <div className="lightSwitch">
      <img
        src={darkMode ? sunIcon : moonIcon}
        alt="Lightswitch on"
        onClick={handleClick}
        className={styles.clickableIcon}
      />
    </div>
  );
}

export default LightSwitch;
