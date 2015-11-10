import React, { Component, PropTypes } from 'react';
import EditableText from 'components/EditableText';

class Answer extends Component {
  static propTypes = {
    answer: PropTypes.string.isRequired,
    correct: PropTypes.bool.isRequired,
    editAnswer: PropTypes.func.isRequired,
    house: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    letter: PropTypes.oneOf(
      ['A', 'B', 'C', 'D']
    ).isRequired,
    markCorrect: PropTypes.func.isRequired,
    questionId: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.editAnswer = this.editAnswer.bind(this);
  }

  editAnswer(body) {
    this.props.editAnswer(
      this.props.id,
      body,
      this.props.correct
    );
  }

  render() {
    const className = this.props.correct ?
      `answer ${this.props.house}-answer ${this.props.house}-correct-answer` :
      `answer ${this.props.house}-answer`;

    const checkClass = this.props.correct ?
      `answer-check ${this.props.house}-correct-answer-check` :
      `answer-check`;

    return (
        <li className={className}>
          <span className="letter">
            {this.props.letter}.
          </span>

          <EditableText finishFunction={this.editAnswer}
                        house={this.props.house}
                        inputClass="answer-input"
                        text={this.props.answer}
                        textType="span" />

          <span className={checkClass}
                onClick={this.props.markCorrect.bind(
                         this,
                         parseInt(this.props.id),
                         parseInt(this.props.questionId),
                         this.props.answer,
                         !this.props.correct)}>
                <i className="fa fa-check-circle"></i>
          </span>
        </li>
    );
  }
}

export default Answer;
