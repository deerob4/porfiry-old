import React, { Component, PropTypes } from 'react';
import Button from 'components/Button';
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
          <Button customClass="answer-block"
                  colours={this.props.colours.button}
                  text={answer.body} />
        )}
      </div>
    );
  }
}

export default PlayQuiz;
