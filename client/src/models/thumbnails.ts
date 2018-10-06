
interface IThumbnail {
  size: number;
  name: string;
}

const thumbnails: IThumbnail[] = [
  { size: 1200, name: "xlarge" },
  { size: 192, name: "small" }
];

export function fromSizeToName(size: number): string {
  return thumbnails.filter(w => w.size === size)[0].name;
}
