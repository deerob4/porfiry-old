import React, { Component, PropTypes } from 'react';
import * as actions from 'actions/CreatorActions';
import { connect } from 'react-redux';

import findIndex from 'lodash/array/findIndex';
import last from 'lodash/array/last';

import backgroundStyle from 'utils/backgroundStyle';
import constructQuiz from 'libs/constructQuiz';
import CreateQuiz from 'components/CreateQuiz';

const { notifSend } = notifActions;

import { Notifs, actions as notifActions } from 're-notif';
import 're-notif/lib/re-notif.css';

class CreateQuizContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { currentQuestion: 0 };
  }

  changeColours = () => {
    const hue = {
      acton: 'blue',
      baxter: 'orange',
      clive: 'green',
      darwin: 'purple',
      houseman: 'red',
      webb: 'yellow'
    }[this.props.user.house];

    this.props.dispatch(actions.changeColours(hue));
  }

  /**
   * Adds a new category to the quiz.
   */
  addCategory = () => {
    let categoryBody = prompt('Category name:');

    if (categoryBody.length) {
      this.props.dispatch(actions.addCategory(categoryBody));
      // Generate a first question for the category.
      this.addQuestion(this.props.quiz.categories.length);
    }
  }

  /**
   * Edits the name of a category.
   * @param  {Element} e Information on the category.
   */
  editCategory = (id) => {
    let currentBody = this.props.quiz.categories.find(x => x.id === id).body;
    let newBody = prompt('Enter a new category body:');

    if (newBody.length && newBody !== currentBody) {
      this.props.dispatch(actions.editCategory(id, newBody));
    }
  }

  /**
   * Deletes a category and all it's questions.
   * @param  {Number} id ID of category to delete.
   */
  deleteCategory = (id) => {
    // Get all the questions in the category.
    this.props.quiz.questions
      .filter(question => question.categoryId === id)
      .map(question => this.deleteQuestion(question.id));

    // Delete the actual category entry.
    this.props.dispatch(actions.deleteCategory(id));
  }

  /**
   * Adds a question to the quiz, into the currently
   * selected category.
   * @param {Number} categoryId The ID of the current category.
   */
  addQuestion = (categoryId) => {
    const categoryBody = this.props.quiz.categories.find(x => x.id === categoryId).body;

    this.props.dispatch(actions.addQuestion(
      categoryId,
      `New question in the ${categoryBody} category`
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

  /**
   * Deletes a question from the quiz.
   */
  deleteQuestion = () => {
    // Ensure they are not deleting the only question.
    if (this.props.quiz.questions.length > 1) {
      // The id of the question to be deleted.
      let deleteId = this.state.currentQuestion;
      // The index in the questions array of the question to be deleted.
      let deleteIndex = findIndex(this.props.quiz.questions, x => x.id === deleteId);

      // Create an array containing all the answers associated
      // with the question to be deleted and then delete them.
      this.props.quiz.answers
        .filter(x => x.questionId === deleteId)
        .map(x => this.props.dispatch(actions.deleteAnswer(x.id)));

      let nextQuestionIndex = findIndex(this.props.quiz.questions, x => x.id === deleteIndex - 1);
      let nextQuestionId = this.props.quiz.questions[nextQuestionIndex].id;

      // Update the view to the previous question.
      // this.changeQuestion(deleteIndex - 1);
      this.changeQuestion(nextQuestionId);

      // Delete the actual question entry.
      this.props.dispatch(actions.deleteQuestion(deleteId));
    }
  }

  /**
   * Edits a question's body.
   * @param  {Number} id   ID of the question to edit.
   * @param  {String} body New question body.
   */
  editQuestion = (id, body) => {
    this.props.dispatch(actions.editQuestion(id, body));
  }

  /**
   * Marks a possible quiz answer as correct.
   * @param  {Number} answerId   ID of the answer to make correct.
   * @param  {Number} questionId ID of the question the answer belongs to.
   * @param  {String} body       The body of the answer.
   * @param  {Boolean} correct   Whether the answer is correct.
   */
  markCorrect = (answerId, questionId, body, correct) => {
    // Get the question that's currently marked as correct.
    const currentlyCorrect = this.props.quiz.answers.find(x =>
      x.correct === true && x.questionId === questionId
    );

    // Ensure they don't try to mark the current answer.
    if (answerId !== currentlyCorrect.id) {
      // Update the state tree to make the currently correct answer incorrect.
      this.editAnswer(currentlyCorrect.id, currentlyCorrect.body, false);
      // Update the state tree to mark the newly selected answer as correct.
      this.editAnswer(answerId, body, correct);
      // Update the container to state to cause a re-render of the interface.
      this.setState({ currentQuestion: questionId });
    }
  }

  /**
   * Edits a question answer with new properties.
   * @param  {Number} id      ID of answer to edit/
   * @param  {String} body    New body of answer.
   * @param  {Bool} correct   New correct status of answer.
   */
  editAnswer = (id, body, correct) => {
    this.props.dispatch(actions.editAnswer(id, body, correct));
  }

  /**
   * Called whenever a new question needs to be displayed.
   * Updates the state containing the current question ID,
   * making the other components update to show the new question.
   * @param  {Number|String} e The ID of the new question.
   */
  changeQuestion = (e) => {
    // Check if the question is being changed manually or
    // by an override, such as adding a new question.
    const id = typeof e === 'number' ? e : e.target.value;
    this.setState({ currentQuestion: parseInt(id) });
  }

  finishQuiz = () => {
    let quiz = constructQuiz(this.props.quiz);
    this.props.dispatch(actions.saveOrUpdateQuiz(quiz));
  }

  leaveQuiz = () => {
    this.props.history.pushState('/', '/');
  }

  /**
   * Called whenever a quiz settings panel property is modified.
   * @param  {String} setting The setting that has been modified.
   * @param  {String|Numbe}r value   The new setting data.
   */
  saveSettings = (settings) => {
    // Loop through every setting key.
    for (let setting in settings) {
      // Get the value set in the settings panel.
      let value = settings[setting];
      // If they've made any changes compared to the value we have
      // stored in the state tree.
      if (value.length && value !== this.props.quiz.settings[setting]) {
        // Call the correct action to update the state.
        switch (setting) {
          case 'title':
            this.props.dispatch(actions.updateTitle(value));
            break;
          case 'startDate':
            this.props.dispatch(actions.updateStartDate(value));
            break;
          case 'startTime':
            this.props.dispatch(actions.updateStartTime(value));
            break;
          case 'questionLength':
            this.props.dispatch(actions.updateQuestionLength(parseInt(value * 1000)));
            break;
          case 'breakLength':
            this.props.dispatch(actions.updateBreakLength(parseInt(value * 60000)));
            break;
          default:
            return value;
        }
      }
    }

    this.props.dispatch(notifSend({
      message: 'Settings successfully updated!',
      kind: 'success',
      dismissAfter: 2000
    }));
  }

  render() {
    const id = this.state.currentQuestion;

    const currentQuestion = {
      id,
      body: this.props.quiz.questions.find(x => x.id === id).body,
      answers: this.props.quiz.answers.filter(x => x.questionId === id)
    };

    const notificationThemes = {
      defaultClasses: 'notification',
      successClasses: 'notification-success',
      dangerClasses: 'notification-danger'
    };

    return (
      <div style={backgroundStyle(this.props.user.house)}>
        <CreateQuiz addQuestion={this.addQuestion}
                    addCategory={this.addCategory}
                    categories={this.props.quiz.categories}
                    changeColours={this.changeColours}
                    changeQuestion={this.changeQuestion}
                    colours={this.props.colours}
                    currentQuestion={currentQuestion}
                    deleteQuestion={this.deleteQuestion}
                    deleteCategory={this.changeColours}
                    editAnswer={this.editAnswer}
                    editCategory={this.editCategory}
                    editQuestion={this.editQuestion}
                    saveSettings={this.saveSettings}
                    finishQuiz={this.finishQuiz}
                    house={this.props.user.house}
                    leaveQuiz={this.leaveQuiz}
                    markCorrect={this.markCorrect}
                    quizSettings={this.props.quiz.settings}
                    questions={this.props.quiz.questions} />
        <Notifs theme={notificationThemes} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    quiz: state.quiz,
    colours: state.colours
  };
}

export default connect(
  mapStateToProps,
)(CreateQuizContainer);
