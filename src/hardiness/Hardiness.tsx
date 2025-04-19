import { useState } from "react";
import Tile from "../components/Tile/Tile";
import { Button } from "../components/Button/Button";
import "./Hardiness.css";
import "../components/Button/Button.css";
import  grabZone  from "../../zipcode";

export function Haridness() {
  const [zipcode, setZipcode] = useState("");
  const [displayZipCode, setDisplayZipCode] = useState("");
  const [zone, setZone] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setZipcode("");
    setDisplayZipCode(zipcode);
    setZone(grabZone(zipcode));
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setDisplayZipCode("")
    setZipcode("")
  }

  return (
    <section className="hardiness-section">
      <Tile title="Hardiness Calculator">
        <form className="flex-container">
          <input
            className="input"
            placeholder="Enter zip code"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            maxLength={5}
          />
          <div className="button-flex-container">
          <Button buttonDisplayText={"Submit"} onClick={handleSubmit}/>
          <Button buttonDisplayText={"Reset"} onClick={handleReset}/>
          </div>
          <section className="hardiness-results">
            <b>Zipcode: {displayZipCode.length > 0 ? displayZipCode : "N/A"}</b>
            <b>Zone: {displayZipCode.length > 0 ? zone : "N/A"}</b>
          </section>
        </form>
      </Tile>
    </section>
  );
}
