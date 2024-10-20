import { JSX } from "solid-js/jsx-runtime"

import { getBoard, updateBoard } from "@/states/board"
import { createMemo } from "solid-js"

type Props = {
  i: number
  j: number
}

export default function Cell({ i, j }: Props) {
  const [min, max] = [1, 9];

  const handleOnInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    const value = parseInt(e.currentTarget.value)
    if (Number.isNaN(value)) {
      return
    }
    if (value < min || value > max) {
      return
    }
    
    console.log(`[UPDATE] board[${i}][${j}] = ${value}`);
    updateBoard(i, j, value);
  }

  const cellValue = createMemo(() => getBoard()[i][j].value);
  const isFixedCell = createMemo(() => {
    const cell = getBoard()[i][j]
    return cell.value !== null && cell.isFixed
  });
  const cellState = createMemo(() => getBoard()[i][j].state);

  return (
    <>
      <div 
        class="cell" 
        attr:cell-state={cellState()}
        attr:fixed={isFixedCell()}
      >
        <input 
          type="number" 
          min={min}
          max={max}
          value={cellValue() ?? ""}
          onInput={handleOnInput}
          readOnly={isFixedCell()}
        />
      </div>
    </>
  )
}
