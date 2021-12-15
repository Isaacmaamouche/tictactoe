import React from "react";
import {hot} from "react-hot-loader";
import {useState} from "react"
import "../css/App.Scss";

function Board(props) {
  function renderSquare(i) {
    let squareClass = props.squares[i] != null ? "square filled":"square";
    return (
      <button className={squareClass} onClick={()=>props.handleClick(i)} >
        {props.squares[i]}
      </button>
    );
  }

    return (
      <div>
        <div className="status">{props.status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
  }

function Game(){
  let [history,setHistory] = useState([{squares:Array(9).fill(null)}]);
  let [player,setPlayer] = useState("X");
  let [squares,setSquares] = useState(Array(9).fill(null));
  let status = calculateWinner(squares)==null ? `The next player is : ${player}`: calculateWinner(squares);
  let [moveNumber, setMoveNumber] = useState(0);

  function handleClick(i){
    if(squares[i]==null && calculateWinner(squares)==null){
      let newSquares = squares.slice();
      newSquares[i] = player;
      setSquares(newSquares);
      setHistory([...history.slice(0, moveNumber+1),{squares:newSquares}]);
      setMoveNumber(moveNumber+1)
      setPlayer(player=="X"?"O":"X");
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return `The Winner is : ${squares[a]}`;
      }
    }
    return null;
  }

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    if(history.length>1) return (
      <li key={move}>
        <button onClick={() => jumpTo(move, step)}>{desc}</button>
      </li>
    );
  });

  function jumpTo(move, step){
    setSquares(step.squares);
    setPlayer(((move % 2) !== 0) ?"O":"X");
    setMoveNumber(move)
  }  

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} status={status} handleClick={handleClick}/>
      </div>
      <div>

      <ul>{moves}</ul>
      </div>
    </div>
  );
}


export default hot(module)(Game);