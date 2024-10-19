import { createMemo } from "solid-js";

import { Board as BoardData } from "@/lib/board";

import Box from "./Box";

import "./style.css";

type Props = {
  board: BoardData
}

export default function Board(props: Props) {
  const boxSize = 3;
  
  const box = createMemo(() => 
    Array.from({ length: boxSize }, (_, i) => (
      Array.from({ length: boxSize }, (_, j) => (
        Array.from({ length: boxSize }, (_, k) => (
          Array.from({ length: boxSize }, (_, l) => (
            props.board[i * boxSize + k][j * boxSize + l]
          ))
        ))
      ))
    ))
  );


  return (
    <div class="board">
      {box().map((row) => (
        <div class="row">
          {row.map((v) => (
            <Box
              box={v}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
