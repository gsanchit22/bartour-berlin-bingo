// --- 1. LANGUAGE DATA (UPDATED WITH NEW DARES) ---
const LANGUAGES = {
    'en': {
        title_h1: "BARTOUR BERLIN",
        title_h2: "BINGO NIGHT",
        start_heading: "WELCOME TO BARTOUR BINGO!",
        start_message: "Please enter your name to start playing and compete for a free drink!",
        start_placeholder: "Your Name Here",
        start_button: "START GAME",
        win_message_prefix: "WINS!",
        win_message_suffix: "You Won, Notify your tour guide!",
        win_instruction: "Show this screen to your Bartour Host immediately!",
        reset_button: "RESET GAME",
        name_alert: "Please enter a name to start the game!",
        dares: [
            "Take a Funny Group Selfie 📸",
            "Compliment someone Honestly 😊",
            "Order a drink in a fake accent 🍻",
            "Cheers glasses with a random stranger 🥂",
            "Group picture with weird Faces 🤪",
            "Tell your funniest travel/drunk story ✈️",
            "Show a Dance Move 💃🕺",
            "Use a cheesy pick-up line on someone at your table 😉",
            "Swap clothes/accessories with someone 👗🧣"
        ]
    },
    'de': {
        title_h1: "BARTOUR BERLIN",
        title_h2: "BINGO ABEND",
        start_heading: "WILLKOMMEN ZUM BARTOUR BINGO!",
        start_message: "Bitte geben Sie Ihren Namen ein, um zu spielen und um einen Freigetränk zu kämpfen!",
        start_placeholder: "Ihr Name hier",
        start_button: "SPIEL STARTEN",
        win_message_prefix: "GEWINNT!",
        win_message_suffix: "Sie haben gewonnen, benachrichtigen Sie Ihren Tour Guide!",
        win_instruction: "Zeigen Sie diesen Bildschirm sofort Ihrem Bartour-Gastgeber!",
        reset_button: "SPIEL ZURÜCKSETZEN",
        name_alert: "Bitte geben Sie einen Namen ein, um das Spiel zu starten!",
        dares: [
            "Gruppen-Selfie 📸",
            "Gebe jmd. ein ehrliches Kompliment 😊",
            "Bestell ein Drink mit einem lustigen Akzent 🍻",
            "Stoßt mit einem zufälligen Fremden an 🥂",
            "Gruppenfoto mit lustigen Gesichtern 🤪",
            "Erzählt ein Fun Fact/Sauf Story ✈️",
            "Zeig einen Dance-Move 💃🕺",
            "Mache einen Anmachsprach an deinem Gegenüber 😉",
            "Tausch ein Kleidungsstück mit jmd👗🧣"
        ]
    },
    'es': {
        title_h1: "BARTOUR BERLIN",
        title_h2: "NOCHE DE BINGO",
        start_heading: "¡BIENVENIDO AL BINGO DE BARTOUR!",
        start_message: "¡Ingrese su nombre para comenzar a jugar y competir por una bebida gratis!",
        start_placeholder: "Tu Nombre Aquí",
        start_button: "EMPEZAR JUEGO",
        win_message_prefix: "¡GANA!",
        win_message_suffix: "¡Has ganado, notifica a tu guía!",
        win_instruction: "¡Muestre esta pantalla a su anfitrión de Bartour inmediatamente!",
        reset_button: "REINICIAR JUEGO",
        name_alert: "¡Por favor, introduzca un nombre para empezar el juego!",
        dares: [
            "Tómate una selfie grupal divertida 📸",
            "Haz un cumplido sincero a alguien 😊",
            "Pide una bebida con un acento falso 🍻",
            "Choca copas con un extraño al azar 🥂",
            "Foto grupal con caras raras 🤪",
            "Cuenta tu historia de viaje/borracho más divertida ✈️",
            "Muestra un paso de baile 💃🕺",
            "Usa una frase cursi para ligar con alguien en tu mesa 😉",
            "Intercambia ropa/accesorios con alguien 👗🧣"
        ]
    }
};

let currentLang = 'en'; // Default language is English
let playerName = "";
const completedDares = new Array(LANGUAGES[currentLang].dares.length).fill(false);

// GLOBAL ELEMENT REFERENCES
const startPopup = document.getElementById('start-popup');
const nameInput = document.getElementById('name-input');
const startGameButton = document.getElementById('start-game-button');


// --- CORE GAME LOGIC FUNCTIONS ---

