const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5; // center of circle
    const cy = height * 0.5; // center of circle

    const w = width * 0.01;
    const h = height * 0.1;
    let x, y; // declare with let to modify inside of loop

    const num = 12;
    const radius = width * 0.3; // radius of the invisible circle that the rectangles will center around

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      // ^ "opens up" the circle by setting the starting x and y coords to the sin and cosin of the circle

      // square
      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.5, 3), 1);
      // ^ uses randomRange function to produce rectangles with varying scale (x(min, max), y)

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
