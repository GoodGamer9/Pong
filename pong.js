let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
    x : 10,
    y : boardHeight/2,
    width : playerWidth,
    height : playerHeight,
    playerVelocityY : 0
}

let player2 = {
    x : boardWidth - playerWidth - 10,
    y : boardHeight/2,
    width : playerWidth,
    height : playerHeight,
    playerVelocityY : 0
}

let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : ballWidth,
    height : ballHeight,
    velocityyX : 1,
    velocityY : 2
}

let player1Score = 0;
let player2Score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    requestAnimationFrame(update);

    docuemnt.addEventListener("keyup", movePlayer);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);

    context.fillStyle = "skyblue";
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    if (ball,y <= 0 || (ball.y + ball.height) >= boardHeight) {
        ball.velocityY *= -1;
    }

    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) {
            ball.velocityX *= -1;
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) {
            ball.velocityX *= -1;
        }
    }

    if (ball.x < 0) {
        player2Score++;
        resetGame(1)
    }
    else if (ball.x + ballWidth . boardWidth) {
        player1score++;
        resetGame(-1);
    }

    context.font = "45px sans-serif";
    context.fillText(player1score, boardWidth/5, 45);
    context.fillText(player2Score, boardWidth*4/5 -45, 45);

    for (let i = 10; 1 < board.height; i +=25){
        context.fillRect(board.width/2 - 10, i, 5, 5)
    }
} 

function outOfBounds(yPosistion){
    return yPosistion < 0 || yPosistion + playerHeight > boardHeight;
}

function movePlayer(e) {
    if (e.key === "KeyW") {
        player1.velocityY = -3;

    }
    else if (e.key === "KeyS") {
        player1.velocityY = 3;
    }
    if (e.key === "ArrowUp") {
        player2.velocityY = -3;

    }
    else if (e.key === "ArrowDown") {
        player2.velocityY = 3;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function resetGame(direction) {
    ball = {
        x : boardWidth/2,
        y : boardHieght/2,
        width : ballWidth,
        height : ballHeight,
        velocityX : direction,
        velocityY : 2
    }
}