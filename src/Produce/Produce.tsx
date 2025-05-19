import Tile from "../components/Tile/Tile";
import findProduce from "../../data/produce";
import styles from "./Produce.module.css";

export function Produce({ zone }: { zone: string }) {
  let produceObject = findProduce(zone);

  return (
    <Tile title="Produce">
      <p>{zone.length > 0 ? "The following produce grows well in " + zone : ""}.</p>
      <section className={styles.column}>
      {produceObject.length > 0
        ? produceObject.map((produce: string, index: number) => (
            <label key={index}>
              <li>{produce}</li>
            </label>
          ))
        : ""}
      </section>
    </Tile>
  );
}
