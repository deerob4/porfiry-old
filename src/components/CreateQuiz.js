import React, { Component, PropTypes } from 'react';
import findIndex from 'lodash/array/findIndex';
import QuizSettingsPanel from 'components/QuizSettingsPanel';
import EditableText from 'components/EditableText';
import Button from 'components/Button';
import Select from 'components/Select';
import Answer from 'components/Answer';

class CreateQuiz extends Component {
  static propTypes = {
    addCategory: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    changeQuestion: PropTypes.func.isRequired,
    currentQuestion: PropTypes.object.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    editAnswer: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
    finishQuiz: PropTypes.func.isRequired,
    house: PropTypes.string.isRequired,
    leaveQuiz: PropTypes.func.isRequired,
    markCorrect: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    quizSettings: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.openSettings = this.openSettings.bind(this);
    this.closeSettings = this.closeSettings.bind(this);

    this.editQuestion = this.editQuestion.bind(this);
    this.changeCategory = this.changeCategory.bind(this);

    this.state = {
      correctAnswer: undefined,
      currentCategory: 0,
      settingsAreOpen: false
    };
  }

  openSettings() {
    this.setState({ settingsAreOpen: true });
  }

  closeSettings() {
    this.setState({ settingsAreOpen: false });
  }

  changeCategory(e) {
    let categoryId = parseInt(e.target.value);

    this.setState({ currentCategory: categoryId });

    this.props.changeQuestion(this.props.questions.filter(x =>
      x.categoryId === categoryId
    )[0].id);
  }

  editQuestion(body) {
    this.props.editQuestion(
      this.props.currentQuestion.id,
      body
    );
  }

  render() {
    // Used to prefix each answer.
    let letters = ['A', 'B', 'C', 'D'];

    // The name of the current category.
    let currentCategoryName = this.props.categories.filter(x =>
      x.id === this.state.currentCategory
    )[0].body;

    // The length of the current category.
    let currentCategoryLength = this.props.questions.filter(x =>
      x.categoryId === this.state.currentCategory
    ).length;

    // The index of the current question in relation to the
    // current category.
    let currentQuestionIndex = findIndex(this.props.questions.filter(x =>
      x.categoryId === this.state.currentCategory
    ), question => question.id === this.props.currentQuestion.id) + 1;

    return (
      <div>
        <div className="select-group">
          <Select arrowClass="left-arrow"
                  changeEvent={this.changeCategory}
                  complex={true}
                  customClass="select-left select-half"
                  house={this.props.house}
                  innerClass="select-left select-half-parent"
                  indexes={false}
                  options={this.props.categories}
                  placeholder="Choose a category..."
                  selectedId={this.props.currentCategory}
                  suffix="questions" />

          <Select arrowClass="right-arrow"
                  changeEvent={this.props.changeQuestion}
                  complex={true}
                  customClass="select-right select-half"
                  house={this.props.house}
                  innerClass="select-right select-half-parent"
                  options={this.props.questions.filter(x =>
                    x.categoryId === this.state.currentCategory
                  )}
                  placeholder="Choose a question..."
                  selectedId={this.props.currentQuestion.id} />
        </div>

        <EditableText finishFunction={this.editQuestion}
                      house={this.props.house}
                      icon="pencil"
                      iconClass="question-pencil"
                      inputClass="question-input"
                      text={this.props.currentQuestion.body}
                      textType="h2" />

        <h3 className={`h3-${this.props.house}`}>
          {`Question ${currentQuestionIndex} out of ${currentCategoryLength} in the ${currentCategoryName} category
          • Question ${this.props.currentQuestion.id + 1} out of ${this.props.questions.length} in total`}
        </h3>

        <ul>
          {this.props.currentQuestion.answers.map((answer, i) =>
            <Answer answer={answer.body}
                    correct={answer.correct}
                    editAnswer={this.props.editAnswer}
                    house={this.props.house}
                    id={answer.id}
                    markCorrect={this.props.markCorrect}
                    letter={letters[i]}
                    key={answer.id}
                    questionId={this.props.currentQuestion.id} />
            )
          }
        </ul>

        <ul className="button-group">
          <Button clickEvent={this.props.addQuestion.bind(this, this.state.currentCategory)}
                  customClass="create-quiz-button"
                  text="Add a question"
                  icon="plus"
                  house={this.props.house} />

          <Button clickEvent={this.props.deleteQuestion}
                  customClass="create-quiz-button"
                  text="Delete question"
                  icon="trash"
                  house={this.props.house} />

          <Button clickEvent={this.props.addCategory}
                  customClass="create-quiz-button"
                  text="Add a category"
                  icon="plus"
                  house={this.props.house} />

          <Button clickEvent={this.props.deleteCategory.bind(this, this.state.currentCategory)}
                  customClass="create-quiz-button"
                  text="Delete category"
                  icon="trash"
                  house={this.props.house} />

          <Button clickEvent={this.props.editCategory.bind(this, this.state.currentCategory)}
                  customClass="create-quiz-button"
                  text="Rename category"
                  icon="recycle"
                  house={this.props.house} />

          <Button clickEvent={this.openSettings}
                  customClass="create-quiz-button"
                  text="Quiz settings"
                  icon="cog"
                  house={this.props.house} />

          <Button clickEvent={this.props.finishQuiz}
                  customClass="create-quiz-button"
                  text="Save quiz"
                  icon="graduation-cap"
                  house={this.props.house} />

          <Button clickEvent={this.props.leaveQuiz}
                  customClass="create-quiz-button"
                  text="Leave editor"
                  icon="sign-out"
                  house={this.props.house} />
        </ul>


        <QuizSettingsPanel closeSettings={this.closeSettings}
                           currentSettings={this.props.quizSettings}
                           editSettings={this.props.editSettings}
                           house={this.props.house}
                           saveSettings={this.props.saveSettings}
                           settingsAreOpen={this.state.settingsAreOpen} />

      </div>
    );
  }
}

export default CreateQuiz;
