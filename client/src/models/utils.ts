import { ISize } from "./types";

// 入力サイズからアスペクト比を保持したまま、長い方が指定されたサイズになるようにする
export function resizeSquare(orig: ISize, to: number): ISize {
  if (to === 0) {
    return { width: 0, height: 0 };
  }
  if (orig.height < orig.width) {
    return { width: to, height: (orig.height * to / orig.width) };
  }
  return { width: (orig.width * to / orig.height), height: to };
}
