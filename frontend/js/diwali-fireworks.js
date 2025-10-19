const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Firework particle
class Particle {
  constructor(x, y, color, vx, vy) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 1;
    this.size = 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.01;
    this.vy += 0.02; // gravity
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// Firework
class Firework {
  constructor() {
    this.x = random(100, canvas.width - 100);
    this.y = canvas.height;
    this.targetY = random(100, canvas.height / 2);
    this.color = `hsl(${Math.floor(random(0, 360))}, 100%, 50%)`;
    this.exploded = false;
    this.particles = [];
    this.speed = random(6, 10);
  }

  update() {
    if (!this.exploded) {
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.explode();
        this.exploded = true;
      }
    }

    this.particles.forEach(p => p.update());
    this.particles = this.particles.filter(p => p.alpha > 0);
  }

  explode() {
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = random(2, 6);
      this.particles.push(new Particle(
        this.x,
        this.y,
        this.color,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed
      ));
    }
  }

  draw() {
    if (!this.exploded) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    this.particles.forEach(p => p.draw());
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }
}

const fireworks = [];

function animate() {
  ctx.fillStyle = "rgba(10,10,10,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.05) {
    fireworks.push(new Firework());
  }

  fireworks.forEach(fw => {
    fw.update();
    fw.draw();
  });

  // Remove finished fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    if (fireworks[i].done()) fireworks.splice(i, 1);
  }

  requestAnimationFrame(animate);
}

animate();
