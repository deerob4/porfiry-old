import React, { Component, PropTypes } from 'react';
import Button from 'components/Button';
import QuizAnswer from 'components/play/QuizAnswer';
import QuestionTimer from 'components/play/QuestionTimer';

class PlayQuiz extends Component {
  static propTypes = {
    answers: PropTypes.array.isRequired,
    colours: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    quizInfo: PropTypes.object.isRequired,
    selectAnswer: PropTypes.func.isRequired,
    timeLeft: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    // Used to prefix each answer.
    let letters = ['A', 'B', 'C', 'D'];
    let quizInfo = this.props.quizInfo;

    return (
      <div style={{ padding: '10px' }}>
        <h1 className="question-title" style={this.props.colours.text.primary}>
          {this.props.question.body}
        </h1>

        <h3 style={this.props.colours.text.secondary}>
        {`Question ${quizInfo.category.currentPosition}
          out of ${quizInfo.category.length}
          in the ${quizInfo.category.body} category •
          Question ${quizInfo.question.id + 1} out of ${quizInfo.totalQuestions} overall`}
        </h3>

        <QuestionTimer colours={this.props.colours.answer.body}
                       questionLength={quizInfo.questionLength}
                       timeLeft={this.props.timeLeft} />

        <ul>
          {this.props.answers.map((answer, i) =>
            <QuizAnswer key={i}
                        body={`${letters[i]}. ${answer.body}`}
                        colours={this.props.colours.select}
                        correct={answer.correct}
                        selectAnswer={this.props.selectAnswer.bind(this, i)} />
          )}
        </ul>
      </div>
    );
  }
}

export default PlayQuiz;
