import { Cell as CellType } from "@/lib/board"

type Props = {
  value: CellType
}

export default function Cell(props: Props) {
  return (
    <>
      <div class="cell">
        <input 
          type="number" 
          min="1" 
          max="9" 
          value={props.value ?? ""}
          readOnly={props.value !== null}
        />
      </div>
    </>
  )
}
