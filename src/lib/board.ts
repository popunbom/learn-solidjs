export type FixedCell = { state: 'fixed', value: number };
export type UndefinedCell = { state: 'undefined', value: null };
export type DefinedCell = { state: 'defined', value: number };
export type FinishedCell = { state: 'finished', value: number };
export type ErrorCell = { state: 'error', value: number };

export type ValueDefinedCell = FixedCell | DefinedCell | FinishedCell | ErrorCell;

export type Cell = FixedCell | UndefinedCell | DefinedCell | FinishedCell | ErrorCell;


export type Board = Cell[][];

export function makeBoard(size: number, nBlanks: number): Board {
  const board = generateBoard(size);

  for (let i = 0; i < nBlanks; i++) {
    let i, j;
    while (true) {
      i = Math.floor(Math.random() * size);
      j = Math.floor(Math.random() * size);
      if (board[i][j] !== null) {
        break;
      }
    }

    board[i][j] = { state: 'undefined', value: null };
  }

  return board;
}

function generateBoard(size: number = 9): Board {
  // init(null): number[size][size] => [[null, null, ..., null], ..., [null, null, ..., null]]
  const init = (): Board => Array.from({ length: size }, () => Array(size).fill({ state: 'undefined', value: null }));
  const copy = (b: Board): Board => b.map(row => row.slice());
  const shuffleArray = <T>(a: T[]): T[] => a.slice().sort(() => Math.random() - 0.5);

  // NUMS: number[size] => [1, 2, ..., size]
  const NUMS = Array.from({ length: size }, (_, i) => i + 1);


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
      b[0][0] = { state: 'fixed', value: n };
      return b;
    })(),
  }));

  while (stack.length > 0) {
    const { i, j, board } = stack.pop() as state;

    if (i === size - 1 && j === size - 1) {
      return board;
    }

    let [ni, nj] = [i, j + 1];
    if (nj === size) {
      [ni, nj] = [i + 1, 0];
    }

    const numsInRowColumn = [
      ...Array.from({ length: size }, (_, k) => board[ni][k]),
      ...Array.from({ length: size }, (_, k) => board[k][nj])
    ].filter(c => c.state == 'fixed');

    const candidates = shuffleArray(NUMS.filter(v => !numsInRowColumn.map(c => c.value).includes(v)));
    for (const c of candidates) {
      stack.push({
        i: ni,
        j: nj,
        board: (() => {
          const nb = copy(board);
          nb[ni][nj] = { state: 'fixed', value: c };
          return nb;
        })(),
      });
    }
  }

  return init();
}
