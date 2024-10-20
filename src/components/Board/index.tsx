import { createMemo } from "solid-js";

import { Board as BoardData } from "@/lib/board";

import Box, { SIZE as BoxSize } from "./Box";

import "./style.css";

type Props = {
  board: BoardData
}

export default function Board(props: Props) {
  const box = createMemo(() => 
    Array.from({ length: BoxSize }, (_, i) => (
      Array.from({ length: BoxSize }, (_, j) => (
        Array.from({ length: BoxSize }, (_, k) => (
          Array.from({ length: BoxSize }, (_, l) => (
            props.board[i * BoxSize + k][j * BoxSize + l]
          ))
        ))
      ))
    ))
  );


  return (
    <div class="board">
      {box().map((row, i) => (
        <div class="row">
          {row.map((v, j) => (
            <Box
              i={i}
              j={j}
              box={v}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
