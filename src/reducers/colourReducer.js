import { CHANGE_COLOURS } from 'constants/actions';
import colourScheme from 'utils/colourScheme';

function colours(state = colourScheme(), action) {
  switch (action.type) {
    case CHANGE_COLOURS:
      return { ...colourScheme() };

    default:
      return state;
  }
}

export default colours;
