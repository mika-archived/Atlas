export function skip(text: string): void {
  console.warn(`WARN: ${text}, skipped this function.`);
}

export function error(text: string): void {
  console.error(`ERROR: ${text}`);
}
