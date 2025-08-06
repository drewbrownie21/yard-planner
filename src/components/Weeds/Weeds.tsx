import Tile from "../Tile/Tile";
import styles from "./Weeds.module.css";
import { getWeedData, getWeedNames } from "../../../data/weeds";
import { useState } from "react";

export function Weeds() {
  const [selectedWeed, setSelectedWeed] = useState("");
  const weedKeys = getWeedNames();
  let weedData = getWeedData(selectedWeed);

  const handleSelectChange = (e: any) => {
    setSelectedWeed(e.target.value);
  };

  return (
    <Tile title="Weeds" childrenClassName={styles.column}>
      <select onChange={handleSelectChange}>
        <option value={""}>-- Select --</option>
        {weedKeys.map((seedName: string, index: number) => (
          <option value={seedName} key={index}>
            {seedName}
          </option>
        ))}
      </select>
      <section className={styles.text}>
        <p>Chemical Control: {weedData?.chemicalControl}</p>
        <p>Best Control Timing: {weedData?.controlTiming}</p>
        <p>Growth Habit: {weedData?.growthHabit}</p>
        <p>Sunlight Needed: {weedData?.sunlight}</p>
        {weedData?.description && <p>Description: {weedData.description}</p>}
      </section>
    </Tile>
  );
}
