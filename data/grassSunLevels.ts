const grassSunLevelsObject: Record<string, string> = {
  "Creeping Red Fescue": "Partial shade to full sun",
  "Hard Fescue": "Shade to partial sun",
  "Chewings Fescue": "Shade to partial sun",
  "Kentucky Bluegrass": "Full sun to partial shade",
  "Perennial Ryegrass": "Full sun to light shade",
  "Fine Fescue": "Shade to partial sun",
  "Tall Fescue": "Full sun to partial shade",
  "Zoysia Grass": "Full sun",
  Bermudagrass: "Full sun",
  "St. Augustinegrass": "Full sun to partial shade",
  Centipedegrass: "Full sun to partial shade",
  Buffalograss: "Full sun",
  "Seashore Paspalum": "Full sun to partial shade",
};

export function mapGrassSunLevels(grassType: string) {
  for (const grassKey in grassSunLevelsObject) {
    if (grassKey == grassType) {
      return grassSunLevelsObject[grassKey];
    }
  }
  return `Invalid grass type: ${grassType}`;
}
