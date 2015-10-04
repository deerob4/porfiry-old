import randomColour from 'randomcolor';
import luminance from 'utils/luminance';

function colourScheme(luminosity, hue) {
  // Generate mainColour background colours for elements.
  let mainColour = randomColour({ luminosity, hue });

  if (hue === 'yellow') {
    mainColour = luminance(mainColour, -0.08);
  }

  const buttonBackground = luminance(mainColour, 0.3);
  const selectBackground = luminance(mainColour, 0.1);
  const answerBackground = luminance(mainColour, 0.2);

  return {
    button: {
      backgroundColor: buttonBackground,
      borderColor: luminance(buttonBackground, -0.2),
      color: luminance(buttonBackground, -0.2)
    },
    select: {
      backgroundColor: selectBackground,
      borderColor: luminance(selectBackground, -0.2),
      color: luminance(selectBackground, -0.2)
    },
    answer: {
      backgroundColor: answerBackground,
      borderColor: luminance(answerBackground, -0.2),
      color: luminance(answerBackground, -0.2),
      icon: luminance(answerBackground, -0.4)
    },
    text: {
      primary: mainColour,
      secondary: luminance(mainColour, -0.1)
    }
  };
}

export default colourScheme;
