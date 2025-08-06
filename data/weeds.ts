type WeedDataValues = {
  chemicalControl: string;
  controlTiming: string; // e.g. "Spring", "Fall"
  description?: string;
  growthHabit?: "annual" | "perennial" | "biennial";
  sunlight?: "full" | "partial" | "shade";
};

const weedData: Record<string, WeedDataValues> = {
  Crabgrass: {
    chemicalControl: "Pre-emergent herbicide (e.g. Pendimethalin)",
    controlTiming: "Early Spring before germination",
    description:
      "A fast-growing summer annual grass that crowds out lawn grasses.",
    growthHabit: "annual",
    sunlight: "full",
  },
  Dandelion: {
    chemicalControl: "Post-emergent broadleaf herbicide (e.g. 2,4-D)",
    controlTiming: "Fall or early Spring when actively growing",
    description: "A deep-rooted perennial broadleaf weed with yellow flowers.",
    growthHabit: "perennial",
    sunlight: "full",
  },
  Clover: {
    chemicalControl: "Selective broadleaf herbicide (e.g. Triclopyr)",
    controlTiming: "Spring or Fall during active growth",
    description: "Low-growing perennial broadleaf often found in lawns.",
    growthHabit: "perennial",
    sunlight: "full",
  },
  Nutsedge: {
    chemicalControl: "Herbicide containing halosulfuron",
    controlTiming: "Late Spring to early Summer",
    description: "Grass-like perennial that thrives in wet soils.",
    growthHabit: "perennial",
    sunlight: "full",
  },
  Thistle: {
    chemicalControl: "Selective broadleaf herbicide (e.g. MCPA)",
    controlTiming: "Fall or Spring",
    description: "Spiny perennial weed with purple flowers.",
    growthHabit: "perennial",
    sunlight: "full",
  },
  Chickweed: {
    chemicalControl: "Pre-emergent or post-emergent herbicides",
    controlTiming: "Early Spring",
    description: "Low-growing annual or winter annual weed.",
    growthHabit: "annual",
    sunlight: "partial",
  },
  GroundIvy: {
    chemicalControl: "Broadleaf herbicide (e.g. Dicamba mix)",
    controlTiming: "Fall or early Spring",
    description: "Creeping perennial with round leaves.",
    growthHabit: "perennial",
    sunlight: "shade",
  },
  Bindweed: {
    chemicalControl: "Glyphosate applications",
    controlTiming: "Summer during active growth",
    description: "Vining perennial weed that strangles plants.",
    growthHabit: "perennial",
    sunlight: "full",
  },
  Spurge: {
    chemicalControl:
      "Pre-emergent herbicide or post-emergent glyphosate spot treatments",
    controlTiming: "Spring",
    description: "Low-growing summer annual with milky sap.",
    growthHabit: "annual",
    sunlight: "full",
  },
  Purslane: {
    chemicalControl: "Post-emergent herbicides or hand removal",
    controlTiming: "Summer",
    description: "Succulent summer annual with reddish stems.",
    growthHabit: "annual",
    sunlight: "full",
  },
};

export function getWeedData(weedName: string) {
  for (const weed in weedData) {
    if (weedName === weed) {
      return weedData[weed];
    }
  }
  return null;
}

export function getWeedNames() {
  return Object.keys(weedData);
}
