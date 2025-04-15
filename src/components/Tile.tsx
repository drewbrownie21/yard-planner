import "./Tile.css";

interface TileProps {
  title: string;
  // Drew's notes. React.ReactNode is better than any because it is type safe,
  // "ReactNode" is anything React can render whereas "any" is literally anything
  children?: React.ReactNode;
}

function Tile({ title, children }: TileProps) {
  return (
    <section className="tile">
      <header className="tileHeader">{title}</header>
      <div>{children}</div>
    </section>
  );
}

export default Tile;
