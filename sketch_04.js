const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const columns = 16;
    const rows = 16;
    const cells = columns * rows;
    // ^ define grid specs

    const gridWidth = width * 0.8;
    const gridHeight = height * 0.8;
    // ^ define grid boundaries

    const cellWidth = gridWidth / columns;
    const cellHeight = gridHeight / rows;
    // ^ define cell specs

    const marginX = (width - gridWidth) * 0.5;
    const marginY = (height - gridHeight) * 0.5;
    // ^ define margins - difference between grid boundaries and canvas

    for (let i = 0; i < cells; i++) {
      const col = i % columns;
      const row = Math.floor(i / columns);

      const x = col * cellWidth;
      const y = row * cellHeight;
      const w = cellWidth * 0.8;
      const h = cellHeight * 0.8;

      const n = random.noise2D(x, y);
      // ^ generate random number equal to n and use to set the angle of rotation of the lines of the grid, noise2D retursn a numbers between -1 and 1, when mutltiples by Math.PI we get the equivalent of -180 degrees to 180 degrees
      const angle = n * Math.PI;

      context.save();
      context.translate(x, y);
      context.translate(marginX, marginY);
      context.translate(cellWidth * 0.5, cellHeight * 0.5);
      context.rotate(angle);

      context.lineWidth = 4;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
