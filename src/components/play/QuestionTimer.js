import React, { Component, PropTypes } from 'react';

class QuestionTimer extends Component {
  static propTypes = {
    colours: PropTypes.object.isRequired,
    duration: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { timeLeft: this.props.duration };
  }

  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  nextQuestion = () => {
    // Move to next
  }

  tick = () => {
    if (this.state.timeLeft) {
      this.setState({ timeLeft: this.state.timeLeft - 1000 });
    } else {
      this.nextQuestion();
    }
  }

  render() {
    return (
      <div style={this.props.colours} className="question-timer">
        {this.state.timeLeft / 1000}
      </div>
    );
  }
}

export default QuestionTimer;
