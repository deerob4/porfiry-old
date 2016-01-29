import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as types from 'constants/actions';
import quizEvents from '../sockets/quizEvents';
import PlayQuiz from 'components/play/PlayQuiz';
import Countdown from 'components/play/Countdown';
import * as actions from 'actions/PlayQuizActions';

class PlayQuizContainer extends Component {
  componentDidMount() {
    quizEvents(this.props.dispatch, this.props.history);
  }

  selectAnswer = (answer) => {
    if (!this.props.currentQuiz.selectedAnswer) {
      const packet = {
        year: this.props.user.year,
        house: this.props.user.house,
        answer: ['A', 'B', 'C', 'D'][answer],
        questionId: this.props.currentQuiz.currentQuestion
      };

      this.props.dispatch(actions.selectAnswer(packet));
    }
  };

  render() {
    const questionId = this.props.currentQuiz.currentQuestion;
    const categoryId = this.props.currentQuiz.currentCategory;

    let quizInfo = {
      totalQuestions: this.props.quiz.questions.length,
      questionLength: this.props.quiz.settings.questionLength,
      category: {
        id: categoryId,
        body: this.props.quiz.categories[categoryId].body,
        currentPosition: this.props.quiz.questions
                         .filter(x => x.categoryId === categoryId)
                         .map(x => x.id)
                         .indexOf(questionId) + 1,
        length: this.props.quiz.questions.filter(x => x.categoryId === categoryId).length
      },
      question: {
        id: questionId
      }
    };

    return (
      this.props.currentQuiz.inProgress ?

      <PlayQuiz question={{...this.props.quiz.questions[questionId]}}
                answers={this.props.quiz.answers.filter(x => x.questionId === questionId)}
                colours={this.props.colours}
                quizInfo={quizInfo}
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
