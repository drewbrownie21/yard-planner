import { Button } from "../../Button/Button";
import styles from "../../../components/Button/Button.module.css";
import sideStyles from "./Side.module.css";
import { useEffect, useState } from "react";

export type SideTypes = {
  handleReset?: () => void;
  handleEditMode: (isEditing: boolean) => void;
};

export function Side({ handleReset, handleEditMode }: SideTypes) {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    handleEditMode(editMode);
  }, [editMode, handleEditMode]);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <aside className={sideStyles.sideColumn}>
      <Button
        buttonDisplayText={"Reset"}
        onClick={handleReset}
        cssClassName={styles.optionsButtons}
      />
      <Button
        buttonDisplayText={editMode ? "Save" : "Edit"}
        onClick={toggleEditMode}
        cssClassName={styles.optionsButtons}
      />
    </aside>
  );
}
