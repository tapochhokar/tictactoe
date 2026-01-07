/**
 * TIC-TAC-TOE: ELITE EDITION
 * Logic: Player vs Player, 3 Levels of AI, Turn Timers, and Hints.
 */

// --- Game State Variables ---
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = false;
let gameMode = 'pvp'; // 'pvp' or 'ai'
let difficulty = 'hard'; // 'easy', 'medium', 'hard'
let timer;
let timeLeft = 30;

// Constants
const HINT_TIME = 15; // Seconds elapsed before hint shows
const SKIP_TIME = 30; // Total seconds before turn skip

// --- UI Element Selectors ---
const statusDisplay = document.getElementById('status');
const timerBar = document.getElementById('timer-bar');
const cells = document.querySelectorAll('.cell');
const allScreens = document.querySelectorAll('.screen');

// --- Navigation Functions ---

function hideAllScreens() {
    allScreens.forEach(s => s.classList.remove('active'));
}

function showMenu() {
    stopTimer();
    hideAllScreens();
    document.getElementById('menu').classList.add('active');
}

function showAI() {
    hideAllScreens();
    document.getElementById('ai-menu').classList.add('active');
}

function showInstructions() {
    hideAllScreens();
    document.getElementById('instructions').classList.add('active');
}

// --- Game Engine ---

function startGame(mode, diff = 'hard') {
    gameMode = mode;
    difficulty = diff;
    board.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    
    // Reset Grid Visuals
    cells.forEach(cell => {
        cell.className = 'cell';
        cell.innerText = '';
    });
    
    hideAllScreens();
    document.getElementById('game-screen').classList.add('active');
    
    startTimer();
    updateStatus();
}

// --- Timer Logic ---

function startTimer() {
    clearInterval(timer);
    timeLeft = SKIP_TIME;
    updateTimerUI();
    
    timer = setInterval(() => {
        timeLeft -= 0.1;
        updateTimerUI();
        
        // Show Hint when 15 seconds have passed (15s remaining)
        if (timeLeft <= (SKIP_TIME - HINT_TIME)) {
            showHint();
        }
        
        // Skip Turn when 30 seconds have passed
        if (timeLeft <= 0) {
            switchPlayer();
        }
    }, 100);
}

function updateTimerUI() {
    const percent = (timeLeft / SKIP_TIME) * 100;
    timerBar.style.width = `${percent}%`;
    
    // Visual color shift
    if (percent < 20) timerBar.style.background = '#f43f5e'; // Red
    else if (percent < 50) timerBar.style.background = '#fbbf24'; // Gold
    else timerBar.style.background = '#10b981'; // Green
}

function stopTimer() {
    clearInterval(timer);
}

// --- Interaction Logic ---

function handleCellClick(e) {
    const index = e.target.dataset.index;
    
    // Ignore if game over, cell filled, or if it's AI's turn
    if (!gameActive || board[index] || (gameMode === 'ai' && currentPlayer === 'O')) return;
    
    makeMove(index);
}

function makeMove(index) {
    board[index] = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());
    cells[index].classList.remove('hint'); // Clear hint if move is made
    
    if (checkWin(board, currentPlayer)) {
        endGame(`Player ${currentPlayer} Wins!`);
    } else if (board.every(cell => cell !== null)) {
        endGame("It's a Draw!");
    } else {
        switchPlayer();
        
        // Trigger AI if applicable
        if (gameActive && gameMode === 'ai' && currentPlayer === 'O') {
            setTimeout(aiMove, 600); // Artificial delay for "thinking" feel
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    startTimer();
    updateStatus();
}

function updateStatus() {
    statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
}

function showHint() {
    if (!gameActive) return;
    const bestHint = minimax(board, currentPlayer).index;
    cells[bestHint].classList.add('hint');
}

// --- AI Logic ---

function aiMove() {
    let moveIndex;
    
    if (difficulty === 'easy') {
        moveIndex = getRandomMove();
    } else if (difficulty === 'medium') {
        // Medium is a mix of smart and random
        moveIndex = Math.random() > 0.4 ? minimax(board, 'O').index : getRandomMove();
    } else {
        // Hard is pure Minimax
        moveIndex = minimax(board, 'O').index;
    }
    
    makeMove(moveIndex);
}

function getRandomMove() {
    const availableIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    return availableIndices[Math.floor(Math.random() * availableIndices.length)];
}

/**
 * Minimax Algorithm for optimal moves
 */
function minimax(newBoard, player) {
    const availSpots = newBoard.map((v, i) => v === null ? i : null).filter(v => v !== null);

    // Terminal states (scores)
    if (checkWin(newBoard, 'X')) return { score: -10 };
    if (checkWin(newBoard, 'O')) return { score: 10 };
    if (availSpots.length === 0) return { score: 0 };

    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = availSpots[i];
        newBoard[availSpots[i]] = player;

        if (player === 'O') {
            let result = minimax(newBoard, 'X');
            move.score = result.score;
        } else {
            let result = minimax(newBoard, 'O');
            move.score = result.score;
        }

        newBoard[availSpots[i]] = null; // Backtrack
        moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

// --- Utility Functions ---

function checkWin(b, p) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winPatterns.some(pattern => pattern.every(idx => b[idx] === p));
}

function endGame(msg) {
    statusDisplay.innerText = msg;
    gameActive = false;
    stopTimer();
    
    // Small victory flare: Add glow to winning status
    statusDisplay.style.color = '#fbbf24';
    setTimeout(() => {
        statusDisplay.style.color = 'white';
    }, 2000);
}

// --- Event Listeners ---
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Initialize by showing menu
showMenu();