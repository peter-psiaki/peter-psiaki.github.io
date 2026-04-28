const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const cols = canvas.width / gridSize;
const rows = canvas.height / gridSize;

let snake, dir, nextDir, food, score;

function init() {
  snake = [{ x: 10, y: 10 }];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  food = spawnFood();
  score = 0;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && dir.y === 0) nextDir = { x: 0, y: -1 };
  if (e.key === "ArrowDown" && dir.y === 0) nextDir = { x: 0, y: 1 };
  if (e.key === "ArrowLeft" && dir.x === 0) nextDir = { x: -1, y: 0 };
  if (e.key === "ArrowRight" && dir.x === 0) nextDir = { x: 1, y: 0 };
});

function loop() {
  update();
  draw();
}

function update() {
  dir = nextDir;

  const head = {
    x: snake[0].x + dir.x,
    y: snake[0].y + dir.y
  };

  // wall collision
  if (head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows) {
    init();
    return;
  }

  // self collision
  for (let s of snake) {
    if (s.x === head.x && s.y === head.y) {
      init();
      return;
    }
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = spawnFood();
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // snake
  ctx.fillStyle = "lime";
  for (let s of snake) {
    ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize - 2, gridSize - 2);
  }

  // score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
  };
}

// start game
init();
setInterval(loop, 100);