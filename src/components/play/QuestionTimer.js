import React, { Component, PropTypes } from 'react';

class QuestionTimer extends Component {
  static propTypes = {
    duration: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      timeLeft: this.props.duration
    };
  }

  render() {
    return (
      <div>
        <h1 style={this.props.colours}>
          {this.props.title}
        </h1>
      </div>
    );
  }
}

export default QuestionTimer;
