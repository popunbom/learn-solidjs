import Box from "./Box";

import "./style.css";

type Props = {
  board: number[][]
}

export default function Board(props: Props) {
  const boxSize = 3;

  const box: number[][][][] = 
    Array.from({ length: boxSize }, (_, i) => (
      Array.from({ length: boxSize }, (_, j) => (
        Array.from({ length: boxSize }, (_, k) => (
          Array.from({ length: boxSize }, (_, l) => (
            props.board[i * boxSize + k][j * boxSize + l]
          ))
        ))
      ))
    ));

  return (
    <div class="board">
      {box.map((row, i) => (
        <div class="row">
          {row.map((_, j) => (
            <Box
              box={box[i][j]}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
