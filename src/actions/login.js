import * as types from 'constants/LoginActions';

export function changeHouse(house) {
  return { type: types.CHANGE_HOUSE, house };
}

export function changeYear(year) {
  return { type: types.CHANGE_YEAR, year };
}

export function changeColours(colours) {
  return { type: types.CHANGE_COLOURS, colours };
}
