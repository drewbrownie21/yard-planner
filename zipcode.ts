let zipCodesZoneMap: any = {
  "3b": ["00001", "05000"],
  "4a": ["05001", "10000"],
  "5a": ["10001", "15000"],
  "5b": ["15001", "20000"],
  "6a": ["20001", "25000"],
  "6b": ["25001", "30000"],
  "7a": ["30001", "35000"],
  "7b": ["35001", "40000"],
  "8a": ["40001", "45000"],
  "8b": ["45001", "50000"],
  "9a": ["50001", "55000"],
  "9b": ["55001", "60000"],
  "10a": ["60001", "65000"],
  "10b": ["65001", "70000"],
  "11a": ["70001", "75000"],
  "11b": ["75001", "80000"],
  "12a": ["80001", "85000"],
  "4b": ["85001", "99999"],
};

export default function grabZone(zipCode: string) {
  for (const zone in zipCodesZoneMap) {
    const [startZip, endZip] = zipCodesZoneMap[zone];
    const zip = Number(zipCode);
    const start = Number(startZip);
    const end = Number(endZip);

    if (zip >= start && zip <= end) {
      return zone;
    }
  }
  return "No zone found";
}
