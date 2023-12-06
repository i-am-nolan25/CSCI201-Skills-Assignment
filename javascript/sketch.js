let video;
let asciiDiv;
let fontSizeSlider;
let isPaused = false;
let pauseButton;
let charSetIndex = 0;

const charSet = "Ñ@#W$9876543210?!abc;:+=-,._                    ";

function setup() {
  noCanvas();

  // Video capture
  video = createCapture(VIDEO);
  video.size(80, 45);
  video.hide(); // Hide the video element

  // ASCII codes
  asciiDiv = createDiv();

  // Font size slider
  fontSizeSlider = createSlider(10, 18, 14);
  fontSizeSlider.id('font-size-slider');

  // Pause button
  pauseButton = createButton('Pause');
  pauseButton.mousePressed(togglePause);
  pauseButton.id('pause-button');
}

function draw() {
  if (!isPaused) {
    video.loadPixels();
    video.updatePixels();
  }

  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = charSet.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = charSet.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);

  const fontSize = fontSizeSlider.value();
  asciiDiv.style('font-size', fontSize + 'pt');

}

function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    pauseButton.html('Play');
  } else {
    pauseButton.html('Pause');
  }
}
