# React Tic-Tac-Toe Game

[![CI/CD Pipeline](https://github.com/Noru-0/EX_AWAD_CaroGame/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Noru-0/EX_AWAD_CaroGame/actions/workflows/ci-cd.yml)
[![Render Deployment](https://img.shields.io/badge/deployment-Render-purple)](https://render.com)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)](https://vitejs.dev/)

A modern, fully-featured Tic-Tac-Toe game built with React and Vite. This project includes game history, move navigation, and a beautiful responsive design.

## Features

- ✨ **Interactive Gameplay**: Click squares to make moves
- 🏆 **Winner Detection**: Automatically detects when a player wins
- 📜 **Game History**: Track all moves and jump to any previous state
- 🎨 **Beautiful UI**: Modern design with smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Development**: Built with Vite for lightning-fast HMR

## CI/CD Pipeline

This project includes a complete CI/CD pipeline with:

### 🔄 Continuous Integration
- **Multi-Node Testing**: Tests on Node.js 18.x and 20.x
- **Code Quality**: ESLint linting for JavaScript and JSX
- **Automated Testing**: Vitest unit tests with React Testing Library
- **Security Scanning**: npm audit for vulnerability detection
- **Build Verification**: Ensures production builds work correctly

### 🚀 Continuous Deployment
- **Render Integration**: Automatic deployment when you push to main branch
- **Build Artifacts**: GitHub Actions stores build files for debugging
- **Pull Request Previews**: Render automatically creates preview deployments for PRs

### 📋 Pull Request Validation
- **PR Checks**: Validates all PRs before merging
- **Build Size Monitoring**: Reports bundle size changes
- **Automated Comments**: Provides build status in PR comments

### 🛡️ Security Features
- **Dependency Scanning**: Regular security audits
- **Vulnerability Alerts**: Fails builds on high-severity issues
- **Safe Deployments**: Only deploys verified, tested code

## Development Workflow

1. **Make Changes**: Create feature branches for new development
2. **Run Tests**: `npm test` - Run tests locally
3. **Check Quality**: `npm run lint` - Ensure code quality
4. **Create PR**: Submit pull request for review
5. **Auto-Deploy**: Merging to main automatically deploys to GitHub Pages

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI
- `npm run coverage` - Generate test coverage report
- `npm run lint` - Check code quality
- `npm run lint:fix` - Fix linting issues automatically

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

## 🚀 Deployment

This project is configured for deployment on **Render**, a reliable cloud platform perfect for static sites.

### **Deploy to Render**

**Option 1 - GitHub Integration (Recommended):**
1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign up
3. Click "New" → "Static Site"
4. Connect your GitHub repository
5. Render will auto-detect settings from `render.yaml`
6. Click "Create Static Site"

**Option 2 - Manual Deploy:**
1. Build the project: `npm run build`
2. Upload the `dist` folder to Render

### **Render Configuration**

The project includes a `render.yaml` file with optimized settings:
- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `./dist`
- **Node Version**: 20.x
- **Auto-deploy**: Enabled on Git pushes
- **Pull Request Previews**: Enabled
- **Security Headers**: Content security and caching headers included
- **Host Configuration**: Vite configured to allow Render domains

### **🔧 Pre-Deployment Checklist**

Before deploying, make sure:
- [ ] All tests pass: `npm run test:run`
- [ ] Linting passes: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] Preview works: `npm run preview`

After deployment, your Tic-Tac-Toe game will be live at: `https://your-project-name.onrender.com`

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the [MIT License](LICENSE).