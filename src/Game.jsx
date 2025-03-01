import React, { useState } from "react";
import "./Game.css"; // Include CSS for animations

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],  // top row
      [3, 4, 5],  // middle row
      [6, 7, 8],  // bottom row
      [0, 3, 6],  // left column
      [1, 4, 7],  // middle column
      [2, 5, 8],  // right column
      [0, 4, 8],  // top left to bottom right diagonal
      [2, 4, 6],  // top right to bottom left diagonal
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (!board.includes(null)) {
      return "Draw";
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "🍓" : "🍡";
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="app">
      <h2>Tic Tac Toe</h2>
      {winner ? (
        <div>
          <h3>
            {winner === "Draw"
              ? " 😭 It's a draw!!! "
              : `${winner} Wins!!!Yayyy!!!`}
          </h3>
          <div className={`rain ${winner === "Draw" ? "crying" : winner}`}>
            {[...Array(400)].map((_, i) => (                      // "_"  is used for value isn`t used or ignored
              <span key={i}>{winner === "Draw" ? "😭" : winner}</span>
            ))}
          </div>
        </div>
      ) : (
        <h4>{isXTurn ? "🍓 : Its my turn now" : "🍡 : Its my turn now"}</h4>
      )}
      <div className="board" style={{ justifyContent: "center" }}>
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Restart Game</button>
    </div>
  );
};

export default Game;
