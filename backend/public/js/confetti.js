const confettiCanvas = document.getElementById("confettiCanvas");
const cCtx = confettiCanvas.getContext("2d");

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

class Confetti {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
    this.size = Math.random() * 8 + 4;
    this.speed = Math.random() * 3 + 2;
    this.color = `hsl(${Math.random()*360}, 100%, 60%)`;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
  }

  update() {
    this.y += this.speed;
    this.rotation += this.rotationSpeed;
    if(this.y > confettiCanvas.height) this.y = -this.size;
  }

  draw() {
    cCtx.save();
    cCtx.translate(this.x, this.y);
    cCtx.rotate(this.rotation * Math.PI / 180);
    cCtx.fillStyle = this.color;
    cCtx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
    cCtx.restore();
  }
}

let confettis = [];

function startConfetti(){
  confettis = [];
  for(let i=0;i<100;i++) confettis.push(new Confetti());
  let interval = setInterval(()=> {
    confettis.forEach(c => { c.update(); c.draw(); });
  }, 1000/60);
  setTimeout(()=> {
    clearInterval(interval);
  }, 3500);
}
