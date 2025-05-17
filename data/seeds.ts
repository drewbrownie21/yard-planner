type seedDataValues = {
  germination: number;
  daysToHarvest?: number;
  plantingDepth?: number;
  optimalTemp?: number;
  sunlight?: "full" | "partial" | "shade";
};

const seedData: Record<string, seedDataValues> = {
  Watermelon: {
    germination: 7,
    daysToHarvest: 80,
    plantingDepth: 2,
    optimalTemp: 25,
    sunlight: "full",
  },
  Tomato: {
    germination: 6,
    daysToHarvest: 60,
    plantingDepth: 1,
    optimalTemp: 21,
    sunlight: "full",
  },
  Carrot: {
    germination: 14,
    daysToHarvest: 70,
    plantingDepth: 0.5,
    optimalTemp: 18,
    sunlight: "full",
  },
  Lettuce: {
    germination: 10,
    daysToHarvest: 45,
    plantingDepth: 0.3,
    optimalTemp: 20,
    sunlight: "partial",
  },
  Pumpkin: {
    germination: 8,
    daysToHarvest: 90,
    plantingDepth: 3,
    optimalTemp: 24,
    sunlight: "full",
  },
  Spinach: {
    germination: 7,
    daysToHarvest: 40,
    plantingDepth: 1,
    optimalTemp: 15,
    sunlight: "partial",
  },
  Cucumber: {
    germination: 7,
    daysToHarvest: 55,
    plantingDepth: 2,
    optimalTemp: 24,
    sunlight: "full",
  },
  Peas: {
    germination: 12,
    daysToHarvest: 60,
    plantingDepth: 3,
    optimalTemp: 18,
    sunlight: "full",
  },
  Radish: {
    germination: 5,
    daysToHarvest: 30,
    plantingDepth: 1,
    optimalTemp: 16,
    sunlight: "full",
  },
  Beans: {
    germination: 10,
    daysToHarvest: 50,
    plantingDepth: 3,
    optimalTemp: 21,
    sunlight: "full",
  },
  Broccoli: {
    germination: 7,
    daysToHarvest: 85,
    plantingDepth: 0.5,
    optimalTemp: 18,
    sunlight: "full",
  },
  Cauliflower: {
    germination: 10,
    daysToHarvest: 80,
    plantingDepth: 0.5,
    optimalTemp: 18,
    sunlight: "full",
  },
  Corn: {
    germination: 7,
    daysToHarvest: 90,
    plantingDepth: 4,
    optimalTemp: 21,
    sunlight: "full",
  },
  Eggplant: {
    germination: 7,
    daysToHarvest: 80,
    plantingDepth: 1,
    optimalTemp: 24,
    sunlight: "full",
  },
  Kale: {
    germination: 5,
    daysToHarvest: 55,
    plantingDepth: 0.5,
    optimalTemp: 18,
    sunlight: "full",
  },
  Onion: {
    germination: 10,
    daysToHarvest: 120,
    plantingDepth: 1,
    optimalTemp: 20,
    sunlight: "full",
  },
  Pepper: {
    germination: 7,
    daysToHarvest: 75,
    plantingDepth: 0.5,
    optimalTemp: 24,
    sunlight: "full",
  },
  "Sweet Potato": {
    germination: 14,
    daysToHarvest: 120,
    plantingDepth: 3,
    optimalTemp: 25,
    sunlight: "full",
  },
  Zucchini: {
    germination: 7,
    daysToHarvest: 50,
    plantingDepth: 2,
    optimalTemp: 22,
    sunlight: "full",
  },
  Beet: {
    germination: 10,
    daysToHarvest: 60,
    plantingDepth: 1,
    optimalTemp: 18,
    sunlight: "partial",
  },
};

export function getSeedData(seedType: string) {
  for (const seed in seedData) {
    if (seedType === seed) {
      return seedData[seed];
    }
  }
  return null;
}

export function getSeedNames() {
  let seedNames: string[] = [];
  for (const seedName in seedData) {
    seedNames.push(seedName);
  }
  return seedNames;
}
