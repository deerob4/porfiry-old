import colourScheme from 'utils/colourScheme';
import { CHANGE_COLOURS } from 'constants/actions';

function colours(state = colourScheme('blue'), action) {
  switch (action.type) {
    case CHANGE_COLOURS:
      return { ...action.colours };

    default:
      return state;
  }
}

export default colours;
