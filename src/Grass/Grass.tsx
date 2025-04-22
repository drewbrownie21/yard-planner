import Tile from "../components/Tile/Tile";
import grassTypes from "../../grassTypes";

export function Grass(zone: { zone: string }) {
  console.log(grassTypes(zone.zone));
  return (
    <section className="grass">
      <Tile title={"Grass Recommendations"}></Tile>
    </section>
  );
}
