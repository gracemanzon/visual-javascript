const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const columns = 4;
    const rows = 3;
    const cells = columns * rows;
    // ^ define grid specs

    const gridWidth = width * 0.8;
    const gridHeight = height * 0.8;
    // ^ define grid boundaries

    const cellWidth = width / columns;
    const cellHeight = height / rows;
    // ^ define cell specs

    const marginX = (width - gridWidth) * 0.5;
    const marginY = (height - gridHeight) * 0.5;
    // ^ define margins - difference between grid boundaries and canvas
  };
};

canvasSketch(sketch, settings);
