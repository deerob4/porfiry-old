import randomColour from 'randomcolor';
import luminance from 'utils/luminance';

function colourScheme(luminosity, hue) {
  console.log(hue);

  // Generate main background colours for elements.
  const [
    buttonBackground,
    selectBackground,
    answerBackground,
    primaryText
  ] = randomColour({ luminosity, hue, count: 4 });

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
      primary: primaryText,
      secondary: luminance(primaryText, -0.2)
    }
  };
}

export default colourScheme;
