import { Grass } from "./Grass/Grass";
import { Haridness } from "./Hardiness/Hardiness";
import { Header } from "./components/Header/Header";
import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [zone, setZone] = useState("");

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Haridness setZone={setZone} zone={zone} />
        <Grass zone={zone} />
      </main>
    </>
  );
}

export default App;
