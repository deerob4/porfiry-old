import randomColour from 'randomcolor';
import luminance from './luminance';
import tinyColour from 'tinycolor2';

function colourScheme(hue) {
  let houseColour = randomColour({ luminosity: 'light', hue });
  console.log(houseColour);
}

colourScheme('yellow');
