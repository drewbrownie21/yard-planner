import styles from "./Tile.module.css";

interface TileProps {
  title: string;
  // Drew's notes. React.ReactNode is better than any because it is type safe,
  // "ReactNode" is anything React can render whereas "any" is literally anything
  children?: React.ReactNode;
  childrenClassName?: string;
}

function Tile({ title, children, childrenClassName }: TileProps) {
  return (
    <section className={styles.body}>
      <header className={styles.header}>{title}</header>
      <div className={childrenClassName}>{children}</div>
    </section>
  );
}

export default Tile;
