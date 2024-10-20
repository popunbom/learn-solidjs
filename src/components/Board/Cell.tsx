import { Cell as CellType } from "@/lib/board"
import { JSX } from "solid-js/jsx-runtime"

type Props = {
  value: CellType
  onChange: (value: number) => void
}

export default function Cell(props: Props) {
  const [min, max] = [1, 9];

  const handleOnInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    const value = parseInt(e.currentTarget.value)
    if (Number.isNaN(value)) {
      return
    }
    if (value < min || value > max) {
      return
    }
    props.onChange(value)
  }

  return (
    <>
      <div class="cell">
        <input 
          type="number" 
          min={min}
          max={max}
          value={props.value ?? ""}
          onInput={handleOnInput}
          readOnly={props.value !== null}
        />
      </div>
    </>
  )
}
