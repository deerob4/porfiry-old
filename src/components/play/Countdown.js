import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class Countdown extends Component {
  static propTypes = {
    startTime: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = { timeLeft: moment().to(this.props.startTime) };
  }

  componentDidMount() {
    this.tick();
  }

  tick = () => {
    setInterval(() => this.setState({
      timeLeft: moment().to(this.props.startTime)
    }), 1000);
  }

  render() {
    return (
      <div className="countdown">
        <h1 style={this.props.colours.primary}>You're a bit early!</h1>
        <h2 style={this.props.colours.secondary}>The quiz will begin {this.state.timeLeft}...</h2>
      </div>
    );
  }
}

export default Countdown;
