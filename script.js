const board = document.querySelector('.board');
const boardHeight = 30;
const boardWidth = 30;

const cols = Math.floor(board.clientHeight / boardHeight);
const rows = Math.floor(board.clientWidth / boardWidth);

for(let i=0; i< rows*cols; i++){
  const block = document.createElement('div');
  block.classList.add("block");
  board.appendChild(block);
}