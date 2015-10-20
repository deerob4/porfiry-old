import React, { Component, PropTypes } from 'react';

class Answer extends Component {
  static propTypes = {
    answer: PropTypes.string.isRequired,
    correct: PropTypes.bool.isRequired,
    house: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    letter: PropTypes.oneOf(
      ['A', 'B', 'C', 'D']
    ).isRequired,
    markCorrect: PropTypes.func.isRequired,
    questionId: PropTypes.number.isRequired
  }

  render() {
    const className = this.props.correct ?
      `answer ${this.props.house}-answer ${this.props.house}-correct-answer` :
      `answer ${this.props.house}-answer`;

    const checkClass = this.props.correct ?
      `answer-check ${this.props.house}-correct-answer-check` :
      `answer-check`;

    return (
      <div className={className}>
        <span className="letter">
          {this.props.letter}.
        </span>
        {this.props.answer}
        <span className={checkClass}
              onClick={this.props.markCorrect.bind(
                this,
                parseInt(this.props.id),
                parseInt(this.props.questionId),
                this.props.answer,
                !this.props.correct
              )}>
          <i className="fa fa-check-circle"></i>
        </span>
      </div>
    );
  }
}

export default Answer;
