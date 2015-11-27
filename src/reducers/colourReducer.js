import { CHANGE_COLOURS } from 'constants/actions';
import colourScheme from 'utils/colourScheme';

function colours(state = colourScheme(), action) {
  switch (action.type) {
    case CHANGE_COLOURS:
      console.log(action);
      return { ...colourScheme(action.hue) };

    default:
      return state;
  }
}

export default colours;