function setupBoard() {
    // Set up board listeners (squares)
    const squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
        square.textContent = LANGUAGES[currentLang].dares[index]; 
        square.classList.remove('completed');
        square.onclick = () => handleSquareClick(index, square);
    });
}

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

function checkForBingo() {
    let allDaresCompleted = completedDares.every(dare => dare === true);
    if (allDaresCompleted) {
        showWinScreen(true);
    }
}

function showWinScreen(didWin) {
    const winPopup = document.getElementById('win-popup');
    const message = document.getElementById('win-message');
    const instruction = document.getElementById('win-instruction');
    
    if (didWin) {
        const langData = LANGUAGES[currentLang];
        message.innerHTML = `🎉 **${playerName.toUpperCase()} ${langData.win_message_prefix}** 🎉 ${langData.win_message_suffix}`;
        instruction.textContent = langData.win_instruction; 
        winPopup.classList.remove('hidden');
    }
}

function handleCloseModal(event) {
    const modalToClose = event.currentTarget.closest('.modal');
    if (modalToClose) {
        modalToClose.classList.add('hidden');
    }
}

function resetGame(newLang = currentLang) {
    document.getElementById('win-popup').classList.add('hidden');
    
    completedDares.fill(false);
    
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.classList.remove('completed'));
    
    nameInput.value = "";
    currentLang = newLang;
    startGame();
}


// --- UI / EVENT FUNCTIONS (Called by startGame) ---

function translatePage(lang) {
    currentLang = lang;
    const langData = LANGUAGES[lang];

    // 1. Header
    document.getElementById('header-h1').textContent = langData.title_h1;
    document.getElementById('header-h2').textContent = langData.title_h2;

    // 2. Start Pop-up
    document.getElementById('start-heading').textContent = langData.start_heading;
    document.getElementById('start-message').textContent = langData.start_message;
    nameInput.placeholder = langData.start_placeholder;
    startGameButton.textContent = langData.start_button; 

    // 3. Reset Button
    document.getElementById('reset-button').textContent = langData.reset_button;
    
    // 4. Dares 
    setupBoard(); 
}

function setLanguage(lang) {
    const langOptionsContainer = document.getElementById('lang-options');
    const langDropdownButton = document.getElementById('current-lang-display');
    const langData = LANGUAGES[lang];
    
    let flag = '';
    if (lang === 'en') flag = '🇬🇧';
    else if (lang === 'de') flag = '🇩🇪';
    else if (lang === 'es') flag = '🇪🇸';

    // Update the main display button text (using the full name for clarity in the display)
    let langName = '';
    if (lang === 'en') langName = 'English';
    else if (lang === 'de') langName = 'Deutsch';
    else if (lang === 'es') langName = 'Español';
    
    langDropdownButton.innerHTML = `<span class="flag-icon">${flag}</span> ${langName}`;
    
    // Update the 'active' class on the list items
    langOptionsContainer.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');

    if (lang !== currentLang) {
        resetGame(lang); 
    }
}

function toggleLanguageDropdown() {
    const langOptionsContainer = document.getElementById('lang-options');
    langOptionsContainer.classList.toggle('show');
}


function handleStartGameClick() {
    let name = nameInput.value.trim();
    
    if (name.length > 0) {
        playerName = name;
        startPopup.classList.add('hidden');
    } else {
        alert(LANGUAGES[currentLang].name_alert);
    }
}

function setupListeners() {
    // Attach listener for the start button
    startGameButton.onclick = handleStartGameClick;

    // Attach listeners for ALL close buttons
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.onclick = handleCloseModal;
    });

    // Attach listener for the dropdown button
    const langDropdownButton = document.getElementById('current-lang-display');
    langDropdownButton.onclick = toggleLanguageDropdown;
    
    // Attach listeners for language option links
    const langOptionsContainer = document.getElementById('lang-options');
    langOptionsContainer.querySelectorAll('a').forEach(option => {
        const lang = option.getAttribute('data-lang');
        option.onclick = (e) => {
            e.preventDefault(); 
            setLanguage(lang);
            toggleLanguageDropdown(); // Close the dropdown after selection
        };
    });

    document.getElementById('reset-button').onclick = resetGame;
}

function startGame() {
    translatePage(currentLang);
    startPopup.classList.remove('hidden');
    nameInput.focus(); 
    setupListeners();
}


// --- EXECUTION START ---
// The script waits for the entire HTML to load, then calls startGame.
document.addEventListener('DOMContentLoaded', startGame);
