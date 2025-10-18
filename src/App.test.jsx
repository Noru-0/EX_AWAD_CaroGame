import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Game from './App.jsx';

describe('Tic-Tac-Toe Game', () => {
  it('renders the game with initial status', () => {
    render(<Game />);
    expect(screen.getByText("X Player 1's turn")).toBeInTheDocument();
  });

  it('allows players to make moves', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button').filter(button => 
      button.className.includes('square')
    );
    
    // First move - X
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    expect(screen.getByText("O Player 2's turn")).toBeInTheDocument();
    
    // Second move - O
    fireEvent.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');
    expect(screen.getByText("X Player 1's turn")).toBeInTheDocument();
  });

  it('prevents moves on occupied squares', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button').filter(button => 
      button.className.includes('square')
    );
    
    // First move
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    
    // Try to click the same square
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    expect(screen.getByText("O Player 2's turn")).toBeInTheDocument();
  });

  it('detects a winner', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button').filter(button => 
      button.className.includes('square')
    );
    
    // Create a winning scenario for X (top row)
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins
    
    expect(screen.getByText('🎉 Winner: X 🎉')).toBeInTheDocument();
  });

  it('provides game history functionality', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button').filter(button => 
      button.className.includes('square')
    );
    
    // Make a few moves
    fireEvent.click(squares[0]); // X at (1,1)
    fireEvent.click(squares[1]); // O at (1,2)
    
    // Check that history entries appear
    expect(screen.getByText('You are at move #2 (1, 2)')).toBeInTheDocument();
    expect(screen.getByText('Go to move #1 (1, 1)')).toBeInTheDocument();
    expect(screen.getByText('Go to game start')).toBeInTheDocument();
  });

  it('allows jumping to previous moves', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button').filter(button => 
      button.className.includes('square')
    );
    
    // Make some moves
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[2]); // X
    
    // Jump back to move 1
    const move1Button = screen.getByText('Go to move #1 (1, 1)');
    fireEvent.click(move1Button);
    
    // Check that only the first move is visible
    expect(squares[0]).toHaveTextContent('X');
    expect(squares[1]).toHaveTextContent('');
    expect(squares[2]).toHaveTextContent('');
    expect(screen.getByText("O Player 2's turn")).toBeInTheDocument();
  });

  it('resets to game start', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button').filter(button => 
      button.className.includes('square')
    );
    
    // Make some moves
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    
    // Go back to start
    const startButton = screen.getByText('Go to game start');
    fireEvent.click(startButton);
    
    // Check that board is empty
    squares.forEach(square => {
      expect(square).toHaveTextContent('');
    });
    expect(screen.getByText("X Player 1's turn")).toBeInTheDocument();
  });

  it('allows changing board size', () => {
    render(<Game />);
    
    // Find the board size selector
    const select = screen.getByDisplayValue('3x3');
    
    // Change to 5x5
    fireEvent.change(select, { target: { value: '5' } });
    
    // Check that the board now has 25 squares
    const squares = screen.getAllByRole('button').filter(button => 
      button.className.includes('square')
    );
    expect(squares).toHaveLength(25);
  });

  it('has sort functionality for moves', () => {
    render(<Game />);
    
    // Check that sort button exists
    expect(screen.getByText('Sort: Ascending')).toBeInTheDocument();
    
    // Make a move to have some history
    const squares = screen.getAllByRole('button').filter(button => 
      button.className.includes('square')
    );
    fireEvent.click(squares[0]);
    
    // Click sort button
    const sortButton = screen.getByText('Sort: Ascending');
    fireEvent.click(sortButton);
    
    expect(screen.getByText('Sort: Descending')).toBeInTheDocument();
  });
});