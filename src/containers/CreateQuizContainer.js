import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/maker';
import findIndex from 'lodash/array/findIndex';
import find from 'lodash/collection/find';
import last from 'lodash/array/last';
import backgroundStyle from 'utils/backgroundStyle';
import constructQuiz from 'libs/constructQuiz';
import CreateQuiz from 'components/CreateQuiz';

class CreateQuizContainer extends Component {
  constructor(props) {
    super(props);

    this.addCategory = this.addCategory.bind(this);

    this.editAnswer = this.editAnswer.bind(this);

    this.addQuestion = this.addQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);

    this.changeQuestion = this.changeQuestion.bind(this);
    this.markCorrect = this.markCorrect.bind(this);
    this.finishQuiz = this.finishQuiz.bind(this);

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

  addQuestion(categoryId) {
    this.props.dispatch(actions.addQuestion(
      categoryId,
      `I\'m question ${this.props.quiz.questions.length + 1} - tap to edit me!`
    ));

    // The ID of the newly created question.
    let newId = last(this.props.quiz.questions).id + 1;
    // Generate four sample answers for the question.
    for (let i = 0; i <= 3; i++) {
      this.props.dispatch(actions.addAnswer(
        newId,
        'Tap to edit me!',
        i === 0 ? true : false // Set the first answer as correct.
      ));
    }
    // Switch the interface over to the new question.
    this.changeQuestion(newId);
  }

  deleteQuestion() {
    // Ensure they are not deleting the only question.
    if (this.props.quiz.questions.length > 1) {
      // The id of the question to be deleted.
      const deleteId = this.state.currentQuestion;
      // The index in the questions array of the question to be deleted.
      const deleteIndex = findIndex(this.props.quiz.questions, x => x.id === deleteId);

      // Create an array containing all the answers associated
      // with the question to be deleted and then delete them.
      this.props.quiz.answers.filter(x => x.questionId === deleteId)
          .map(x => this.props.dispatch(actions.deleteAnswer(x.id)));

      const nextQuestionIndex = findIndex(this.props.quiz.questions, x => x.id === deleteIndex - 1);
      const nextQuestionId = this.props.quiz.questions[nextQuestionIndex].id;

      // Update the view to the previous question.
      // this.changeQuestion(deleteIndex - 1);
      this.changeQuestion(nextQuestionId);

      // Delete the actual question entry.
      this.props.dispatch(actions.deleteQuestion(deleteId));
    }
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

  finishQuiz() {
    console.log(constructQuiz(this.props.quiz));
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
        <CreateQuiz addQuestion={this.addQuestion}
                    addCategory={this.addCategory}
                    categories={this.props.quiz.categories}
                    changeQuestion={this.changeQuestion}
                    currentQuestion={currentQuestion}
                    deleteQuestion={this.deleteQuestion}
                    editAnswer={this.editAnswer}
                    editCategory={this.editCategory}
                    editQuestion={this.editQuestion}
                    finishQuiz={this.finishQuiz}
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
