import { boxSize } from "@/states/board";

import Cell from "./Cell";

import "./style.css";

export default function Board() {
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
                i={i * boxSize + k}
                j={j * boxSize + l}
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
