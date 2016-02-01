import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import invert from 'lodash/object/invert';
import capitalize from 'lodash/string/capitalize';
import ResultsChart from 'components/results/ResultsChart';

class ResultsContainer extends Component {
  render() {
    const housePoints = this.props.currentQuiz.answerStatistics;
    // Convert the object to an array, then map over to get an array of
    // the house scores. Then calculate get the max from these scores.
    const highestScore = Math.max(...Object.keys(housePoints).map(x => housePoints[x]));
    // Use the highestScore to get the actual winning house.
    const winningHouse = capitalize(invert(housePoints)[highestScore]);

    console.log(housePoints);

    return (
      <div>
        <h1>{winningHouse} is the winner!</h1>
        <ResultsChart housePoints={housePoints} />
        <pre>{JSON.stringify(this.props.currentQuiz.answerStatistics)}</pre>
      </div>
    );
  }
}

function mapPropsToState(state) {
  return {
    user: state.user,
    quiz: state.quiz,
    colours: state.colours,
    currentQuiz: state.currentQuiz
  };
}

export default connect(
  mapPropsToState
)(ResultsContainer);
