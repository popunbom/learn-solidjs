import { JSX } from "solid-js/jsx-runtime"

import { getBoard, setBoard } from "@/states/board"

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
    
    const newBoard = getBoard().map((row) => row.slice());
    newBoard[i][j] = value;
    setBoard(newBoard);
  }

  const value = getBoard()[i][j];

  return (
    <>
      <div class="cell">
        <input 
          type="number" 
          min={min}
          max={max}
          value={value ?? ""}
          onInput={handleOnInput}
          readOnly={value !== null}
        />
      </div>
    </>
  )
}
