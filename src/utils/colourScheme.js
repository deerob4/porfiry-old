import randomColour from 'randomcolor';
import luminance from 'utils/luminance';
import choice from 'utils/choice';

function colourScheme() {
  // Generate mainColour background colours for elements.
  let [
    mainColour,
    buttonBackground,
    selectBackground,
    answerBackground
  ] = randomColour({ hue: 'light', count: 4, hue: choice(['blue', 'orange', 'red', 'purple']) });

  let buttonBorder = luminance(buttonBackground, -0.2);
  let selectBorder = luminance(selectBackground, -0.2);
  let answerBorder = luminance(answerBackground, -0.2);

  return {
    button: {
      backgroundColor: buttonBackground,
      borderColor: buttonBorder,
      color: luminance(buttonBorder, -0.2)
    },
    select: {
      backgroundColor: selectBackground,
      borderColor: selectBorder,
      color: luminance(selectBorder, -0.2)
    },
    answer: {
      backgroundColor: answerBackground,
      borderColor: answerBorder,
      color: luminance(answerBorder, -0.2),
      icon: luminance(answerBackground, -0.4)
    },
    text: {
      primary: mainColour,
      secondary: luminance(mainColour, -0.1)
    }
  };
}

export default colourScheme;
