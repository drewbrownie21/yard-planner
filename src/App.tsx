import { Grass } from "./Grass/Grass";
import { Haridness } from "./Hardiness/Hardiness";
import { Header } from "./components/Header/Header";
import "./App.css";
import { useState } from "react";

function App() {
  const [zone, setZone] = useState("");

  return (
    <main>
      <Header />
      <Haridness setZone={setZone} zone={zone} />
      <Grass zone={zone} />
    </main>
  );
}

export default App;
