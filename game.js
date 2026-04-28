const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function update() {
  // game logic here
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // drawing here
  ctx.fillStyle = "white";
  ctx.fillRect(50, 50, 50, 50);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();