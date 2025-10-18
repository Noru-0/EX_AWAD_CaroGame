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

function Board({ xIsNext, squares, onPlay, boardSize }) {
  function handleClick(i) {
    if (calculateWinner(squares, boardSize) || squares[i]) {
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

  const winnerInfo = calculateWinner(squares, boardSize);
  const winningLine = winnerInfo ? winnerInfo.line : [];
  let status;
  let statusClass = '';
  
  if (winnerInfo) {
    status = `🎉 Winner: ${winnerInfo.winner} 🎉`;
    statusClass = 'status-winner';
  } else if (squares.every(square => square !== null)) {
    status = '🤝 Draw: No winner! 🤝';
    statusClass = 'status-draw';
  } else {
    const playerSymbol = xIsNext ? 'X' : 'O';
    const playerName = xIsNext ? 'Player 1' : 'Player 2';
    status = `${playerSymbol} ${playerName}'s turn`;
    statusClass = xIsNext ? 'status-player-x' : 'status-player-o';
  }

  const boardRows = [];
  for (let row = 0; row < boardSize; row++) {
    const squareElements = [];
    for (let col = 0; col < boardSize; col++) {
      const squareIndex = row * boardSize + col;
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
      <div className={`status ${statusClass}`}>{status}</div>
      <div 
        className="board" 
        style={{'--board-size': boardSize}}
      >
        {boardRows}
      </div>
    </>
  );
}

export default function Game() {
  const [boardSize, setBoardSize] = useState(3);
  const [history, setHistory] = useState([Array(boardSize * boardSize).fill(null)]);
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

  function changeBoardSize(newSize) {
    setBoardSize(newSize);
    setHistory([Array(newSize * newSize).fill(null)]);
    setMoveLocations([null]);
    setCurrentMove(0);
  }

  function getLocationString(squareIndex) {
    if (squareIndex === null) return '';
    const row = Math.floor(squareIndex / boardSize) + 1; // 1-based indexing
    const col = (squareIndex % boardSize) + 1; // 1-based indexing
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
      <div className="game-controls">
        <label>
          Board Size: 
          <select value={boardSize} onChange={(e) => changeBoardSize(parseInt(e.target.value))}>
            <option value={3}>3x3</option>
            <option value={5}>5x5</option>
            <option value={7}>7x7</option>
            <option value={9}>9x9</option>
          </select>
        </label>
      </div>
      <div className="game-main">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} boardSize={boardSize} />
        </div>
        <div className="game-info">
          <button onClick={toggleSortOrder}>
            Sort: {isAscending ? 'Ascending' : 'Descending'}
          </button>
          <ol>{sortedMoves}</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares, boardSize) {
  const lines = [];
  
  // Generate horizontal lines
  for (let row = 0; row < boardSize; row++) {
    const line = [];
    for (let col = 0; col < boardSize; col++) {
      line.push(row * boardSize + col);
    }
    lines.push(line);
  }
  
  // Generate vertical lines
  for (let col = 0; col < boardSize; col++) {
    const line = [];
    for (let row = 0; row < boardSize; row++) {
      line.push(row * boardSize + col);
    }
    lines.push(line);
  }
  
  // Generate main diagonal (top-left to bottom-right)
  const mainDiagonal = [];
  for (let i = 0; i < boardSize; i++) {
    mainDiagonal.push(i * boardSize + i);
  }
  lines.push(mainDiagonal);
  
  // Generate anti-diagonal (top-right to bottom-left)
  const antiDiagonal = [];
  for (let i = 0; i < boardSize; i++) {
    antiDiagonal.push(i * boardSize + (boardSize - 1 - i));
  }
  lines.push(antiDiagonal);
  
  // Check each line for a winner
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const firstSquare = squares[line[0]];
    
    if (firstSquare && line.every(index => squares[index] === firstSquare)) {
      return {
        winner: firstSquare,
        line: line
      };
    }
  }
  
  return null;
}