const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  // ^ allow animation and use the frame property to start
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
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

      const n = random.noise2D(x + frame * 12, y, 0.001);
      // ^ generate random number equal to n and use to set the angle of rotation of the lines of the grid, noise2D retursn a numbers between -1 and 1, when mutltiples by Math.PI we get the equivalent of -180 degrees to 180 degrees. the third value is a frequency value, the 4th possible value is amplitude (frequency = mulitples the coordinates by that value, amplitude = multiples the output result by that value, doing so here would change possible range for n to -0.2 to 0.2, altneratively the angle could be multiple by 0.2)
      const angle = n * Math.PI * 0.2;
      // const scale = ((n + 1) / 2) * 30;
      // ^ noise can also be used to affect the scale, the basic arithmetic is performed to map the range to 0 to 1 so that there are not negative values for the size of the lines, alternatively we can use canvas-sketch mapRange function
      const scale = math.mapRange(n, -1, 1, 1, 30);

      context.save();
      context.translate(x, y);
      context.translate(marginX, marginY);
      context.translate(cellWidth * 0.5, cellHeight * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
