
interface ISize {
  size: number;
  name: string;
}

export const sizes: ISize[] = [
  { size: 1200, name: "xlarge" },
  { size: 192, name: "small" }
];

export function fromSizeToName(size: number): string {
  return sizes.filter(w => w.size === size)[0].name;
}

export function fromNameToSize(name: string): number {
  return sizes.filter(w => w.name === name)[0].size;
}
