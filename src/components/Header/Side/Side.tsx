import { Button } from "../../Button/Button";
import styles from "../../../components/Button/Button.module.css";

export type SideTypes = {
  handleReset?: () => void;
};

export function Side({ handleReset }: SideTypes) {
  return (
    <aside>
      <Button
        buttonDisplayText={"Reset"}
        onClick={handleReset}
        cssClassName={styles.optionsButtons}
      />
      <Button
        buttonDisplayText={"Reset"}
        onClick={handleReset}
        cssClassName={styles.optionsButtons}
      />
    </aside>
  );
}
