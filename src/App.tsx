import { Care } from "./components/Care/Care";
import { Grass } from "./components/Grass/Grass";
import { Haridness } from "./components/Hardiness/Hardiness";
import { Header } from "./components/Header/Header";
import styles from "./App.module.css";
import { useState } from "react";
import { Produce } from "./components/Produce/Produce";
import { Seeds } from "./components/Seeds/Seeds";
import { DarkModeProvider } from "./context/ThemeContext";
import { Drag } from "./components/Drag/Drag";
import { Weeds } from "./components/Weeds/Weeds";

export type FormData = {
  zone: string;
  grassType: string;
  zipcode: string;
};

function App() {
  const [userProfile, setUserProfile] = useState({
    zone: "",
    grassType: "",
    zipcode: "",
  });

  const [reset, setReset] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const handleReset = () => {
    setReset(!reset);
    console.log("RESET");
  };

  const handleEditMode = (isEditing: boolean) => {
    setEditMode(isEditing);
  };

  // keyof typeof -> keyof telling us what object is related to and the typeof is infered because we define them as empty strings above
  const updateUserProfile = (
    field: keyof typeof userProfile,
    value: string,
  ) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <main>
      <DarkModeProvider>
        <Header handleReset={handleReset} handleEditMode={handleEditMode} />
        <section className={styles.main}>
          <Drag reset={reset} editMode={editMode}>
            <Haridness
              updateUserProfile={updateUserProfile}
              userProfile={userProfile}
            />
            <Grass
              updateUserProfile={updateUserProfile}
              userProfile={userProfile}
            />
            <Care
              grassType={
                userProfile.zone.length > 0 ? userProfile.grassType : ""
              }
            />
            <Produce zone={userProfile.zone} />
            <Seeds />
            <Weeds />
          </Drag>
        </section>
      </DarkModeProvider>
    </main>
  );
}

export default App;
