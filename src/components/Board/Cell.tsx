import { Cell as CellType } from "@/lib/board"

type Props = {
  value: CellType
}

export default function Cell(props: Props) {
  return (
    <>
      <div class="cell">{props.value}</div>
    </>
  )
}
