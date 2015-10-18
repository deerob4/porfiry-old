import React, { Component, PropTypes } from 'react';

class Answer extends Component {
  static propTypes = {
    answer: PropTypes.string.isRequired,
    correct: PropTypes.bool.isRequired,
    house: PropTypes.string.isRequired,
    letter: PropTypes.oneOf(
      ['A', 'B', 'C', 'D']
    ).isRequired
  }

  render() {
    const className = this.props.correct ?
      `answer ${this.props.house}-answer ${this.props.house}-correct-answer` :
      `answer ${this.props.house}-answer`;

    return (
      <div className={className}>
        <span className="letter">
          {this.props.letter}.
        </span>
        {this.props.answer}
      </div>
    );
  }
}

export default Answer;
