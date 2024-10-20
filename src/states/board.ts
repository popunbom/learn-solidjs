import { addBlanks, computeBoxSize, generateBoard, updateStates } from "@/lib/board";
import { createEffect, createSignal } from "solid-js";

const defaultNBlanks = 40;
const [nBlanks, setNBlanks] = createSignal(defaultNBlanks);

const boardSize = 9;

const [board, setBoard] = createSignal(addBlanks(generateBoard(boardSize), defaultNBlanks));
createEffect(() => {
  console.log('update board: %o', board());
})

export {
  board as getBoard,
  nBlanks as getNBlanks,
  setNBlanks,
}

export const boxSize = computeBoxSize(boardSize);

export function refreshBoard() {
  setBoard(addBlanks(generateBoard(boardSize), nBlanks()));
}

export function updateBoard(i: number, j: number, v: number) {
  const newBoard = board().map((row) => row.slice());
  newBoard[i][j] = { state: 'defined', value: v };

  setBoard(updateStates(newBoard));
}
