import { Care } from "./Care/Care";
import { Grass } from "./Grass/Grass";
import { Haridness } from "./Hardiness/Hardiness";
import { Header } from "./components/Header/Header";
import styles from "./App.module.css";
import { useContext, useEffect, useState } from "react";
import { Produce } from "./Produce/Produce";
import { Seeds } from "./Seeds/Seeds";
import { LightModeContext } from "./context/ThemeContext";

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

  const lightMode = useContext(LightModeContext);

  useEffect(() => {
    document.body.classList.toggle("light", lightMode);
    document.body.classList.toggle("dark", !lightMode);
  }, [lightMode]);


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
    </main>
  );
}

export default App;
