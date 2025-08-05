import { Button } from "../../Button/Button";
import styles from "../../../components/Button/Button.module.css";

export type SideTypes = {
  handleReset?: () => void;
  handleEditMode: () => void;
};

export function Side({ handleReset, handleEditMode }: SideTypes) {
  return (
    <aside>
      <Button
        buttonDisplayText={"Reset"}
        onClick={handleReset}
        cssClassName={styles.optionsButtons}
      />
      <label>
          Edit Mode: 
          <input 
            type="checkbox" 
            name="editModeCheckBox" 
            onChange={handleEditMode}
            />
      </label>    </aside>
  );
}
