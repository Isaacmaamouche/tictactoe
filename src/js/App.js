import React from "react";
import {hot} from "react-hot-loader";
import {useState} from "react"
import "../css/App.Scss";

function Board(props) {
   function renderSquare(i, col) {
    let winClass = props.winnerSquare.includes(i) ? "win":"";
    let filledClass = props.squares[i] != null ? "filled":"";
    return (
      <button key={'square_'+i} data-col={col+1} className={'square ' + filledClass + ' ' + winClass} onClick={(e)=>props.handleClick(i, e)} >
        {props.squares[i]}
      </button>
    );
  }

  function renderSquares(){
    let squares = [];
    for (let i=0;i<3;i++){
      let row=[];
      for (let y=0;y<3;y++){
        row.push(renderSquare(i * 3 + y, y));
      }
      squares.push(<div key={'row_'+i} data-row={i+1} className="board-row">{row}</div>);
    }
    return squares;
  }

    return (
      <div>
        <div className="status">
          <p>{props.status}</p>
        </div>
        {renderSquares()}
      </div>
    );
  }

function Game(){
  let [history,setHistory] = useState([{squares:Array(9).fill(null),squareRow:null,squareCol:null, player:null}]);
  let [player,setPlayer] = useState("X");
  let [squares,setSquares] = useState(Array(9).fill(null));
  let calculateWinnerRes = calculateWinner(squares);
  let status = calculateWinnerRes.status==null ? `The next player is : ${player}`: calculateWinnerRes.status;
  let winnerSquare = calculateWinnerRes.squares==null ? [] : calculateWinnerRes.squares;
  let [moveNumber, setMoveNumber] = useState(0);

  function handleClick(i, e){
    if(squares[i]==null && calculateWinnerRes.status==null){
      let row = e.target.parentElement.getAttribute('data-row');
      let col =e.target.getAttribute('data-col');
      let newSquares = squares.slice();
      newSquares[i] = player;
      setSquares(newSquares);
      setHistory([...history.slice(0, moveNumber+1),{squares:newSquares,squareRow:row,squareCol:col, player:player}]);
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
        return {status:`The Winner is : ${squares[a]}`, squares:lines[i]};
      }
    }
    if(!squares.includes(null)) return {status:"It's a DRAW !", squares:null};
    return {status:null, squares:null};
  }

  const moves = history.map((step, move) => {

    const desc = move ?
      'Go to move #' + move + ' from player ' + step.player + ' in row-' + step.squareRow + ' & col-' + step.squareCol:
      'Go to game start';
      let currentMove = move==moveNumber ? "currentMove":null;
    if(history.length>1) return (
      <li key={move} className={currentMove}>
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
        <Board squares={squares} status={status} handleClick={handleClick} winnerSquare={winnerSquare} />
      </div>
      <div>

      <ul>{moves}</ul>
      </div>
    </div>
  );
}


export default hot(module)(Game);