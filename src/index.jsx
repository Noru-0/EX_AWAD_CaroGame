import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './App.jsx';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="app">
      <h1>React Tic-Tac-Toe</h1>
      <Game />
    </div>
  </React.StrictMode>
);