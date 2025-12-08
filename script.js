const board = document.querySelector('.board');
const boardHeight = 40;
const boardWidth = 40;

const rows = Math.floor(board.clientHeight / boardHeight);
const cols = Math.floor(board.clientWidth / boardWidth);

const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-over");

const highScoreElement = document.querySelector(".high-score");
const scoreElement = document.querySelector(".score");
const timeElement = document.querySelector(".time");

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = `00-00`;

highScoreElement.innerHTML = highScore;

const blocks = [];
let snake =[{
  x : 2 , y : 4
}, {
  x : 2 , y : 5
}, {
  x : 2 , y : 6
}];
let food = {x : Math.floor(Math.random()*rows) , y : Math.floor(Math.random()*cols)}
let direction = 'down';
let intervalId = null;
let timerIntervalId = null;


// for(let i=0; i< rows*cols; i++){
//   const block = document.createElement('div');
//   block.classList.add("block");
//   board.appendChild(block);
// }

//Creating Grid interface(Blocks).
for(let row=0; row<rows; row++){
  for(let col=0; col<cols; col++){
    const block = document.createElement('div');
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}

//Controlling Directions.
addEventListener("keydown", (event) => {
    if(event.key == "ArrowUp"){
      direction = 'up'
    }
    if(event.key == "ArrowDown"){
      direction = 'down'
    }
    if(event.key == "ArrowLeft"){
      direction = 'left'
    }
    if(event.key == "ArrowRight"){
      direction = 'right'
    }
});

function render() {
   let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  //left direction
  if(direction === 'left'){
    head = {x : snake[0].x , y : snake[0].y - 1};
  }
  //right direction
  else if(direction === 'right') {
    head = {x : snake[0].x , y : snake[0].y + 1};
  }
  //down direction
  else if(direction === 'down') {
    head = {x : snake[0].x + 1 , y : snake[0].y};
  }
  //up direction
  else if(direction === 'up') {
    head = {x : snake[0].x - 1 , y : snake[0].y};
  }

  //Wall Collision Condition
  if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
    clearInterval(intervalId);

    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverModal.style.display = "flex";

    return
  }

  //Checking, when snake eats the food --
  if(head.x == food.x && head.y == food.y){
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {x : Math.floor(Math.random()*rows) , y : Math.floor(Math.random()*cols)}
    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head);

    score += 10;
    scoreElement.innerHTML = score;

    if(score > highScore){
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
  }

  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  })

  snake.unshift(head);
  snake.pop();

  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  })
}

// intervalId = setInterval(() => {

//   render();
// },400);

startButton.addEventListener("click", () => {
  modal.style.display = ("none");
  intervalId = setInterval(() => {
    render();
  },300);

  timerIntervalId = setInterval(() => {
    let [min, sec] = time.split("-").map(Number);
    if(sec == 59) {
      min += 1;
      sec = 0;
    }
    else {
      sec ++;
    }
    time = `${min}-${sec}`;
    timeElement.innerHTML = time;
  },1000)
});

restartButton.addEventListener("click",restart);

function restart() {
  modal.style.display = "none";

  score = 0;
  time = `00-00`;
  scoreElement.innerHTML = score;
  timeElement.innerHTML = time;
  highScoreElement.innerHTML = highScore;

  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  })
  blocks[`${food.x}-${food.y}`].classList.remove("food");

  snake =[{
  x : 6 , y : 4
    }, {
  x : 6 , y : 5
    }, {
  x : 6 , y : 6
    }];
  food = {x : Math.floor(Math.random()*rows) , y : Math.floor(Math.random()*cols)}
  direction = 'down';
  intervalId = setInterval(() => {
    render();
  },300);
}
