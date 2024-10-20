import { Cell, makeBoard, ValueDefinedCell } from "@/lib/board";
import { createEffect, createSignal } from "solid-js";

const defaultNBlanks = 40;
const [nBlanks, setNBlanks] = createSignal(defaultNBlanks);

const boardSize = 9;
const [board, setBoard] = createSignal(makeBoard(boardSize, defaultNBlanks));
createEffect(() => {
  console.log('update board: %o', board());
})

export const boxSize = 3;

export {
  board as getBoard,
  nBlanks as getNBlanks,
  setNBlanks,
}

export function refreshBoard() {
  setBoard(makeBoard(boardSize, nBlanks()));
}

export function updateBoard(i: number, j: number, v: number) {
  const newBoard = board().map((row) => row.slice());
  newBoard[i][j] = { state: 'defined', value: v };

  // Scan
  const isFilled = (cells: Cell[]): cells is ValueDefinedCell[] =>
    cells.every(c => ['fixed', 'defined', 'finished'].includes(c.state));
  const isQualified = (cells: ValueDefinedCell[]): boolean => {
    const values = cells.map(c => c.value);
    return new Set(values).size === values.length;
  }

  // Scan row
  const cellInRow = Array.from({ length: boardSize }, (_, k) => newBoard[i][k]);
  if (isFilled(cellInRow)) {
    console.log(`Row ${i} is finished`);
    if (isQualified(cellInRow)) {
      cellInRow.forEach(c => c.state = 'finished');
    } else {
      cellInRow.forEach(c => c.state = 'error');
    }
  }

  // Scan column
  const cellInColumn = Array.from({ length: boardSize }, (_, k) => newBoard[k][j]);
  if (isFilled(cellInColumn)) {
    console.log(`Column ${j} is finished`);
    if (isQualified(cellInColumn)) {
      cellInColumn.forEach(c => c.state = 'finished');
    } else {
      cellInColumn.forEach(c => c.state = 'error');
    }
  }

  // Scan box
  const boxI = Math.floor(i / boxSize);
  const boxJ = Math.floor(j / boxSize);
  const cellInBox = Array.from({ length: boxSize }).map((_, k) =>
    Array.from({ length: boxSize }).map((_, l) =>
      newBoard[(boxI * boxSize) + k][(boxJ * boxSize) + l])
  ).flat();
  if (isFilled(cellInBox)) {
    console.log(`Box (${boxI}, ${boxJ}) is finished`);
    if (isQualified(cellInBox)) {
      cellInBox.forEach(c => c.state = 'finished');
    } else {
      cellInBox.forEach(c => c.state = 'error');
    }
  }

  setBoard(newBoard);
}
