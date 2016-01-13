import React, { Component, PropTypes } from 'react';
import { SHOW_NEXT_QUESTION } from 'constants/actions';

class QuestionTimer extends Component {
  static propTypes = {
    colours: PropTypes.object.isRequired,
    timeLeft: PropTypes.number.isRequired
  }

  render() {
    return (
      <div style={{ ...this.props.colours, width: this.props.timeLeft / 100 + '%' }} className="question-timer">
        {this.props.timeLeft}
      </div>
    );
  }
}

export default QuestionTimer;
