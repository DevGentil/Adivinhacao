const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
const btnTry = document.querySelector("#btnTry");
const btnReset = document.querySelector("#btnReset");
const inputNumber = document.querySelector("#inputNumber");
let randomNumber = generateRandomNumber();
let xAttempts = 1;

// Event Listeners
btnTry.addEventListener('click', handleTryClick);
btnReset.addEventListener('click', handleResetClick);
document.addEventListener('keydown', handleEnterKey);

// Event Handlers
function handleTryClick(event) {
    event.preventDefault();

    const guessedNumber = Number(inputNumber.value);

    if (guessedNumber === randomNumber) {
        handleCorrectGuess();
    }

    inputNumber.value = "";
    xAttempts++;
}

function handleCorrectGuess() {
    toggleScreen();
    screen2.querySelector("h2").innerText = `Acertou em ${xAttempts} tentativas`;
}

function handleResetClick() {
    toggleScreen();
    xAttempts = 1;
    randomNumber = generateRandomNumber();
}

function handleEnterKey(e) {
    if (e.key === 'Enter' && screen1.classList.contains('hide')) {
        handleResetClick();
    }
}

// Helper Functions
function toggleScreen() {
    screen1.classList.toggle("hide");
    screen2.classList.toggle("hide");
}

function generateRandomNumber() {
    return Math.round(Math.random() * 10);
}
