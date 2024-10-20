import { computeBoxSize, initBoard, isCleared, updateStates } from "@/lib/board";
import { createEffect, createSignal } from "solid-js";

const defaultNBlanks = 40;
const [nBlanks, setNBlanks] = createSignal(defaultNBlanks);

const boardSize = 9;

const [board, setBoard] = createSignal(initBoard(boardSize, nBlanks()));
createEffect(() => {
  if (isCleared(board())) {
    setTimeout(() => {
      alert("Congratulations! You've solved the puzzle!");
      refreshBoard();
    }, 10);
  }
})

export {
  board as getBoard,
  nBlanks as getNBlanks,
  setNBlanks,
}

export const boxSize = computeBoxSize(boardSize);

export function refreshBoard() {
  setBoard(initBoard(boardSize, nBlanks()));
}

export function updateBoard(i: number, j: number, v: number | null) {
  const newBoard = board().map((row) => row.slice());
  if (v === null) {
    newBoard[i][j] = { value: v, state: 'undefined' };
  } else {
    newBoard[i][j] = { value: v, isFixed: false, state: 'defined' };
  }

  setBoard(updateStates(newBoard));
}
