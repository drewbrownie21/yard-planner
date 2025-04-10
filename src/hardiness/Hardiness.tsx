import { useState } from "react";
import Tile from "../components/Tile";
import { Button } from "../components/Button";

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
    <section>
      <Tile title="Hardiness Calculator">
        <form onSubmit={handleClick}>
          <input
            placeholder="Enter zip code"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required={true}
          />
          <Button buttonDisplayText={"Submit"} /><br />
          <span>{displayZipCode}</span>
        </form>
      </Tile>
    </section>
  );
}
