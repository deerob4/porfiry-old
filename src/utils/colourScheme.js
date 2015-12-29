import randomColour from 'randomcolor';
import luminance from './luminance';
import tinyColour from 'tinycolor2';

function colourScheme(hue) {
  let houseColour = randomColour({ luminosity: 'light', hue });
  let complement = tinyColour(houseColour).complement().toHexString();
  let lightComplement = luminance(houseColour, 0.2);

  let scheme = {
    answer: {
      body: {
        backgroundColor: complement,
        borderColor: luminance(complement, -0.2),
        color: luminance(complement, -0.4)
      },
      check: {
        color: luminance(complement, -0.6)
      }
    },
    select: {
      backgroundColor: houseColour,
      borderColor: luminance(houseColour, -0.2),
      color: luminance(houseColour, -0.4)
    },
    button: {
      backgroundColor: lightComplement,
      borderColor: luminance(lightComplement, -0.2),
      color: luminance(lightComplement, -0.4)
    },
    text: {
      primary: { color: luminance(houseColour, -0.15) },
      secondary: { color: luminance(houseColour, -0.1) }
    },
    settings: {
      borderColour: luminance(complement, -0.2),
      label: {
        color: luminance(complement, -0.2)
      }
    }
  };

  return scheme;
}

export default colourScheme;
