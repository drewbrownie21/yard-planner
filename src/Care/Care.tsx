import Tile from "../components/Tile/Tile";

export function Care({ grassType }: { grassType: string }) {
  return (
    <Tile title="Grass Care">
      {grassType.length > 0 ? grassType : "Select a grass type!"}
    </Tile>
  );
}
