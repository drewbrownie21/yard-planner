import Tile from "../components/Tile/Tile";

export function Grass(zone: { zone: string }) {
  return (
    <section className="grass">
      <Tile title={"Grass Recommendations"}>Grass:</Tile>
    </section>
  );
}
