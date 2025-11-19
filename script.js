const board = document.querySelector('.board');
const boardHeight = 40;
const boardWidth = 40;

const blocks = [];
const snake =[{
  x : 2 , y : 4
}, {
  x : 2 , y : 5
}, {
  x : 2 , y : 6
}];
let direction = 'down';

const rows = Math.floor(board.clientHeight / boardHeight);
const cols = Math.floor(board.clientWidth / boardWidth);

// for(let i=0; i< rows*cols; i++){
//   const block = document.createElement('div');
//   block.classList.add("block");
//   board.appendChild(block);
// }

for(let row=0; row<rows; row++){
  for(let col=0; col<cols; col++){
    const block = document.createElement('div');
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  })
}

setInterval(() => {
  let head = null;

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

  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  })

  snake.unshift(head);
  snake.pop();

  render();
},400);


document.addEventListener("keydown", (event) => {
    console.log(event.key);
});

