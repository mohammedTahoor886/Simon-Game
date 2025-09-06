let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;
let h2 = document.querySelector("h2");
let btnColor = ["red", "yellow", "green", "blue"];
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
const highScoreDisplay = document.getElementById("highScore");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;
        levelUp();
        highScoreDisplay.textContent = `HIghScore ${highScore}`;
        high();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btnColor[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
};

function gameFlash(btn) {
    btn.classList.add("game-flash");
    setTimeout(function () {
        btn.classList.remove("game-flash");
    }, 200);
};

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function () {
        btn.classList.remove("user-flash");
    }, 200);
};

function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over your score <b>${level}</b> <br>press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#fff";
        }, 200);
        reset();
    }
};

function high() {
    if (level >= highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = `HighScore${highScore}`;
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
    btn.addEventListener("click", btnPress);
}
function reset() {
    level = 0;
    userSeq = [];
    gameSeq = [];
    started = false;
}
