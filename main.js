function keyPressed(keyCode) {
  switch (keyCode) {
    case 49: // Key 1
      slowGrid();
      console.log("SlowGrid loaded!");
      break;
    case 51: // Key 3
      rotatingSlowCircle();
      console.log("Rotating slow circle");
      break;
    case 53: // Key 5
      voronoi();
      console.log("Voronoi loaded!");
      break;
    case 55: // Key 7
      bassGrid();
      console.log("BassGrid loaded!");
      break;
    case 57: // Key 9
      bassGrid2();
      console.log("BassGrid2 loaded!");
      break;
    default:
      console.log(keyCode + "Invalid");
      break;
  }
}

function slowGrid() {
  hydra
    .osc(20, 0.03, 1.7)
    .kaleid()
    .mult(osc(20, 0.001, 0).rotate(1.58))
    .blend(o0, 0.94)
    .modulateScale(osc(10, 0), -0.03)
    .scale(0.8, () => 1.05 + 0.1 * Math.sin(0.05 * time))
    .out(o0);
}

function rotatingSlowCircle() {
  speed = 1.2;
  hydra
    .shape(99, 0.15, 0.5)
    .color(0, 1, 2)

    .diff(
      shape(240, 0.5, 0)
        .scrollX(0.05)
        .rotate(() => time / 10)
        .color(1, 0, 0.75)
    )
    .diff(
      shape(99, 0.4, 0.002)
        .scrollX(0.1)
        .rotate(() => time / 20)
        .color(1, 0, 0.75)
    )
    .diff(
      shape(99, 0.3, 0.002)
        .scrollX(0.15)
        .rotate(() => time / 30)
        .color(1, 0, 0.75)
    )
    .diff(
      shape(99, 0.2, 0.002)
        .scrollX(0.2)
        .rotate(() => time / 40)
        .color(1, 0, 0.75)
    )
    .diff(
      shape(99, 0.1, 0.002)
        .scrollX(0.25)
        .rotate(() => time / 50)
        .color(1, 0, 0.75)
    )

    .modulateScale(
      shape(240, 0.5, 0)
        .scrollX(0.05)
        .rotate(() => time / 10),
      () => Math.sin(time / 3) * 0.2 + 0.2
    )

    .scale(1.6, 0.6, 1)
    .out();
}

function voronoi() {
  hydra
    .voronoi(2, 0.3, 0.2)
    .shift(0.5)
    .modulatePixelate(voronoi(4, 0.2), 32, 2)
    .scale(() => 1 + Math.sin(time * 2.5) * 0.05)
    .diff(voronoi(3).shift(0.6))
    .diff(osc(2, 0.15, 1.1).rotate())
    .brightness(0.1)
    .contrast(1.2)
    .saturate(1.2)
    .out();
  speed = 0.8;
}

function bassGrid() {
  function r(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
  }
  hydra
    .solid(1, 1, 1)
    .diff(
      shape([4, 4, 4, 24].smooth().fast(0.5), r(0.6, 0.93), 0.09).repeat(20, 10)
    )
    .modulateScale(osc(8).rotate(r(-0.5, 0.5)), 0.52)
    .add(
      src(o0)
        .scale(0.965)
        .rotate(0.012 * Math.round(r(-2, 1)))
        .color(r(), r(), r())
        .modulateRotate(o0, r(0, 0.5))
        .brightness(0.15),
      0.7
    );
}

function bassGrid2() {
  function r(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
  }

  hydra
    .solid(1, 1, 1)
    .diff(
      shape([4, 4, 4, 24].smooth().fast(0.5), r(0.6, 0.93), 0.09).repeat(20, 10)
    )
    .modulateScale(osc(8).rotate(r(-0.5, 0.5)), 0.52)
    .add(
      src(o0)
        .scale(0.965)
        .rotate(0.012 * Math.round(r(-2, 1)))
        .color(r(), r(), r())
        .modulateRotate(o0, r(0, 0.5))
        .brightness(0.15),
      0.7
    )
    .out();
}

/////////LISTENERS///////////:
document.addEventListener("keydown", function (event) {
  keyPressed(event.key);
});
