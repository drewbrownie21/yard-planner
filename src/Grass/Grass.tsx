import Tile from "../components/Tile/Tile";
import grassTypes from "../../grassTypes";
import { useState } from "react";

export function Grass(zone: { zone: string }) {
  let grassTypesArray = grassTypes(zone.zone);
  const [grassTypeSelected, setGrassTypeSelected] = useState("");
  return (
    <Tile title={"Grass Recommendations"}>
      {grassTypes(zone.zone).length === 0
        ? "Please Enter Zipcode"
        : grassTypesArray.map((grassType, index) => (
            <label key={index}>
              <ul>
                <input type="radio" name="grassTypeSelection" value={index} onChange={() => setGrassTypeSelected(grassType)}/>
                {grassType}
              </ul>
            </label>
          ))}
          {grassTypeSelected}
    </Tile>
  );
}
