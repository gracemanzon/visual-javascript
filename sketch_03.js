const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

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

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);
        // ^ 6. get distance between agent.pos and other.pos

        if (dist > 200) {
          continue;
        }
        // ^ 7. if distance between agent and other is greater than 200 then do not execute the remainder of the code in the loop, just continue to the next iteration

        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);
        // ^ 9. set line width based on distance (range from 0 to 200 when distance is 0 the width should be 12, when distance is 200 the width should be 1)

        context.beginPath();
        // ^ 1. create new path
        context.moveTo(agent.pos.x, agent.pos.y);
        // ^ 2. move the "pen" to the beginning of the path
        context.lineTo(other.pos.x, other.pos.y);
        // ^ 3. determine the end point for the line
        context.stroke();
        // ^ 4. with let j = 0; -> since there are 40 agents there are 1600 iterations on each frame (40x40), the loop is checking 0 to 0, 1 to 1, etc. so there is technically double lines on top of each other, the computer can do it but it's really unneccesary. by changing to let j = i + 1; the iterations are reduced to 780 and increases performance
      }
    }
    // ^ nested loop that iterates over every other agent for each agent

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

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  // ^ 5. getDistance method
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
