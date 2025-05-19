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
        {/* Learned that using { you have to explicity use return or it thinks it is void but ( implicitely returns */}
        {seedKeys.map((seedName: string, index: number) => (
          <option value={seedName} key={index}>
            {seedName}
          </option>
        ))}
      </select>
      <section className={styles.text}>
        <p>Days To Germination: {seedData ? seedData.germination : ""}</p>
        <p>Days To Harvest: {seedData ? seedData.daysToHarvest : ""}</p>
        <p>
          Planting Depth: {seedData ? seedData.plantingDepth + " (cm)" : ""}
        </p>
        <p>Optionmal Tempature: {seedData ? seedData.optimalTemp : ""}</p>
        <p>Sunlight Needed: {seedData ? seedData.sunlight : ""}</p>
      </section>
    </Tile>
  );
}
