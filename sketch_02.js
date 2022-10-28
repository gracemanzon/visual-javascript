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

    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    // square
    context.save();
    context.translate(x, y);
    // context.rotate(0.3);
    // ^ computed in radians not degrees
    context.rotate(degToRad(45));
    // ^ rotating by degree after conversion in function degToRad

    context.beginPath();
    context.rect(-w * 0.5, -h * 0.5, w, h);
    context.fill();
    context.restore();
  };
};

canvasSketch(sketch, settings);
