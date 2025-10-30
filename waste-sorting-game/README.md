# Household Waste Sorting Game

## Game Concept
A simple, fun game where players sort falling waste items into the correct bins before they hit the ground.

## Gameplay
- **Objective**: Sort as many waste items as possible into the correct bins
- **Mechanics**: 
  - Waste items (bottles, paper, food, etc.) fall from the top of the screen
  - Player uses LEFT/RIGHT arrow keys to move a recycling truck at the bottom
  - Catch items in the correct bin category
  - Wrong bin = lose points, correct bin = gain points
  - Game ends after 60 seconds or when 10 items are missed

## Game Elements

### Waste Categories (4 types):
1. **Recyclable** (Blue bin) - plastic bottles, cans, cardboard
2. **Organic** (Green bin) - food scraps, leaves, banana peels
3. **Paper** (Yellow bin) - newspapers, documents, paper bags
4. **General** (Gray bin) - everything else

### Scoring:
- Correct sort: +10 points
- Wrong sort: -5 points
- Missed item: -1 life (start with 10 lives)

### Difficulty:
- Items fall faster as score increases
- More items appear simultaneously at higher levels

## Technical Implementation (5-minute design)

### Assets Needed:
- Simple colored rectangles for bins (can use Phaser graphics)
- Text labels for waste items (no images needed!)
- Score/life display

### Scenes:
1. **MainMenu** - Title, "Press SPACE to start"
2. **GameScene** - Main gameplay
3. **GameOver** - Final score, restart option

### Key Features:
- Physics: Arcade physics for falling items
- Input: Keyboard arrow keys
- Timer: 60-second countdown
- Responsive: Simple collision detection

## Why This Works for Quick Development:
✅ No complex graphics needed (text + colored shapes)
✅ Simple physics (just falling objects)
✅ One main mechanic (moving and catching)
✅ Easy to extend later (add images, sounds, power-ups)
✅ Educational value (teaches waste sorting)

## File Structure:
```
waste-sorting-game/
├── index.html          # Game container
├── game.js            # Main game configuration
├── scenes/
│   ├── MainMenu.js    # Start screen
│   ├── GameScene.js   # Main gameplay
│   └── GameOver.js    # End screen
└── README.md          # This file
```

## Next Steps:
1. Create basic HTML file
2. Implement MainMenu scene
3. Build GameScene with falling items
4. Add collision detection
5. Create GameOver scene with restart

Let's build it! 🎮♻️
