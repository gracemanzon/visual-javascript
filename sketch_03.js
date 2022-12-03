const canvasSketch = require("canvas-sketch");
import random from "canvas-sketch-util/random";

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};
// ^ animate: true is a function (bts function below)

// const animate = () => {
//   console.log("domestika");
//   requestAnimationFrame(animate);
//   // ^ browser window function with a parameter that to call on every frame (in this case the animate function)
// };
// animate();
// // ^ animate does something (console.logs domestika) then requests the next frame, which triggers the function again and so on and so over essentially creating an animation loop

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }
  // ^ for loop to populate the agents array above

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }
  // ^ give velocity property with x + y values (in this case they are random ranges to create different velocities for each instance of agent)

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
  }
  // ^ keep vectors "inside" the canvas boundaries

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}
