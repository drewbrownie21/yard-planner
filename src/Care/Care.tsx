import Tile from "../components/Tile/Tile";

type CareType = {
  userProfile: { zone: string, grassType: string, zipcode: string};
};

export function Care({ userProfile }: CareType) {
  return (
    <Tile title="Grass Care">
      {userProfile.grassType.length > 0 ? userProfile.grassType : "Select a grass type!"}
    </Tile>
  );
}
