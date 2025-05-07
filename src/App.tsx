import { Care } from "./Care/Care";
import { Grass } from "./Grass/Grass";
import { Haridness } from "./Hardiness/Hardiness";
import { Header } from "./components/Header/Header";
import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [zone, setZone] = useState("");
  const [grassTypeSelected, setGrassTypeSelected] = useState("");

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Haridness updateZone={setZone} zone={zone} />
        <Grass
          zone={zone}
          setGrassTypeSelected={setGrassTypeSelected}
          grassTypeSelected={grassTypeSelected}
        />
        <Care grassType={zone.length > 0 ? grassTypeSelected : ""} />
      </main>
    </>
  );
}

export default App;
