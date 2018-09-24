
export function encode(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.addEventListener("load", () => {
      resolve(fr.result as string);
    });
    fr.readAsDataURL(file);
  });
}
