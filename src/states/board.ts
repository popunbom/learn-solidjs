import { makeBoard } from "@/lib/board";
import { createEffect, createSignal } from "solid-js";

const defaultNBlanks = 40;
const [nBlanks, setNBlanks] = createSignal(defaultNBlanks);

const boardSize = 9;
const [board, setBoard] = createSignal(makeBoard(boardSize, defaultNBlanks));
createEffect(() => {
  console.log('update board: %o', board());
})

export {
  board as getBoard,
  nBlanks as getNBlanks,
  setNBlanks,
  setBoard,
}

export function refreshBoard() {
  setBoard(makeBoard(boardSize, nBlanks()));
}
