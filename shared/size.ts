interface ISize {
  size: number;
  name: string;
  post: boolean;
}

const revision = 0;

export const sizes: ISize[] = [
  { size: 1200, name: "xlarge", post: true },
  { size: 1200, name: `xlarge_pr${revision}`, post: false },
  { size: 192, name: "small", post: true },
  { size: 192, name: `small_pr${revision}`, post: false }
];

export function fromSizeToName(size: number): string {
  return sizes.filter(w => w.size === size)[0].name;
}

export function fromNameToSize(name: string): number {
  return sizes.filter(w => w.name === name)[0].size;
}
