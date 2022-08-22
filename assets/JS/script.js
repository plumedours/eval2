// Initialization global variable START

let randomDiceValue = rollDice(6);
let imgSource = "";
let currentScore = 0;
let playerTurn = 1;
let totalScorePlayer1 = 0;
let totalScorePlayer2 = 0;
let namePlayer1 = "";
let namePlayer2 = "";
let buttons = document.querySelectorAll(".disable-BTN");

// Initialization global variable END

// Page onload

window.addEventListener("load", () => {
    document.getElementById("modal-rules").style.display = "block";
    buttons.forEach(e => e.disabled = true);
});

// Make global function START

function addPlayerOneName() {
    namePlayer1 = prompt("Enter the name of player 1", "Player 1");
}

function addPlayerTwoName() {
    namePlayer2 = prompt("Enter the name of player 2", "Player 2");
}

function playersNames() {
        addPlayerOneName();
        document.getElementById("playerOneName").textContent = namePlayer1;
        addPlayerTwoName();
        document.getElementById("playerTwoName").textContent = namePlayer2;
        buttons.forEach(e => e.disabled = false);
};

function rollDice(faceCount) {
  return Math.floor(Math.random() * faceCount) + 1;
};

function resetCurrentScore() {
    currentScore = 0;
    document.getElementById("currentScoreP1").textContent = currentScore;
    document.getElementById("currentScoreP2").textContent = currentScore;
}

function resetPlay() {
    currentScore = 0;
    totalScorePlayer1 = 0;
    totalScorePlayer2 = 0;
    document.getElementById("currentScoreP1").textContent = currentScore;
    document.getElementById("currentScoreP2").textContent = currentScore;
    document.getElementById("totalScoreP1").textContent = totalScorePlayer1;
    document.getElementById("totalScoreP2").textContent = totalScorePlayer2;
}

function whoseTurn () {
    if (playerTurn === 1) {
        document.getElementById("turnP1").style.display = "none";
        document.getElementById("turnP2").style.display = "inline";
        playerTurn = 2;
       } else if (playerTurn === 2) {
        document.getElementById("turnP2").style.display = "none";
        document.getElementById("turnP1").style.display = "inline";
        playerTurn = 1;
       };
};

function buzzSound() {
    let audio = document.getElementById("buzzSound");
    audio.play();
}

function diceSound() {
    let audio = document.getElementById("diceSound");
    audio.play();
}

function winSound() {
    let audio = document.getElementById("winSound");
    audio.play();
}

function holdSound() {
    let audio = document.getElementById("holdSound");
    audio.play();
}

// Global function END

// Players Name START

document.getElementById("newGameBTN").addEventListener("click", () => {
    playersNames();
    resetPlay();
});

// Players Name END

// Procedure when player click on RollDice button START

document.getElementById("rollDiceBTN").addEventListener("click", () => {
    const randomDiceValue = rollDice(6);
    changeText(randomDiceValue);
    changeIMG(randomDiceValue);
    diceSound(); // play sound rollDice

    function changeText() {
        if (randomDiceValue === 1) {
            buzzSound(); // play sound buzzer
            whoseTurn();
            currentScore = 0; // score à 0 si la valeur du dé est égale à 1
            if (playerTurn === 1) {
                document.getElementById("currentScoreP1").textContent = currentScore; // affichage du score P1
            } else if (playerTurn === 2) {
                document.getElementById("currentScoreP2").textContent = currentScore; // affichage du score P2
            }
        } else {
            currentScore += randomDiceValue; // addition du score de la valeur du dé
            if (playerTurn === 1) {
                document.getElementById("currentScoreP1").textContent = currentScore; // affichage du score P1
            } else if (playerTurn === 2) {
                document.getElementById("currentScoreP2").textContent = currentScore; // affichage du score P2
            }
        };
    };

    function changeIMG () {
        imgSource = document.getElementById("diceIMG").src="./assets/IMG/dice" + randomDiceValue + ".png";
    };

});

// Procedure when player click on RollDice button END

// Procedure when player want save his score START

document.getElementById("holdScore").addEventListener("click", () => {
    saveScore();

    function saveScore() {
        if (playerTurn === 1) {
            totalScorePlayer1 += currentScore;
            document.getElementById("totalScoreP1").textContent = totalScorePlayer1;
            resetCurrentScore();
        } else if (playerTurn === 2) {
            totalScorePlayer2 += currentScore;
            document.getElementById("totalScoreP2").textContent = totalScorePlayer2;
            resetCurrentScore();
        }
        holdSound();
    }
    whoseTurn();

    if (totalScorePlayer1 >= 100) {
        document.getElementById("modal-win").style.display = "block";
        buttons.forEach(e => e.disabled = true);
        document.getElementById("winnerName").textContent = namePlayer1;
        winSound();
    } else if (totalScorePlayer2 >= 100) {
        document.getElementById("modal-win").style.display = "block";
        buttons.forEach(e => e.disabled = true);
        document.getElementById("winnerName").textContent = namePlayer2;
        winSound();
    }
});

// Procedure when player want save his score END

// For modal rules and winner START

document.getElementById("rulesBTN").addEventListener("click", () => {
    document.getElementById("modal-rules").style.display = "block";
});

document.querySelector(".close-modal-rules").addEventListener("click", () => {
    document.getElementById("modal-rules").style.display = "none";
});

document.querySelector(".close-modal-win").addEventListener("click", () => {
    document.getElementById("modal-win").style.display = "none";
});

// For modal rules and winner END