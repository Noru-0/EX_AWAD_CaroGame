import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Game from './App.jsx';

describe('Tic-Tac-Toe Game', () => {
  it('renders the game title', () => {
    render(<Game />);
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
  });

  it('allows players to make moves', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button').filter(button => 
      button.className === 'square'
    );
    
    // First move - X
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    expect(screen.getByText('Next player: O')).toBeInTheDocument();
    
    // Second move - O
    fireEvent.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
  });

  it('prevents moves on occupied squares', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button').filter(button => 
      button.className === 'square'
    );
    
    // First move
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    
    // Try to click the same square
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    expect(screen.getByText('Next player: O')).toBeInTheDocument();
  });

  it('detects a winner', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button').filter(button => 
      button.className === 'square'
    );
    
    // Create a winning scenario for X (top row)
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins
    
    expect(screen.getByText('Winner: X')).toBeInTheDocument();
  });

  it('provides game history functionality', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button').filter(button => 
      button.className === 'square'
    );
    
    // Make a few moves
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    
    // Check that history buttons appear
    expect(screen.getByText('Go to game start')).toBeInTheDocument();
    expect(screen.getByText('Go to move #1')).toBeInTheDocument();
    expect(screen.getByText('Go to move #2')).toBeInTheDocument();
  });

  it('allows jumping to previous moves', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button').filter(button => 
      button.className === 'square'
    );
    
    // Make some moves
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[2]); // X
    
    // Jump back to move 1
    const move1Button = screen.getByText('Go to move #1');
    fireEvent.click(move1Button);
    
    // Check that only the first move is visible
    expect(squares[0]).toHaveTextContent('X');
    expect(squares[1]).toHaveTextContent('');
    expect(squares[2]).toHaveTextContent('');
    expect(screen.getByText('Next player: O')).toBeInTheDocument();
  });

  it('resets to game start', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button').filter(button => 
      button.className === 'square'
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
    expect(screen.getByText('Next player: X')).toBeInTheDocument();
  });
});