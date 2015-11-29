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

  editAnswer = (body) => {
    this.props.editAnswer(
      this.props.id,
      body,
      this.props.correct
    );
  }

  render() {
    return (
        <li style={this.props.colours.body} className="answer">
          <span className="letter">
            {this.props.letter}.
          </span>

          <EditableText finishFunction={this.editAnswer}
                        house={this.props.house}
                        inputClass="answer-input"
                        text={this.props.answer}
                        textType="span" />

          <span className="answer-check"
                style={this.props.correct ? this.props.colours.check : null}
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
