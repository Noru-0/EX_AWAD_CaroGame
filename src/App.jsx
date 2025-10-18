import { useState } from 'react';

function Square({ value, onSquareClick, isWinning }) {
  return (
    <button 
      className={`square ${isWinning ? 'winning-square' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, i);
  }

  const winnerInfo = calculateWinner(squares);
  const winningLine = winnerInfo ? winnerInfo.line : [];
  let status;
  if (winnerInfo) {
    status = 'Winner: ' + winnerInfo.winner;
  } else if (squares.every(square => square !== null)) {
    status = 'Draw: No winner!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squareElements = [];
    for (let col = 0; col < 3; col++) {
      const squareIndex = row * 3 + col;
      squareElements.push(
        <Square 
          key={squareIndex}
          value={squares[squareIndex]} 
          onSquareClick={() => handleClick(squareIndex)}
          isWinning={winningLine.includes(squareIndex)}
        />
      );
    }
    boardRows.push(
      <div key={row} className="board-row">
        {squareElements}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moveLocations, setMoveLocations] = useState([null]); // Track move locations
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, squareIndex) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextMoveLocations = [...moveLocations.slice(0, currentMove + 1), squareIndex];
    setHistory(nextHistory);
    setMoveLocations(nextMoveLocations);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSortOrder() {
    setIsAscending(!isAscending);
  }

  function getLocationString(squareIndex) {
    if (squareIndex === null) return '';
    const row = Math.floor(squareIndex / 3) + 1; // 1-based indexing
    const col = (squareIndex % 3) + 1; // 1-based indexing
    return ` (${row}, ${col})`;
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      const locationString = getLocationString(moveLocations[move]);
      description = 'Go to move #' + move + locationString;
    } else {
      description = 'Go to game start';
    }
    
    // For the current move, show text instead of a button
    if (move === currentMove) {
      const locationString = move > 0 ? getLocationString(moveLocations[move]) : '';
      return (
        <li key={move}>
          You are at move #{move}{locationString}
        </li>
      );
    }
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Sort moves based on current sort order
  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={toggleSortOrder}>
          Sort: {isAscending ? 'Ascending' : 'Descending'}
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
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
      return {
        winner: squares[a],
        line: [a, b, c]
      };
    }
  }
  return null;
}