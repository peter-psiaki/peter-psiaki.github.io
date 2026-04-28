const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// grid settings
const gridSize = 20;
const tileCountX = canvas.width / gridSize;
const tileCountY = canvas.height / gridSize;

// snake
let snake = [
  { x: 10, y: 10 }
];

let velocity = { x: 1, y: 0 };
let nextVelocity = { x: 1, y: 0 };

// food
let food = spawnFood();

// score
let score = 0;

// controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && velocity.y === 0) nextVelocity = { x: 0, y: -1 };
  if (e.key === "ArrowDown" && velocity.y === 0) nextVelocity = { x: 0, y: 1 };
  if (e.key === "ArrowLeft" && velocity.x === 0) nextVelocity = { x: -1, y: 0 };
  if (e.key === "ArrowRight" && velocity.x === 0) nextVelocity = { x: 1, y: 0 };
});

// game loop speed (ms)
setInterval(gameLoop, 100);

function gameLoop() {
  update();
  draw();
}

function update() {
  velocity = nextVelocity;

  const head = {
    x: snake[0].x + velocity.x,
    y: snake[0].y + velocity.y
  };

  // wall collision
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= tileCountX ||
    head.y >= tileCountY
  ) {
    resetGame();
    return;
  }

  // self collision
  for (let segment of snake) {
    if (segment.x === head.x && segment.y === head.y) {
      resetGame();
      return;
    }
  }

  snake.unshift(head);

  // eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = spawnFood();
  } else {
    snake.pop();
  }
}

function draw() {
  // background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // snake
  ctx.fillStyle = "lime";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(
      snake[i].x * gridSize,
      snake[i].y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  }

  // score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * tileCountX),
    y: Math.floor(Math.random() * tileCountY)
  };
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  velocity = { x: 1, y: 0 };
  nextVelocity = { x: 1, y: 0 };
  food = spawnFood();
  score = 0;
}