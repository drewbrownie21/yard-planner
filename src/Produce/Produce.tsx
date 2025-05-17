import Tile from "../components/Tile/Tile";
import findProduce from "../../data/produce";
import styles from "./Produce.module.css"

export function Produce({ zone }: { zone: string }) {
  let produceObject = findProduce(zone);

  return (
    <Tile title="Produce" childrenClassName={styles.column}>
        {produceObject.length > 0
        ? produceObject.map((produce: string, index: number) => (
            <label key={index}>
              <ul>{produce}</ul>
            </label>
          ))
        : ""}
    </Tile>
  );
}
