export type UndefinedCell = { value: null, state: 'undefined' };
export type DefinedCell = { value: number, isFixed: boolean, state: 'defined' | 'finished' | 'error' }

export type Cell = UndefinedCell | DefinedCell;

export type Board = Cell[][];


export function computeBoxSize(boardSize: number): number {
  return Math.sqrt(boardSize);
}

export function initBoard(boardSize: number, nBlanks: number): Board {
  return updateStates(addBlanks(generateBoard(boardSize), nBlanks));
}

function generateBoard(boardSize: number): Board {
  const boxSize = computeBoxSize(boardSize);

  // init(null): number[size][size] => [[null, null, ..., null], ..., [null, null, ..., null]]
  const init = (): Board => Array.from({ length: boardSize }, () => Array<Cell>(boardSize).fill({ value: null, state: 'undefined' }));
  const copy = (b: Board): Board => b.map(row => row.slice());
  const shuffleArray = <T>(a: T[]): T[] => a.slice().sort(() => Math.random() - 0.5);

  // NUMS: number[size] => [1, 2, ..., size]
  const NUMS = Array.from({ length: boardSize }, (_, i) => i + 1);


  type state = {
    i: number,
    j: number,
    board: Board
  };

  let stack: state[] = shuffleArray(NUMS).map(n => ({
    i: 0,
    j: 0,
    board: (() => {
      const b = init();
      b[0][0] = { value: n, isFixed: true, state: 'defined' };
      return b;
    })(),
  }));

  while (stack.length > 0) {
    const { i, j, board } = stack.pop() as state;

    if (i === boardSize - 1 && j === boardSize - 1) {
      return board;
    }

    let [ni, nj] = [i, j + 1];
    if (nj === boardSize) {
      [ni, nj] = [i + 1, 0];
    }

    const numsInRowColumn = [
      ...Array.from({ length: boardSize }, (_, k) => board[ni][k]),
      ...Array.from({ length: boardSize }, (_, k) => board[k][nj])
    ].filter(c => c.state !== 'undefined').map(c => c.value);
    const numsIsBox = Array.from({ length: boxSize }).map((_, k) =>
      Array.from({ length: boxSize }).map((_, l) =>
        board[(Math.floor(ni / boxSize) * boxSize) + k][(Math.floor(nj / boxSize) * boxSize) + l])
    ).flat().filter(c => c.state !== 'undefined').map(c => c.value);

    const candidates = shuffleArray(NUMS
      .filter(v => !numsInRowColumn.includes(v))
      .filter(v => !numsIsBox.includes(v))
    );
    for (const c of candidates) {
      stack.push({
        i: ni,
        j: nj,
        board: (() => {
          const nb = copy(board);
          nb[ni][nj] = { value: c, isFixed: true, state: 'defined' };
          return nb;
        })(),
      });
    }
  }

  return init();
}

function addBlanks(board: Board, nBlanks: number): Board {
  const boardSize = board.length;

  for (let i = 0; i < nBlanks; i++) {
    let i, j;
    while (true) {
      i = Math.floor(Math.random() * boardSize);
      j = Math.floor(Math.random() * boardSize);
      if (board[i][j].value !== null) {
        break;
      }
    }
    board[i][j] = { value: null, state: 'undefined' };
  }

  return board;
}

export function updateStates(board: Board): Board {
  const boardSize = board.length;
  const boxSize = computeBoxSize(boardSize);

  const isFilled = (cells: Cell[]): cells is DefinedCell[] =>
    cells.every(c => c.state !== 'undefined');
  const isQualified = (cells: DefinedCell[]): boolean => {
    const values = cells.map(c => c.value);
    return new Set(values).size === values.length;
  }

  // Scan row
  for (let i = 0; i < boardSize; i++) {
    const cellInRow = Array.from({ length: boardSize }, (_, k) => board[i][k]);
    if (isFilled(cellInRow)) {
      console.log(`Row ${i} is finished`);
      if (isQualified(cellInRow)) {
        cellInRow.forEach(c => c.state = 'finished');
      } else {
        cellInRow.forEach(c => c.state = 'error');
      }
    }
  }

  // Scan column
  for (let j = 0; j < boardSize; j++) {
    const cellInColumn = Array.from({ length: boardSize }, (_, k) => board[k][j]);
    if (isFilled(cellInColumn)) {
      console.log(`Column ${j} is finished`);
      if (isQualified(cellInColumn)) {
        cellInColumn.forEach(c => c.state = 'finished');
      } else {
        cellInColumn.forEach(c => c.state = 'error');
      }
    }
  }

  // Scan box
  for (let i = 0; i < boxSize; i++) {
    for (let j = 0; j < boxSize; j++) {
      const cellInBox = Array.from({ length: boxSize }).map((_, k) =>
        Array.from({ length: boxSize }).map((_, l) =>
          board[(i * boxSize) + k][(j * boxSize) + l])
      ).flat();

      if (isFilled(cellInBox)) {
        console.log(`Box (${i}, ${j}) is finished`);
        if (isQualified(cellInBox)) {
          cellInBox.forEach(c => c.state = 'finished');
        } else {
          cellInBox.forEach(c => c.state = 'error');
        }
      }
    }
  }

  return board;
}

export function isCleared(board: Board): boolean {
  return board.every(row => row.every(c => c.state === 'finished'));
}

(() => {
  const board = initBoard(9, 40)
  console.log(board);
})()
