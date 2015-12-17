import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as types from 'constants/actions';
import PlayQuiz from 'components/play/PlayQuiz';
import * as actions from 'actions/PlayQuizActions';

const socket = require('socket.io-client')('http://localhost:5000');

class PlayQuizContainer extends Component {
  componentDidMount() {
    const dispatch = this.props.dispatch;

    socket.on(types.ADD_PLAYER, (players) =>
      dispatch(actions.addPlayer(players))
    );

    socket.on(types.REMOVE_PLAYER, (socketId) =>
      dispatch(actions.removePlayer(socketId))
    );
  }

  showNextQuestion = () => {
    const nextQuestionId = this.props.currentQuiz.currentQuestion + 1;
    this.props.dispatch(actions.showNextQuestion(nextQuestionId));
  }

  render() {
    const question = {
      title: this.props.quiz.questions[this.props.currentQuiz.currentQuestion].body,
      answers: this.props.quiz.answers.filter(x =>
        x.questionId === this.props.quiz.questions[this.props.currentQuiz.currentQuestion].id
      )
    };

    return (
      <PlayQuiz colours={this.props.colours}
                currentQuestion={question}
                showNextQuestion={this.showNextQuestion} />
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
