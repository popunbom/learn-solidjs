import { getBoard, getNBlanks, refreshBoard, setBoard, setNBlanks } from "@/states/board";

import Board from '@/components/Board'

import './style.css'

function App() {
  return (
    <>
      <h1>Number place</h1>
      <div class="tooltip">
        <button
          onClick={refreshBoard}
        >
          Refresh board
        </button>
        <div class="input">
          <label for="n_blanks"># of blanks</label>
          <input 
            type="number" 
            name="n_blanks" 
            id="n_blanks"
            value={getNBlanks()}
            onChange={(e) => setNBlanks(parseInt(e.currentTarget.value))}
          />
        </div>
      </div>
      <Board />
    </>
  )
}

export default App
