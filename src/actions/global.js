import * as types from 'constants/GlobalActions';

export function changeHouse(house) {
  return { type: types.CHANGE_HOUSE, house };
}

export function changeColours(colours) {
  return { type: types.CHANGE_COLOURS, colours };
}
