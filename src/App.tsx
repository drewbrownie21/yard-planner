import { Care } from "./Care/Care";
import { Grass } from "./Grass/Grass";
import { Haridness } from "./Hardiness/Hardiness";
import { Header } from "./components/Header/Header";
import styles from "./App.module.css";
import { useState } from "react";

function App() {

  const [userProfile, setUserProfile] = useState({
    "zone" : "",
    "grassType" : "",
    "zipcode" : ""
  });

  // keyof typeof -> keyof telling us what object is related to and the typeof is infered because we define them as empty strings above
  const updateUserProfile = (field: keyof typeof userProfile, value: string) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };


  return (
    <>
      <Header />
      <main className={styles.main}>
        <Haridness updateUserProfile={updateUserProfile} userProfile={userProfile}/>
        {/* <Grass
          zone={zone}
          setGrassTypeSelected={setGrassTypeSelected}
          grassTypeSelected={grassTypeSelected}
        />
        <Care grassType={zone.length > 0 ? grassTypeSelected : ""} /> */}
      </main>
    </>
  );
}

export default App;
