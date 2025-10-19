const heartsCanvas = document.getElementById("heartsCanvas");
const ctx = heartsCanvas.getContext("2d");

heartsCanvas.width = window.innerWidth;
heartsCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;
});

// Draw heart using canvas path
function drawHeart(ctx, x, y, size, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  ctx.bezierCurveTo(
    x, y,
    x - size / 2, y,
    x - size / 2, y + topCurveHeight
  );
  ctx.bezierCurveTo(
    x - size / 2, y + (size + topCurveHeight) / 2,
    x, y + (size + topCurveHeight) / 1.1,
    x, y + size
  );
  ctx.bezierCurveTo(
    x, y + (size + topCurveHeight) / 1.1,
    x + size / 2, y + (size + topCurveHeight) / 2,
    x + size / 2, y + topCurveHeight
  );
  ctx.bezierCurveTo(
    x + size / 2, y,
    x, y,
    x, y + topCurveHeight
  );
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

class Heart {
  constructor() {
    this.x = Math.random() * heartsCanvas.width;
    this.y = heartsCanvas.height + Math.random() * 100;
    this.size = Math.random() * 20 + 15; // heart size
    this.speed = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.5 + 0.5;
    this.color = `hsl(${Math.random()*360}, 100%, 70%)`;
  }

  draw() {
    drawHeart(ctx, this.x, this.y, this.size, this.color, this.alpha);
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.y * 0.01) * 2;
    if (this.y < -50) {
      this.y = heartsCanvas.height + 20;
      this.x = Math.random() * heartsCanvas.width;
    }
  }
}

const hearts = [];
for (let i = 0; i < 50; i++) hearts.push(new Heart());

function animate() {
  ctx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
  hearts.forEach(h => { h.update(); h.draw(); });
  requestAnimationFrame(animate);
}

animate();
