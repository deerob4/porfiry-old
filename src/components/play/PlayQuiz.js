import React, { Component, PropTypes } from 'react';
import Button from 'components/Button';
import QuestionTimer from 'components/play/QuestionTimer';

class PlayQuiz extends Component {
  static propTypes = {
    colours: PropTypes.object.isRequired,
    currentQuestion: PropTypes.object.isRequired,
    selectAnswer: PropTypes.func.isRequired,
    timeLeft: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    // Used to prefix each answer.
    let letters = ['A', 'B', 'C', 'D'];

    return (
      <div style={{ padding: '10px' }}>
        <h1 className="question-title" style={this.props.colours.primary}>
          {this.props.currentQuestion.title}
        </h1>

        <QuestionTimer colours={this.props.colours.answer.body}
                       timeLeft={this.props.timeLeft} />

        {this.props.currentQuestion.answers.map((answer, i) =>
          <Button key={i}
                  clickEvent={this.props.selectAnswer.bind(this, i)}
                  customClass="answer-block quiz-answer"
                  colours={this.props.colours.button}
                  text={`${letters[i]}. ${answer.body}`} />
        )}
      </div>
    );
  }
}

export default PlayQuiz;
