const cp1252ByCodePoint = new Map<number, number>();

const cp1252Specials: Array<[number, number]> = [
  [0x20ac, 0x80],
  [0x201a, 0x82],
  [0x0192, 0x83],
  [0x201e, 0x84],
  [0x2026, 0x85],
  [0x2020, 0x86],
  [0x2021, 0x87],
  [0x02c6, 0x88],
  [0x2030, 0x89],
  [0x0160, 0x8a],
  [0x2039, 0x8b],
  [0x0152, 0x8c],
  [0x017d, 0x8e],
  [0x2018, 0x91],
  [0x2019, 0x92],
  [0x201c, 0x93],
  [0x201d, 0x94],
  [0x2022, 0x95],
  [0x2013, 0x96],
  [0x2014, 0x97],
  [0x02dc, 0x98],
  [0x2122, 0x99],
  [0x0161, 0x9a],
  [0x203a, 0x9b],
  [0x0153, 0x9c],
  [0x017e, 0x9e],
  [0x0178, 0x9f],
];

for (let byte = 0; byte <= 0xff; byte += 1) {
  cp1252ByCodePoint.set(byte, byte);
}

cp1252Specials.forEach(([codePoint, byte]) => cp1252ByCodePoint.set(codePoint, byte));

function looksMojibaked(value: string) {
  return /[\u00c2\u00c3\u00f0\u0178]|\u00e2[\u0080-\u00bf\u20ac\u2122]/.test(value);
}

function repairMojibakeString(value: string) {
  if (!looksMojibaked(value)) return value;

  let current = value;
  for (let pass = 0; pass < 3; pass += 1) {
    const bytes: number[] = [];

    for (const char of current) {
      const byte = cp1252ByCodePoint.get(char.codePointAt(0) ?? 0);
      if (byte === undefined) return current;
      bytes.push(byte);
    }

    const repaired = new TextDecoder().decode(new Uint8Array(bytes));
    if (!repaired || repaired.includes("\uFFFD") || repaired === current) return current;
    current = repaired;
  }

  return current;
}

export function repairStoredText<T>(value: T): T {
  if (typeof value === "string") return repairMojibakeString(value) as T;
  if (!value || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((item) => repairStoredText(item)) as T;

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, repairStoredText(entry)]),
  ) as T;
}
