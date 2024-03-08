const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
const btnTry = document.querySelector("#btnTry");
const btnReset = document.querySelector("#btnReset");
const inputNumber = document.querySelector("#inputNumber");
let randomNumber = generateRandomNumber();
let xAttempts = 1;
let timer;

// Event Listeners
btnTry.addEventListener('click', handleTryClick);
btnReset.addEventListener('click', handleResetClick);
document.addEventListener('keydown', handleEnterKey);

// Event Handlers
function handleTryClick(event) {
    event.preventDefault();
    const guessedNumber = Number(inputNumber.value);

    if (guessedNumber < 0 || guessedNumber > 10 || isNaN(guessedNumber)) {
        alert("Por favor, insira um número entre 0 e 10.");
        return;
    }

    if (guessedNumber === randomNumber) {
        handleCorrectGuess();
    } else {
        const hint = guessedNumber > randomNumber ? "Menor" : "Maior";
        alert(`Errou! Tente um número ${hint}.`);
    }

    inputNumber.value = "";
    xAttempts++;
    resetTimer();
}

function handleCorrectGuess() {
    toggleScreen();
    saveStats(xAttempts);
    screen2.querySelector("h2").innerText = `Acertou em ${xAttempts} tentativas`;
    clearTimeout(timer);
}

function handleResetClick() {
    toggleScreen();
    xAttempts = 1;
    randomNumber = generateRandomNumber();
    clearTimeout(timer);
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

function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        alert("Tempo esgotado! Tente novamente.");
        handleResetClick();
    }, 30000); // 30 segundos para cada tentativa
}

function saveStats(attempts) {
    const stats = JSON.parse(localStorage.getItem("adivinhacaoStats")) || [];
    stats.push(attempts);
    localStorage.setItem("adivinhacaoStats", JSON.stringify(stats));
}
