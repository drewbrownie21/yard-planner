import { useState } from "react";
import Tile from "../components/Tile/Tile";
import { Button } from "../components/Button/Button";
import styles from "./Hardiness.module.css";
import grabZone from "../../zipcode";
import { FormData } from "../App";

type HardinessType = {
  updateUserProfile: (field: keyof FormData, value: string) => void;
  userProfile: { zone: string, grassType: string, zipcode: string};
};

export function Haridness({ updateUserProfile, userProfile }: HardinessType) {
  const [zipcode, setZipcode] = useState("");
  const [displayZipCode, setDisplayZipCode] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setZipcode("");
    setDisplayZipCode(zipcode);
    updateUserProfile("zipcode", displayZipCode);
    updateUserProfile("zone", grabZone(zipcode));
    console.log(userProfile.zipcode)
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setDisplayZipCode("");
    updateUserProfile("zipcode", "")
    updateUserProfile("zone", "")
  };

  return (
    <section>
      <Tile title="Hardiness Calculator">
        <form className={styles.form}>
          <input
            className={styles.input}
            placeholder="Enter zip code"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            maxLength={5}
            type="text"
          />
          <div className={styles.button}>
            <Button buttonDisplayText={"Submit"} onClick={handleSubmit} />
            <Button buttonDisplayText={"Reset"} onClick={handleReset} />
          </div>
          <section className={styles.hardinessResults}>
            <b>Zipcode: {displayZipCode.length > 0 ? displayZipCode : "N/A"}</b>
            <b>Zone: {displayZipCode.length > 0 ? userProfile.zone : "N/A"}</b>
          </section>
        </form>
      </Tile>
    </section>
  );
}
