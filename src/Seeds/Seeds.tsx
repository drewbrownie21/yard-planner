import Tile from "../components/Tile/Tile";
import styles from "./Seeds.module.css";
import { getSeedData, getSeedNames } from "../../data/seeds";
import { useState } from "react";

export function Seeds() {
  const [selectedSeed, setSelectedSeed] = useState("");
  const seedKeys = getSeedNames();
  let seedData = getSeedData(selectedSeed);

  const handleSelectChange = (e: any) => {
    setSelectedSeed(e.target.value);
  };

  return (
    <Tile title="Seeds" childrenClassName={styles.column}>
      <select onChange={handleSelectChange}>
        <option value={""}>-- Select --</option>
        {seedKeys.map((seedName: string, index: number) => (
          <option value={seedName} key={index}>
            {seedName}
          </option>
        ))}
      </select>
      <section className={styles.text}>
        <p>Days To Germination: {seedData?.germination}</p>
        <p>Days To Harvest: {seedData?.daysToHarvest}</p>
        <p>Planting Depth: {seedData?.plantingDepth + " (cm)"}</p>
        <p>Optionmal Tempature: {seedData?.optimalTemp}</p>
        <p>Sunlight Needed: {seedData?.sunlight}</p>
      </section>
    </Tile>
  );
}
