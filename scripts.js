let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext ("2d");

const GAME_BOARD_WIDTH = 480,  GAME_BOARD_HEIGHT = 360;
const BALL_RADIUS = 7, BALL_RADIAN = 30, BALL_SPEED = 10;
const SCORE_INCREASING_SPEED = 1000;

let x = canvas.width/2;
let y = canvas.height - BALL_RADIAN;
let dx = 2;
let dy = -2;

const  PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 95;
let paddleX  = (canvas.width-PADDLE_WIDTH)/2;

let rightPressed = false;
let leftPressed = false;

let gameBoardRowCount = 3;
let gameBoardColumnCount = 5;
let gameBoardCells = [];

let GameBoard = function (width, height) {
    this.width = width;
    this.height = height;

    this.drawGameBoard = function (canvas) {
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);
        x = canvas.width / 2;
        y = canvas.height - BALL_RADIAN;

        for (let c = 0; c < gameBoardColumnCount; c++) {
            gameBoardCells[c] = [];
            for (let r = 0; r < gameBoardRowCount; r++) {
                gameBoardCells[c][r] = {x: 0, y: 0, status: 1};
            }
        }
    }
    this.collisionDetection = function () {}
}


let Ball = function () {
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.ballRadian = BALL_RADIAN;
    this.ballSpeed = BALL_SPEED;

    this.move = function () {

    }
    this.changeDirection = function () {
    }

    this.drawBall = function () {
        ctx.beginPath();
        ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = "#7c7c7c";
        ctx.fill();
        ctx.closePath();
    }
}
let Paddle = function (width, xCoordinate) {
    this.width = width;
    this.height = PADDLE_HEIGHT;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = canvas.height - PADDLE_HEIGHT;

    this.move = function() {};
    this.moveLeft = function () {};
    this.moveRight = function () {};

    this.drawPaddle = function () {
        ctx.beginPath();
        ctx.rect(paddleX, this.yCoordinate, this.width, this.height);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();

    }
}
function drawGame() {
    let ball = new Ball(x, y, BALL_RADIAN, BALL_SPEED);
    let paddle = new Paddle(PADDLE_WIDTH,200);

    ctx.clearRect(0,0, canvas.width, canvas.height);
    ball.drawBall();
    ball.move();
    ball.changeDirection();

    paddle.drawPaddle(paddleX, PADDLE_WIDTH);
    paddle.move();

}
let gameBoard = new GameBoard(GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT);
gameBoard.drawGameBoard(canvas);
const interval = setInterval(drawGame, BALL_SPEED);
let score = setInterval(increaseScore, SCORE_INCREASING_SPEED);