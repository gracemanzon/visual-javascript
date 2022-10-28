const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const degToRad = (degrees) => {
  return (degrees / 180) * Math.PI;
};
// ^ function to convert degrees to radians

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
      const slice = degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      // ^ "opens up" the circle by setting the starting x and y coords to the sin and cosin of the circle

      // square
      context.save();
      context.translate(x, y);
      context.rotate(-angle);

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
