import { Board } from "@/lib/board"
import Cell from "./Cell"

type Props = {
  box: Board
}

export default function Box(props: Props) {
  return (
    <div class="box">
      {props.box.map((row, i) => (
        <div class="row">
          {row.map((_, j) => (
            <Cell
              value={props.box[i][j]}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
