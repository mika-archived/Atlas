import { ISize } from "./types";

// 入力サイズからアスペクト比を保持したまま、長い方が指定されたサイズになるようにする
export function resizeSquare(original: ISize, to: number): ISize {
  if (to === 0) {
    return { width: 0, height: 0 };
  }

  // 幅の方が大きい
  if (original.height < original.width) {
    if (original.width <= to) {
      return original;
    }
    return { width: to, height: (original.height * to / original.width) };
  }

  // 同じ
  if (original.height === original.width) {
    if (original.height <= to) {
      return original;
    } else {
      return { width: to, height: to };
    }
  }

  // 高さの方が大きい
  if (original.height <= to) {
    return original;
  }
  return { width: (original.width * to / original.height), height: to };
}
