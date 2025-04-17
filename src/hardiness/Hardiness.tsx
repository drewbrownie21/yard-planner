import { useState } from "react";
import Tile from "../components/Tile/Tile";
import { Button } from "../components/Button/Button";
import "./Hardiness.css";
import "../components/Button/Button.css";

export function Haridness() {
  const [zipcode, setZipcode] = useState("");
  const [displayZipCode, setDisplayZipCode] = useState("");

  //   Use this to prevent the page from loading and reset the search value
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setZipcode("");
    setDisplayZipCode(zipcode);
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setDisplayZipCode("")
    setZipcode("")
  }

  return (
    <section className="hardiness-section">
      <Tile title="Hardiness Calculator">
        <form onSubmit={handleSubmit} className="flex-container">
          <input
            className="input"
            placeholder="Enter zip code"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          <div className="button-flex-container">
          <Button buttonDisplayText={"Submit"} />
          <Button buttonDisplayText={"Reset"} onClick={() => handleReset}/>
          </div>
          <b>Zipcode: {displayZipCode.length > 0 ? displayZipCode : "N/A"}</b>
          <b>Zone: {displayZipCode.length > 0 ? "7B" : "N/A"}</b>
        </form>
      </Tile>
    </section>
  );
}
