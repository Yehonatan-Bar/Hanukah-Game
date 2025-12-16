# Game Update Plan: Hanukkah Jumping Adventure

## Overview
Transform the current Hanukkah game into an endless runner-style jumping game where the hero must avoid Hanukkah-themed obstacles (sufganiyot and latkes) by jumping over them.

## Core Gameplay Mechanics

### 1. Auto-Scrolling Background
- Implement continuous horizontal scrolling from right to left
- Create a parallax effect with multiple background layers moving at different speeds
- Background should loop seamlessly to create infinite running effect
- Speed should be configurable and possibly increase over time for difficulty progression

### 2. Hero Character
- Position hero on the left side of the screen (fixed horizontal position)
- Implement jumping physics:
  - Jump triggered by screen click/tap or spacebar
  - Gravity pull to bring hero back down
  - Jump arc should feel natural (parabolic motion)
  - Prevent double jumping (hero must land before jumping again)
- Hero sprite should have:
  - Running animation when on ground
  - Jumping animation when in air
  - Landing animation (optional)

### 3. Obstacle System

#### Obstacle Types
1. **Sufganiyot (Donuts)**
   - Round Hanukkah donuts with jelly filling
   - Visual design: golden-brown with powdered sugar
   - Size variations: small, medium, large
   - Some could be stacked for higher obstacles

2. **Latkes (Potato Pancakes)**
   - Traditional Hanukkah potato pancakes
   - Visual design: golden crispy pancakes
   - Could appear as single or stacked
   - Flatter profile than sufganiyot

#### Obstacle Spawning
- Random generation of obstacles at intervals
- Maintain minimum and maximum distance between obstacles
- Random selection between sufganiyot and latkes
- Varied heights and sizes for replayability
- Spawn off-screen (right side) and move left with scrolling
- Remove obstacles when they exit screen (left side)

### 4. Collision Detection
- Implement hitbox system for hero and obstacles
- Detect when hero's hitbox overlaps with obstacle hitbox
- If collision while running: Game Over
- If hero jumps high enough: Clear the obstacle successfully

### 5. Scoring System
- Points awarded for each obstacle successfully cleared
- Display current score during gameplay
- Track and display high score
- Optional: Different point values for different obstacle types/sizes

### 6. Difficulty Progression
- Gradually increase game speed over time
- Increase obstacle spawn frequency
- Introduce more challenging obstacle patterns
- Possible gap jumps between platforms

## Game States

### 1. Start Screen
- Display game title
- Show "Click/Tap to Start" instruction
- Display current high score
- Hanukkah-themed decorations

### 2. Playing State
- Active gameplay with scrolling, jumping, obstacles
- Display current score
- Show hero lives/health (if implemented)

### 3. Game Over Screen
- Display "Game Over" message
- Show final score
- Show high score (highlight if new high score achieved)
- "Play Again" button
- "Back to Menu" button

## Technical Implementation Details

### Required Components

1. **Game Loop**
   - Update function (60 FPS target)
   - Render function
   - Input handling

2. **Physics Engine**
   - Gravity constant
   - Jump velocity
   - Ground level definition
   - Collision boundaries

3. **Sprite Management**
   - Hero sprites (running, jumping)
   - Sufganiyot sprites (various sizes)
   - Latkes sprites (various sizes)
   - Background elements
   - UI elements

4. **Asset Loading**
   - Create or source Hanukkah-themed graphics
   - Ensure all images are loaded before game starts
   - Consider using sprite sheets for animations

5. **Audio (Optional)**
   - Jump sound effect
   - Landing sound effect
   - Collision sound effect
   - Background music (Hanukkah-themed)
   - Sound on/off toggle

### Code Architecture

```
/classes
  - Hero.js (handles hero movement, jumping, animation)
  - Obstacle.js (base obstacle class)
  - Sufganiya.js (extends Obstacle)
  - Latke.js (extends Obstacle)
  - ObstacleManager.js (spawning, managing obstacles array)
  - ScrollingBackground.js (parallax background management)
  - CollisionDetector.js (hitbox collision logic)
  - ScoreManager.js (scoring, high score persistence)

/constants
  - gameConfig.js (speeds, gravity, jump force, spawn rates)

/utils
  - storage.js (localStorage for high scores)
  - helpers.js (utility functions)

/game.js (main game loop and state management)
/index.html (game canvas and UI)
/styles.css (styling)
```

## Controls

- **Click/Tap**: Jump (during gameplay)
- **Space Bar**: Jump (alternative for desktop)
- **Click/Tap**: Start game (from start/game over screen)

## Visual Design Considerations

- Maintain Hanukkah theme throughout
- Use blue and white color scheme (traditional Hanukkah colors)
- Add decorative elements: menorahs, dreidels, stars of David
- Warm, festive atmosphere with golden lighting
- Clear visual distinction between hero and obstacles

## Performance Optimization

- Object pooling for obstacles (reuse objects instead of creating new ones)
- Limit number of active obstacles on screen
- Optimize sprite rendering
- Use requestAnimationFrame for smooth animation
- Remove off-screen objects from memory

## Future Enhancement Ideas

- Power-ups: temporary invincibility, double jump, slow motion
- Different hero characters to unlock
- Multiple background themes/levels
- Multiplayer mode (race against friend's score)
- Achievement system
- Daily challenges
- Seasonal events with special obstacles

## Testing Checklist

- [ ] Hero jumps with correct physics
- [ ] Obstacles spawn at appropriate intervals
- [ ] Collision detection works accurately
- [ ] Score increments correctly
- [ ] High score persists across sessions
- [ ] Game over triggers properly
- [ ] Restart functionality works
- [ ] Performance is smooth on various devices
- [ ] Touch controls work on mobile
- [ ] Keyboard controls work on desktop
- [ ] Game is responsive to different screen sizes

## Estimated Implementation Steps

1. Set up basic game loop and canvas
2. Implement hero character with jump mechanics
3. Add scrolling background
4. Create obstacle classes and spawning system
5. Implement collision detection
6. Add scoring system
7. Create start/game over screens
8. Polish animations and visuals
9. Add sound effects and music
10. Test and optimize performance
11. Deploy updated game

---

**Note**: This plan maintains the Hanukkah theme while creating an engaging, replayable endless runner experience. The obstacles (sufganiyot and latkes) are culturally relevant and visually distinct, making the game both fun and educational about Hanukkah traditions.
