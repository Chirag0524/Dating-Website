const heartsCanvas = document.getElementById("heartsCanvas");
const hCtx = heartsCanvas.getContext("2d");

heartsCanvas.width = window.innerWidth;
heartsCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;
});

class Heart {
  constructor() {
    this.x = Math.random() * heartsCanvas.width;
    this.y = heartsCanvas.height + Math.random() * 100;
    this.size = Math.random() * 15 + 10;
    this.speed = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.5 + 0.5;
    this.color = `hsl(${Math.random()*360}, 100%, 70%)`;
  }

  draw() {
    hCtx.save();
    hCtx.globalAlpha = this.alpha;
    hCtx.fillStyle = this.color;
    const x = this.x;
    const y = this.y;
    const size = this.size;
    const topCurveHeight = size * 0.3;

    hCtx.beginPath();
    hCtx.moveTo(x, y + topCurveHeight);
    hCtx.bezierCurveTo(
      x, y,
      x - size / 2, y,
      x - size / 2, y + topCurveHeight
    );
    hCtx.bezierCurveTo(
      x - size / 2, y + (size + topCurveHeight) / 2,
      x, y + (size + topCurveHeight) / 1.1,
      x, y + size
    );
    hCtx.bezierCurveTo(
      x, y + (size + topCurveHeight) / 1.1,
      x + size / 2, y + (size + topCurveHeight) / 2,
      x + size / 2, y + topCurveHeight
    );
    hCtx.bezierCurveTo(
      x + size / 2, y,
      x, y,
      x, y + topCurveHeight
    );
    hCtx.closePath();
    hCtx.fill();
    hCtx.restore();
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.y * 0.01) * 2;
    if(this.y < -50){
      this.y = heartsCanvas.height + 20;
      this.x = Math.random() * heartsCanvas.width;
    }
  }
}

const hearts = [];
for(let i=0;i<50;i++) hearts.push(new Heart());

function animateHearts(){
  hCtx.clearRect(0,0,heartsCanvas.width,heartsCanvas.height);
  hearts.forEach(h => { h.update(); h.draw(); });
  requestAnimationFrame(animateHearts);
}
animateHearts();
