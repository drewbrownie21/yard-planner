import "../App.css";

interface TileProps {
  title: string;
}

function Tile({ title }: TileProps) {
  return (
    <section className="tile">
      <header className="tileHeader">{title}</header>
      <form>
        <input placeholder="Enter Zipcode" />
        <button>Submit</button>
      </form>
    </section>
  );
}

export default Tile;
