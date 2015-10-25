import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/maker';
import find from 'lodash/collection/find';
import backgroundStyle from 'utils/backgroundStyle';
import CreateQuiz from 'components/CreateQuiz';

class CreateQuizContainer extends Component {
  constructor(props) {
    super(props);

    this.addCategory = this.addCategory.bind(this);
    this.editAnswer = this.editAnswer.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.markCorrect = this.markCorrect.bind(this);

    this.state = { currentQuestion: 0 };
  }

  addCategory(e) {
    const name = e.target.value;
    this.props.dispatch(actions.addCategory(name));
  }

  editCategory(e) {
    const id = e.target.value.id;
    const name = e.target.value.name;
    this.props.dispatch(actions.editCategory(id, name));
  }

  editQuestion(id, body) {
    this.props.dispatch(actions.editQuestion(id, body));
  }

  markCorrect(answerId, questionId, body, correct) {
    // Get the question that's currently marked as correct.
    const currentlyCorrect = find(this.props.quiz.answers,
      x => x.correct === true && x.questionId === questionId
    );

    // Ensure they don't try to mark the current answer.
    if (answerId !== currentlyCorrect.id) {
      // Update the state tree to make the currently correct answer incorrect, so that
      // only one answer at a time can be marked as correct.
      this.props.dispatch(actions.editAnswer(
        currentlyCorrect.id,
        currentlyCorrect.body,
        false
      ));
      // Update the state tree to mark the newly selected answer as correct.
      this.props.dispatch(actions.editAnswer(answerId, body, correct));
      // Update the container to state to cause a re-render of the interface.
      this.setState({ currentQuestion: questionId });
    }
  }

  editAnswer(id, body, correct) {
    console.log(body);
    this.props.dispatch(actions.editAnswer(
      id,
      body,
      correct
    ));
  }

  changeQuestion(e) {
    // Check if the question is being changed manually or
    // by an override, such as adding a new question.
    const id = typeof e === 'number' ? e : e.target.value;
    this.setState({ currentQuestion: parseInt(id) });
  }

  render() {
    const id = this.state.currentQuestion;

    const currentQuestion = {
      id,
      body: find(this.props.quiz.questions, x => x.id === id).body,
      answers: this.props.quiz.answers.filter(x => x.questionId === id)
    };

    return (
      <div style={backgroundStyle(this.props.user.house)}>
        <CreateQuiz addCategory={this.addCategory}
                    changeQuestion={this.changeQuestion}
                    currentQuestion={currentQuestion}
                    editAnswer={this.editAnswer}
                    editCategory={this.editCategory}
                    editQuestion={this.editQuestion}
                    house={this.props.user.house}
                    markCorrect={this.markCorrect}
                    questions={this.props.quiz.questions} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    quiz: state.quiz
  };
}

export default connect(
  mapStateToProps
)(CreateQuizContainer);
