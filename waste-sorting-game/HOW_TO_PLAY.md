# How to Run the Waste Sorting Game

## Quick Start

1. **Open the game**: Simply open `index.html` in your web browser
   
   From the terminal:
   ```bash
   cd waste-sorting-game
   # On Linux with default browser:
   $BROWSER index.html
   # Or use a local server (recommended):
   python3 -m http.server 8000
   # Then visit: http://localhost:8000
   ```

2. **Play the game**:
   - Press **SPACE** to start
   - Use **← → Arrow Keys** to move your bin left and right
   - Use **↑ ↓ Arrow Keys** to switch between bin types
   - Catch falling waste items in the correct bin!

## Controls

- **Arrow Keys (←/→)**: Move your bin left/right
- **Arrow Keys (↑/↓)**: Switch bin type (Blue→Green→Yellow→Gray)
- **SPACE**: Start game / Play again
- **M**: Return to main menu (on game over screen)

## Bin Types

- 🔵 **Blue (Recyclable)**: Bottle, Can, Plastic, Cardboard
- 🟢 **Green (Organic)**: Apple, Banana, Leaves, Food
- 🟡 **Yellow (Paper)**: Newspaper, Magazine, Document, Paper Bag
- ⚫ **Gray (General)**: Diaper, Straw, Wrapper, Chip Bag

## Scoring

- ✅ Correct bin: **+10 points**
- ❌ Wrong bin: **-5 points**
- 💔 Missed item: **-1 life**

## Game Over Conditions

- Run out of lives (miss 10 items)
- Time runs out (60 seconds)

## Tips

- Switch bins quickly to match incoming waste
- Position yourself early to catch items
- Watch for multiple items falling at once
- Higher scores = faster falling items!

Enjoy and learn about proper waste sorting! ♻️
