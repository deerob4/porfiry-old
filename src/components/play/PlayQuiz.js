import React, { Component, PropTypes } from 'react';
import QuestionTimer from 'components/play/QuestionTimer';

class PlayQuiz extends Component {
  static propTypes = {
    colours: PropTypes.object.isRequired,
    currentQuestion: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div style={{ padding: '10px' }}>
        <h1 className="question-title" style={this.props.colours.text.primary}>
          {this.props.currentQuestion.title}
        </h1>

        <div>10</div>

        <QuestionTimer />

        {this.props.currentQuestion.answers.map(answer =>
          <div style={this.props.colours.answer.body} className="answer">{answer.body}</div>
        )}
      </div>
    );
  }
}

export default PlayQuiz;
