import Tile from "../components/Tile/Tile";
import grassTypes from "../../grassTypes";

export function Grass(zone: { zone: string }) {
  let grassTypesArray = grassTypes(zone.zone);
  return (
      <Tile title={"Grass Recommendations"}>
        {grassTypes(zone.zone).length === 0
          ? "Please Enter Zipcode"
          : grassTypesArray.map((grassType, index) => (
              <ul key={index}>• {grassType}</ul>
            ))}
      </Tile>
  );
}
