import React, { Component, PropTypes } from 'react';
import Button from 'components/Button';
import QuestionTimer from 'components/play/QuestionTimer';

class PlayQuiz extends Component {
  static propTypes = {
    answerStatistics: PropTypes.object.isRequired,
    colours: PropTypes.object.isRequired,
    currentQuestion: PropTypes.object.isRequired,
    players: PropTypes.array.isRequired,
    timeLeft: PropTypes.number.isRequired,
    selectAnswer: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    // Used to prefix each answer.
    let letters = ['A', 'B', 'C', 'D'];

    return (
      <div style={{ padding: '10px' }}>
        <h1 className="question-title" style={this.props.colours.text.primary}>
          {this.props.currentQuestion.body}
        </h1>

        <h3 style={this.props.colours.text.secondary}>Question 4 out of 5 in the History category</h3>

        <QuestionTimer colours={this.props.colours.answer.body}
                       timeLeft={this.props.timeLeft} />

        <ul>
          {this.props.currentQuestion.answers.map((answer, i) =>
            <Button key={i}
                    clickEvent={this.props.selectAnswer.bind(this, i)}
                    customClass="answer quiz-answer"
                    colours={this.props.colours.button}
                    text={`${letters[i]}. ${answer.body}`} />
          )}
        </ul>

        <ul style={{width: '100%'}}>
          {this.props.players.map((player, i) =>
            <li key={i} style={{display: 'inline-block'}}>{i}&nbsp;</li>
          )}
        </ul>

      </div>
        // <pre>{JSON.stringify(this.props.answerStatistics)}</pre>
    );
  }
}

export default PlayQuiz;
