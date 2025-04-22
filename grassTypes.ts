type Zone = string;
type GrassType = string;

let grassTypesMap: Record<Zone, GrassType[]> = {
  "3b": ["Creeping Red Fescue", "Hard Fescue"],
  "4a": ["Creeping Red Fescue", "Chewings Fescue"],
  "4b": ["Creeping Red Fescue", "Chewings Fescue", "Hard Fescue"],
  "5a": ["Kentucky Bluegrass", "Perennial Ryegrass", "Fine Fescue"],
  "5b": [
    "Kentucky Bluegrass",
    "Perennial Ryegrass",
    "Fine Fescue",
    "Tall Fescue",
  ],
  "6a": ["Tall Fescue", "Kentucky Bluegrass", "Perennial Ryegrass"],
  "6b": ["Tall Fescue", "Kentucky Bluegrass", "Perennial Ryegrass"],
  "7a": ["Tall Fescue", "Zoysia Grass", "Bermudagrass"],
  "7b": ["Tall Fescue", "Zoysia Grass", "Bermudagrass"],
  "8a": ["Zoysia Grass", "Bermudagrass", "St. Augustinegrass"],
  "8b": [
    "Zoysia Grass",
    "Bermudagrass",
    "Centipedegrass",
    "St. Augustinegrass",
  ],
  "9a": [
    "Bermudagrass",
    "St. Augustinegrass",
    "Centipedegrass",
    "Zoysia Grass",
  ],
  "9b": [
    "Bermudagrass",
    "St. Augustinegrass",
    "Centipedegrass",
    "Zoysia Grass",
  ],
  "10a": [
    "St. Augustinegrass",
    "Bermudagrass",
    "Centipedegrass",
    "Zoysia Grass",
  ],
  "10b": [
    "St. Augustinegrass",
    "Bermudagrass",
    "Centipedegrass",
    "Zoysia Grass",
  ],
  "11a": ["Bermudagrass", "Zoysia Grass", "Buffalograss", "St. Augustinegrass"],
  "11b": ["Bermudagrass", "Zoysia Grass", "Buffalograss", "St. Augustinegrass"],
  "12a": ["Bermudagrass", "Zoysia Grass", "Seashore Paspalum"],
};

export default function grabZone(zone: string) {
  for (const grassZone in grassTypesMap) {
    if (zone == grassZone) {
      return grassTypesMap[zone];
    }
  }
  return "No zone found";
}
