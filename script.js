// 1. Array of Dares - EASY TO CHANGE! Now with Emojis!
const DARES = [
    "Take a Group Selfie 📸",
    "Convince a stranger to teach you a funny german word 🇩🇪",
    "Order a drink in a fake accent 🍻",
    "Cheers glasses with a random stranger 🥂",
    "Tell your funniest travel/drunk story ✈️",
    "Take a picture with someone wearing a chain ⛓️",
    "Show a Dance Move 💃🕺",
    "Use a cheesy pick-up line on someone at your table 😉",
    "Swap clothes/accessories with someone 👗🧣"
];

// Variables to track game state
let playerName = "";
const completedDares = new Array(DARES.length).fill(false);

// Get references to our new elements
const startPopup = document.getElementById('start-popup');
const nameInput = document.getElementById('name-input');
const startGameButton = document.getElementById('start-game-button');
const closeButtons = document.querySelectorAll('.close-btn');

// --- Core Functions ---

// Function to handle the start sequence (now uses the custom modal)
function startGame() {
    // Show the custom start pop-up instead of a basic prompt
    startPopup.classList.remove('hidden');
    nameInput.focus(); // Automatically put the cursor in the input field
    setupListeners();
}

// Function to handle game setup and listeners
function setupListeners() {
    // Event listener for the START GAME button
    startGameButton.onclick = handleStartGameClick;

    // Event listener for closing the modal (both win and start)
    closeButtons.forEach(button => {
        button.onclick = handleCloseModal;
    });

    // Set up board listeners (squares and reset button) only once
    const squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
        square.textContent = DARES[index]; 
        square.classList.remove('completed');
        square.onclick = () => handleSquareClick(index, square);
    });

    document.getElementById('reset-button').onclick = resetGame;
}

// Function executed when the START GAME button is clicked
function handleStartGameClick() {
    let name = nameInput.value.trim();
    
    if (name.length > 0) {
        playerName = name;
        startPopup.classList.add('hidden'); // Hide the pop-up
    } else {
        alert("Please enter a name to start the game!");
    }
}

// Function executed when a player clicks a square
function handleSquareClick(index, squareElement) {
    if (completedDares[index]) {
        completedDares[index] = false;
        squareElement.classList.remove('completed');
    } else {
        completedDares[index] = true;
        squareElement.classList.add('completed');
    }
    checkForBingo();
}

// Function to check if the winning condition is met
function checkForBingo() {
    let allDaresCompleted = completedDares.every(dare => dare === true);

    if (allDaresCompleted) {
        showWinScreen(true); 
    }
}


// Function to display the win pop-up
function showWinScreen(didWin) {
    const winPopup = document.getElementById('win-popup');
    const message = document.getElementById('win-message');
    
    if (didWin) {
        message.innerHTML = `🎉 **${playerName.toUpperCase()} WINS!** 🎉 You Won, Notify your tour guide!`;
        winPopup.classList.remove('hidden');
    }
}

// Function to handle the closing of any modal
function handleCloseModal(event) {
    // Find the closest parent modal element and hide it
    const modalToClose = event.target.closest('.modal');
    if (modalToClose) {
        modalToClose.classList.add('hidden');
    }
}

// Function to reset the game board
function resetGame() {
    // Reset completed flags and hide win screen
    document.getElementById('win-popup').classList.add('hidden');
    completedDares.fill(false);
    
    // Clear board visuals
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.classList.remove('completed'));
    
    // Reset name input field and show the start pop-up for the next player
    nameInput.value = "";
    startGame();
}

// --- Start the game when the page loads ---
startGame();
