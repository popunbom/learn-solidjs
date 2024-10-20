import { createEffect, createSignal, JSX } from "solid-js";

import { Board as BoardType, makeBoard } from '@/lib/board'

import Board from '@/components/Board'

import './style.css'

function App() {
  const boardSize = 9;
  const defaultNBlanks = 40;
  
  const [nBlanks, setNBlanks] = createSignal(defaultNBlanks);
  const handleChangeNBlanks: JSX.EventHandler<HTMLInputElement, Event> = (e) => setNBlanks(parseInt(e.currentTarget.value));
  
  const [board, setBoard] = createSignal(makeBoard(boardSize, nBlanks()));
  const handleRefreshBoard = () => setBoard(makeBoard(boardSize, nBlanks()));

  createEffect(() => {
    console.log('update board: %o', board());
  })

  return (
    <>
      <h1>Number place</h1>
      <div class="tooltip">
        <button
          onClick={handleRefreshBoard}
        >
          Refresh board
        </button>
        <div class="input">
          <label for="n_blanks"># of blanks</label>
          <input 
            type="number" 
            name="n_blanks" 
            id="n_blanks"
            value={nBlanks()}
            onChange={handleChangeNBlanks}
          />
        </div>
      </div>
      <Board
        board={board()}
        onChangeBoard={setBoard}
      />
    </>
  )
}

export default App
