# 🎮 Tic Tac Toe Game (PvP & AI)

A modern, interactive **Tic Tac Toe** game built using **HTML, CSS, and JavaScript**, featuring **Local PvP**, **AI modes with difficulty levels**, **timers**, **animations**, and a **responsive UI**.
This project is beginner-friendly and well-commented for easy understanding.

---

## ✨ Features

### 🧑‍🤝‍🧑 Game Modes

* **Local PvP Mode**

  * Two players can play on the same device
  * Player 1 → ❌ (X)
  * Player 2 → ⭕ (O)
  * Fixed issue where Player 2 was also playing as ❌

* **AI Mode**

  * Play against the computer with three difficulty levels:

    * **Easy** – Random moves
    * **Medium** – Basic strategy + blocking
    * **Hard** – Smart AI using **Minimax / Backtracking Algorithm**

---

### ⏱️ Timer System

* **15 seconds** → Hint timer
* **30 seconds** → Skip move timer
* Active timer is clearly visible during gameplay
* Automatically skips turn if time runs out

---

### 🎨 UI & Animations

* Smooth **hover, click, and win animations**
* Impactful **win-line animation**
* No “AI-style” colors (no blue/purple)
* Uses warm, clean, human-friendly colors
* Responsive layout (window **resizable** on all screen sizes)
---

### 🧠 Beginner-Friendly Code

* Clean and readable structure
* **Detailed comments** explaining logic step-by-step
* Perfect for learning:

  * DOM manipulation
  * Game logic
  * Timers
  * AI algorithms

---

## 🛠️ Tech Stack

* **HTML** – Structure
* **CSS** – Styling & animations
* **JavaScript** – Game logic & AI

---

## 📂 Project Structure

```
tic-tac-toe/
│
├── index.html      # Main HTML file
├── style.css       # Styling & animations
├── script.js       # Game logic, AI, timers
└── README.md       # Project documentation
```

---

## ▶️ How to Run the Game

1. Download or clone the repository
2. Open `index.html` in any modern browser
3. Select game mode:

   * PvP
   * AI (Easy / Medium / Hard)
4. Start playing 🎉

---

## 🧠 AI Logic Overview

* **Easy Mode**

  * Random valid moves

* **Medium Mode**

  * Attempts to win
  * Blocks opponent when necessary

* **Hard Mode**

  * Uses **Minimax / Backtracking**
  * Nearly unbeatable
  * Explores future game states to make optimal decisions

---

## 👨‍💻 Author

**Tapo Chhokar**
Beginner-friendly project for learning game logic, AI, and frontend development.
