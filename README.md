# Puzzle Blocks – پازل بلوکی

A bilingual (English / فارسی) block puzzle game built with pure HTML, CSS and JavaScript.  
Place colorful polyomino pieces on a 10×10 grid, clear full rows and columns, and chase the high score.

![Puzzle Blocks](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-success)

## 🎮 Play

Just open `index.html` in any modern browser.  
No build step, no server required (works offline after first load of fonts).

## ✨ Features

- **10×10 grid**
- **Two difficulty modes**:
  - **Easy** – Click a piece to rotate it 90°, then drag & drop it anywhere it fits
  - **Hard** – No rotation; place pieces exactly as they appear
- **Many polyomino shapes** (from monomino to pentomino-like pieces)
- **Drag & Drop** placement (mouse + touch)
- **Live placement preview** (valid / invalid highlight)
- **Row & column clearing** with simultaneous multi-line clears
- **Clear animation**
- **Scoring system** with combo bonuses
- **High score** persisted in `localStorage`
- **Undo** one move
- **Save / Continue** game
- **Fully responsive** design
- **Bilingual UI** – switch between English and فارسی at any time
- **RTL support** for Persian

## 🕹️ How to Play

1. Choose language (English / فارسی).
2. Select a mode (**Easy** or **Hard**) and press **Start Game**.
3. Three pieces appear at the bottom.
4. **Easy mode**: click a piece to rotate it, then drag it onto the board.
5. **Hard mode**: drag the piece exactly as shown – no rotation allowed.
6. When a row or column is completely filled it is cleared and you score points.
7. After using all three pieces, three new ones appear.
8. The game ends when none of the remaining pieces can be placed.

### Scoring

- Base points = number of blocks in the placed piece
- Line clear = 10 × number of lines × combo multiplier (extra multiplier when ≥ 2 lines)

## 🛠️ Tech Stack

| Requirement       | Implementation          |
|-------------------|-------------------------|
| UI                | HTML + CSS              |
| Game logic        | Vanilla JavaScript      |
| Board layout      | CSS Grid                |
| Interaction       | Pointer Events (Drag)   |
| Persistence       | `localStorage`          |
| Fonts             | Inter + Vazirmatn (Google Fonts) |

No frameworks, no build tools, no external libraries.

## 📁 Project Structure

```
.
├── index.html      # Main HTML structure
├── style.css       # All styles + responsive rules
├── script.js       # Game logic, i18n, drag & drop, rotation
└── README.md       # This file
```

## 🌐 Localization

All user-facing strings live in the `i18n` object inside `script.js`.  
Language preference is saved in `localStorage` under the key `pb_lang`.

## 💾 Saved Data

| Key            | Content                        |
|----------------|--------------------------------|
| `pb_highscore` | Best score ever                |
| `pb_lang`      | Preferred language (`en`/`fa`) |
| `pb_save`      | Full game state for Continue   |

## 📱 Browser Support

Works on all modern browsers that support:

- CSS Grid
- Pointer Events
- `localStorage`
- ES6+ JavaScript

Tested on Chrome, Firefox, Safari and Edge (desktop + mobile).



