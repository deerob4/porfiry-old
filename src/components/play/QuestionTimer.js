import React, { Component, PropTypes } from 'react';
import { SHOW_NEXT_QUESTION } from 'constants/actions';

class QuestionTimer extends Component {
  static propTypes = {
    colours: PropTypes.object.isRequired,
    questionLength: PropTypes.number.isRequired,
    timeLeft: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = { timeLeft: this.props.timeLeft };
  }

  componentWillReceiveProps(props) {
    const receivedTime = props.timeLeft;

    let count = receivedTime;

    let countdown = setInterval(() => {
      if (count <= receivedTime - 1000) clearInterval(countdown);
      this.setState({ timeLeft: count });
      count -= 10;
    }, 10);
  }

  render() {
    let width = (this.state.timeLeft / this.props.questionLength) * 100 + '%';

    return (
      <div className="question-timer"
           style={{ ...this.props.colours, width }}>
      </div>
    );
  }
}

export default QuestionTimer;
