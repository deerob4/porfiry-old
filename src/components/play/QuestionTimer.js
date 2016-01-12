import React, { Component, PropTypes } from 'react';
import { SHOW_NEXT_QUESTION } from 'constants/actions';

const socket = require('socket.io-client')('http://localhost:5000');

class QuestionTimer extends Component {
  static propTypes = {
    colours: PropTypes.object.isRequired,
    questionLength: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { timeLeft: this.props.questionLength };
  }

  componentDidMount() {
    socket.on(SHOW_NEXT_QUESTION, () => this.tick());
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  tick = () => {
    this.setState({ timeLeft: this.props.questionLength });

    this.timer = setInterval(() => this.setState({
      timeLeft: this.state.timeLeft - 10
    }), 10);
  }

  render() {
    return (
      <div style={{ ...this.props.colours, width: this.state.timeLeft / 100 + '%' }} className="question-timer">
      </div>
    );
  }
}

export default QuestionTimer;
