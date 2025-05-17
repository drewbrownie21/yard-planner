import Tile from "../components/Tile/Tile";
import { mapGrassSunLevels } from "../../data/grassSunLevels";
import styles from "./Care.module.css";

export function Care({ grassType }: { grassType: string }) {
  const month = new Date().getMonth();

  const lawnCare: Record<number, string> = {
    0: "Sit by the window and watch snow melt...",
    1: "Plan your lawn care goals and order seeds if needed.",
    2: "Sharpen mower blades and prep tools for spring.",
    3: "Clean up debris and start dethatching if the ground is dry.",
    4: "Apply pre-emergent weed control and fertilize. Begin mowing.",
    5: "Mow regularly and spot-treat weeds.",
    6: "Water deeply and infrequently; watch for pests.",
    7: "Maintain mowing and watering; treat for grubs if needed.",
    8: "Aerate if your soil is compacted; start planning for overseeding.",
    9: "Overseed, fertilize, and keep soil moist for new grass.",
    10: "Keep leaves off lawn and mow until the first frost.",
    11: "Winterize lawn mower and tools; apply winter fertilizer if needed.",
  };

  return (
    <Tile title="Grass Care" childrenClassName={styles.list}>
      <p>{grassType.length > 0 ? grassType : ""}</p>
      <p>{grassType.length > 0 ? mapGrassSunLevels(grassType) : ""}</p>
      <p>{grassType.length > 0 ? lawnCare[month] : ""}</p>
    </Tile>
  );
}
