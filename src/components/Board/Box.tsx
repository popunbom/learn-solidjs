import Cell from "./Cell"

type Props = {
  box: number[][]
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
