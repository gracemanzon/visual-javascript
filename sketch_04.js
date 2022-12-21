const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const Tweakpane = require("tweakpane");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  // ^ allow animation and use the frame property to start
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
};
// ^ create object for pane defaults

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const columns = params.cols;
    const rows = params.rows;
    const cells = columns * rows;
    // ^ define grid specs
    // ^^ update columns and rows to use params from the pane

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

      // const n = random.noise2D(x + frame * 12, y, 0.001);
      // // ^ generate random number equal to n and use to set the angle of rotation of the lines of the grid, noise2D retursn a numbers between -1 and 1, when mutltiples by Math.PI we get the equivalent of -180 degrees to 180 degrees. the third value is a frequency value, the 4th possible value is amplitude (frequency = mulitples the coordinates by that value, amplitude = multiples the output result by that value, doing so here would change possible range for n to -0.2 to 0.2, altneratively the angle could be multiple by 0.2)
      // const angle = n * Math.PI * 0.2;
      // // const scale = ((n + 1) / 2) * 30;
      // // ^ noise can also be used to affect the scale, the basic arithmetic is performed to map the range to 0 to 1 so that there are not negative values for the size of the lines, alternatively we can use canvas-sketch mapRange function
      const n = random.noise2D(x + frame * 12, y, params.freq);
      const angle = n * Math.PI * params.amp;
      // ^^ replace frequency and amplitude values with params from pane
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);
      // ^^ replace values for scale minimum and maximum with the params from pane

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

const createPane = () => {
  const pane = new Tweakpane.Pane();
  // ^ create empty pane
  let folder;
  // ^ UI component for pane
  folder = pane.addFolder({ title: "Grid " });
  folder.addInput(params, "cols", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "rows", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "scaleMin", { min: 1, max: 100 });
  folder.addInput(params, "scaleMax", { min: 1, max: 100 });
  // ^ create objects from parameters for folder and objects determining the range for each object

  folder = pane.addFolder({ title: "Noise " });
  folder.addInput(params, "freq", { min: -0.01, max: 0.01 });
  folder.addInput(params, "amp", { min: 0, max: 1 });
};

createPane();

canvasSketch(sketch, settings);
