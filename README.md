# Sufganiyot Chase - Hanukkah Game

A fun, mobile-friendly Phaser 3 game where you control a hero avoiding sufganiyot (Jewish donuts) for as long as possible! The longer you survive, the higher your score.

## Features

- 🎮 Smooth 8-direction movement
- 📱 Mobile-friendly with touch controls (virtual joystick)
- ⌨️ Desktop support with keyboard controls (Arrow keys + WASD)
- 🍩 Enemy donuts that chase you with AI
- 📈 Progressive difficulty (spawn rate and speed increase over time)
- 🏆 High score tracking using localStorage
- 📊 Real-time score display
- 💥 Screen shake and visual effects on game over
- 🎯 Bonus points for near misses

## Game Rules

- Control your hero to avoid the sufganiyot (donuts)
- Donuts spawn from the edges and chase you
- Score increases based on time survived
- Get bonus points for close calls
- If a donut touches you, game over!
- Beat your high score

## Controls

### Desktop
- **Arrow Keys**: Move in 8 directions
- **WASD**: Alternative movement controls
- **Space/Enter**: Restart game (on game over screen)

### Mobile
- **Virtual Joystick**: Touch and drag the on-screen joystick to move
- **Tap Buttons**: Use on-screen buttons to restart

## How to Run Locally

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Hanukah-Game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000` (or the URL shown in terminal)

## How to Build

Build the project for production:

```bash
npm run build
```

This creates a `dist/` folder with optimized files ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

## How to Deploy on GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. Create a file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Go to your GitHub repository settings
3. Navigate to **Settings > Pages**
4. Under "Build and deployment", select **GitHub Actions** as the source
5. Push your code to the `main` branch
6. The game will automatically deploy to `https://<username>.github.io/<repository-name>/`

### Method 2: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist/` folder contains your built game

3. Push the `dist/` folder to the `gh-pages` branch:
```bash
# Install gh-pages package
npm install -D gh-pages

# Add deploy script to package.json
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

4. Go to your repository settings on GitHub
5. Navigate to **Settings > Pages**
6. Select `gh-pages` branch as the source
7. Your game will be available at `https://<username>.github.io/<repository-name>/`

### Important Notes for GitHub Pages

- The `vite.config.js` is already configured with `base: './'` for relative paths
- This ensures assets load correctly on GitHub Pages
- If deploying to a subfolder, update the base path in `vite.config.js`:
  ```javascript
  base: '/repository-name/'
  ```

## Project Structure

```
Hanukah-Game/
├── src/
│   ├── main.js                 # Main game configuration
│   ├── scenes/
│   │   ├── BootScene.js        # Initial loading scene
│   │   ├── MainMenuScene.js    # Main menu
│   │   ├── GameScene.js        # Main gameplay scene
│   │   └── GameOverScene.js    # Game over screen
│   ├── entities/
│   │   ├── Hero.js             # Player character class
│   │   └── Donut.js            # Enemy donut class
│   ├── managers/
│   │   └── DonutSpawner.js     # Spawning and difficulty manager
│   └── ui/
│       └── VirtualJoystick.js  # Mobile touch controls
├── index.html                   # Main HTML file
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Technologies Used

- **Phaser 3**: Game framework
- **Vite**: Build tool and dev server
- **JavaScript (ES6+)**: Programming language
- **HTML5 Canvas**: Rendering
- **Arcade Physics**: Physics engine

## Game Architecture

### Scenes
- **BootScene**: Handles initial loading
- **MainMenuScene**: Start screen with best score display
- **GameScene**: Main gameplay with hero, donuts, and scoring
- **GameOverScene**: End screen with restart option

### Entities
- **Hero**: Player-controlled character with keyboard and touch controls
- **Donut**: Enemy that chases the hero using seek behavior

### Managers
- **DonutSpawner**: Manages enemy spawning, difficulty scaling, and enemy updates

### UI
- **VirtualJoystick**: Touch-based joystick for mobile devices

## Performance

- Optimized for 60 FPS on mobile devices
- Responsive scaling maintains aspect ratio
- Uses Phaser's Arcade Physics for efficient collision detection
- Graphics generated at runtime (no external assets required)

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari (iPhone/iPad)
- Android Chrome
- Requires JavaScript enabled

## License

MIT License - feel free to use and modify for your own projects!

## Credits

Game concept inspired by traditional Hanukkah foods (sufganiyot).

Built with ❤️ using Phaser 3 and Vite.
