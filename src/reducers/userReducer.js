import * as types from 'constants/actions';

let defaultState = {
  house: 'acton',
  year: 7,
  quizzes: [],
  quizIsReady: false,
  requestingQuizzes: false,
  requestingQuizzesFailed: false
};

function user(state = defaultState, action) {
  switch (action.type) {
    case types.CHANGE_HOUSE:
      return { ...state, house: action.house };

    case types.CHANGE_YEAR:
      return { ...state, year: action.year };

    case types.REQUEST_QUIZZES:
      return {
        ...state,
        requestingQuizzes: true,
        requestingQuizzesFailed: false
      };

    case types.REQUEST_QUIZZES_FAILURE:
      return {
        ...state,
        requestingQuizzes: false,
        requestingQuizzesFailed: true
      };

    case types.RECEIVE_QUIZZES:
      return {
        ...state,
        quizzes: action.quizzes,
        requestingQuizzes: false
      };

    case types.DELETE_QUIZ_SUCCESS:
      return {
        ...state,
        quizzes: state.quizzes.filter(quiz =>
          quiz._id !== action.id
        )
      };

    case types.QUIZ_IS_READY:
      return { ...state, quizIsReady: action.quizIsReady };

    default:
      return state;
  }
}

export default user;
