import Tile from "../components/Tile/Tile";
import grassTypes from "../../grassTypes";

type grassType = {
  zone: string;
  setGrassTypeSelected: (value: string) => void;
  grassTypeSelected: string;
};

export function Grass({
  zone,
  setGrassTypeSelected,
}: grassType) {
  let grassTypesArray = grassTypes(zone);

  return (
    <Tile title={"Grass Recommendations"}>
      {grassTypes(zone).length === 0
        ? "Please Enter Zipcode"
        : grassTypesArray.map((grassType, index) => (
            <label key={index}>
              <ul>
                <input
                  type="radio"
                  name="grassTypeSelection"
                  value={index}
                  onChange={() => setGrassTypeSelected(grassType)}
                />
                {grassType}
              </ul>
            </label>
          ))}
    </Tile>
  );
}
