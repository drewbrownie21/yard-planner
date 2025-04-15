import { useState } from "react";
import Tile from "../components/Tile";
import { Button } from "../components/Button";
import "./Hardiness.css";

export function Haridness() {
  const [zipcode, setZipcode] = useState("");
  const [displayZipCode, setDisplayZipCode] = useState("");

  //   Use this to prevent the page from loading and reset the search value
  const handleClick = (e: any) => {
    e.preventDefault();
    setZipcode("");
    setDisplayZipCode(zipcode);
  };

  return (
    <section className="hardiness-section">
      <Tile title="Hardiness Calculator">
        <form onSubmit={handleClick} className="flex-container">
          <input
            className="input"
            placeholder="Enter zip code"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required={true}
          />
          <Button buttonDisplayText={"Submit"} />
          <b>Zipcode: {displayZipCode.length > 0 ? displayZipCode : "N/A"}</b>
          <b>Zone: {displayZipCode.length > 0 ? "7B" : "N/A"}</b>
        </form>
      </Tile>
    </section>
  );
}
