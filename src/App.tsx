import { Care } from "./components/Care/Care";
import { Grass } from "./components/Grass/Grass";
import { Haridness } from "./components/Hardiness/Hardiness";
import { Header } from "./components/Header/Header";
import styles from "./App.module.css";
import { useState } from "react";
import { Produce } from "./components/Produce/Produce";
import { Seeds } from "./components/Seeds/Seeds";
import { DarkModeProvider } from "./context/ThemeContext";

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
        <Header />
        <section className={styles.main}>
          <Haridness
            updateUserProfile={updateUserProfile}
            userProfile={userProfile}
          />
          <Grass
            updateUserProfile={updateUserProfile}
            userProfile={userProfile}
          />
          <Care
            grassType={userProfile.zone.length > 0 ? userProfile.grassType : ""}
          />
          <Produce zone={userProfile.zone} />
          <Seeds />
        </section>
      </DarkModeProvider>
    </main>
  );
}

export default App;
