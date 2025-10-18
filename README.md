# React Tic-Tac-Toe Game

A modern, fully-featured Tic-Tac-Toe game built with React and Vite. This project includes game history, move navigation, and a beautiful responsive design.

## Features

- ✨ **Interactive Gameplay**: Click squares to make moves
- 🏆 **Winner Detection**: Automatically detects when a player wins
- 📜 **Game History**: Track all moves and jump to any previous state
- 🎨 **Beautiful UI**: Modern design with smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Development**: Built with Vite for lightning-fast HMR

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository or download the project files
2. Navigate to the project directory:
   ```bash
   cd EX_AWAD_CaroGame
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

The game will open in your browser at `http://localhost:3000`.

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## How to Play

1. The game is played on a 3×3 grid
2. Players take turns placing X's and O's
3. The first player to get 3 marks in a row (horizontally, vertically, or diagonally) wins
4. Use the game history panel to jump back to any previous move
5. Click "Go to game start" to restart the game

## Project Structure

```
EX_AWAD_CaroGame/
├── src/
│   ├── App.js          # Main game components (Square, Board, Game)
│   ├── index.js        # React app entry point
│   └── styles.css      # Game styling and responsive design
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md          # This file
```

## Technologies Used

- **React 18** - Component-based UI library
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript ES6+** - Modern JavaScript features

## Game Logic

The game implements the following core features:

- **State Management**: Uses React hooks (`useState`) to manage game state
- **Immutability**: Game history is preserved using array spreading
- **Winner Algorithm**: Checks all possible winning combinations
- **Move History**: Stores each game state for navigation

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the [MIT License](LICENSE).