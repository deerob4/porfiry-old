import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as types from 'constants/actions';
import quizEvents from '../sockets/quizEvents';
import PlayQuiz from 'components/play/PlayQuiz';
import Countdown from 'components/play/Countdown';
import * as actions from 'actions/PlayQuizActions';

const socket = require('socket.io-client')(`http://localhost:5000`);

class PlayQuizContainer extends Component {
  componentDidMount() {
    quizEvents(this.props.dispatch, this.props.history);
  }

  selectAnswer = (answer) => {
    const packet = {
      year: this.props.user.year,
      house: this.props.user.house,
      answer: ['A', 'B', 'C', 'D'][answer],
      questionId: this.props.currentQuiz.currentQuestion
    };

    this.props.dispatch(actions.selectAnswer(packet));
  };

  render() {
    const currentQuestion = {
      ...this.props.quiz.questions[this.props.currentQuiz.currentQuestion],
      answers: this.props.quiz.answers.filter(x =>
        x.questionId === this.props.quiz.questions[this.props.currentQuiz.currentQuestion].id
      )
    };

    return (
      this.props.currentQuiz.inProgress ?

      <PlayQuiz colours={this.props.colours}
                currentQuestion={currentQuestion}
                answerStatistics={this.props.currentQuiz.answerStatistics}
                questionLength={this.props.quiz.settings.questionLength}
                timeLeft={this.props.currentQuiz.timeLeft}
                selectAnswer={this.selectAnswer} /> :

      <Countdown startTime={this.props.quiz.settings.startTime} colours={this.props.colours.text} />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    quiz: state.quiz,
    colours: state.colours,
    currentQuiz: state.currentQuiz
  };
}

export default connect(
  mapStateToProps
)(PlayQuizContainer);
