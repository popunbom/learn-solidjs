import { Board as BoardData } from "@/lib/board";

import "./style.css";
import Cell from "./Cell";

type Props = {
  board: BoardData
  onChangeBoard: (board: BoardData) => void
}

export default function Board(props: Props) {
  const boxSize = 3;

  const onChangeCell = (i: number, j: number, v: number) => {
    console.log(`onChangeCell(${i}, ${j}, ${v})`);
    
    props.board[i][j] = v;
    props.onChangeBoard(props.board);
  }

  return (
    <div class="board">
      {Array.from({ length: boxSize }).map((_, i) => (
        <div class="row">
        {Array.from({ length: boxSize }).map((_, j) => (
          <div class="box">
          {Array.from({ length: boxSize }).map((_, k) => (
            <div class="row">
            {Array.from({ length: boxSize }).map((_, l) => (
              <Cell
                value={props.board[i * boxSize + k][j * boxSize + l]}
                onChange={(value) => onChangeCell(i * boxSize + k, j * boxSize + l, value)}
              />
            ))}
            </div>
          ))}
          </div>
        ))}
        </div>
      ))}
    </div>
  )
}
