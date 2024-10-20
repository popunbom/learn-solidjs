import { Board } from "@/lib/board"
import Cell from "./Cell"

type Props = {
  i: number
  j: number
  box: Board
}

export const SIZE = 3;

export default function Box(props: Props) {
  const handleOnChangeCell = (i: number, j: number, v: number) => {
    console.log(
      "Changed (%d, %d): %d", 
      (props.i * SIZE + i),
      (props.j * SIZE + j),
      v
    )
  }

  return (
    <div class="box">
      {props.box.map((row, i) => (
        <div class="row">
          {row.map((_, j) => (
            <Cell
              value={props.box[i][j]}
              onChange={(v) => handleOnChangeCell(i, j, v)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
