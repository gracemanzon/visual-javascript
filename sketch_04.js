const canvasSketch = require("canvas-sketch");

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

      context.save();
      context.translate(x, y);
      context.translate(marginX, marginY);
      context.translate(cellWidth * 0.5, cellHeight * 0.5);

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
