import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { useState } from "react";

/* ------------------------------
Square
------------------------------ */

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={() => onClick()}>
      {value}
    </button>
  );
};

/* ------------------------------
Board
------------------------------ */

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const _squares = boardSquares.slice();

    // 勝者が決定した or すでに埋まっているマスにクリックした場合はクリックしてもなにも起こらないようにする
    if (calculateWinner(_squares) || _squares[i]) {
      return;
    }
    _squares[i] = xIsNext ? "X" : "O";
    setBoardSquares(_squares);
    setXIsNext(!xIsNext);
  };

  // 勝者の判定
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
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
};

/* ------------------------------
Game
------------------------------ */
const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const handleClick = (i) => {
    const _history = history.slice(0, stepNumber + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";

    setHistory(_history.concat([{ squares: squares }]));
    setStepNumber(_history.length);
    setXIsNext(!xIsNext);
  };
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };
  const _history = history;
  const current = _history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  const moves = history.map((step, move) => {
    // step: squaresの状態
    // move: 手番
    // desc: description
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
};

/* ------------------------------
勝敗判定要素
------------------------------ */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
