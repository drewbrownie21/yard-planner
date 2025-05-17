import Tile from "../components/Tile/Tile";
import grassTypes from "../../data/grassTypes";
import { FormData } from "../App";
import styles from "./Grass.module.css";

type GrassType = {
  updateUserProfile: (field: keyof FormData, value: string) => void;
  userProfile: { zone: string; grassType: string; zipcode: string };
};

export function Grass({ updateUserProfile, userProfile }: GrassType) {
  let grassTypesArray = grassTypes(userProfile.zone);

  return (
    <Tile title={"Grass Recommendations"} childrenClassName={styles.list}>
      {grassTypes(userProfile.zone).length === 0
        ? ""
        : grassTypesArray.map((grassType, index) => (
            <label key={index}>
              <ul>
                <input
                  type="radio"
                  name="grassTypeSelection"
                  value={index}
                  onChange={() => updateUserProfile("grassType", grassType)}
                />
                {grassType}
              </ul>
            </label>
          ))}
    </Tile>
  );
}
