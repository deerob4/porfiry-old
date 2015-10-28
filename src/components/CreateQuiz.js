import React, { Component, PropTypes } from 'react';
import EditableText from 'components/EditableText';
import Button from 'components/Button';
import Select from 'components/Select';
import Answer from 'components/Answer';
// import Modal from 'react-modal';

class CreateQuiz extends Component {
  static propTypes = {
    addCategory: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    changeQuestion: PropTypes.func.isRequired,
    currentQuestion: PropTypes.object.isRequired,
    editAnswer: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
    finishQuiz: PropTypes.func.finishQuiz,
    house: PropTypes.string.isRequired,
    markCorrect: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired
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
    const categoryId = parseInt(e.target.value);
    this.setState({ currentCategory: categoryId });
    this.props.changeQuestion(this.props.questions.filter(x => x.categoryId === categoryId)[0].id);
  }

  editQuestion(body) {
    this.props.editQuestion(
      this.props.currentQuestion.id,
      body
    );
  }

  render() {
    const letters = ['A', 'B', 'C', 'D'];

    const customStyles = {
      overlay: {
        backgroundColor: 'rgba(175, 226, 250, 0.65)'
      },
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        border: '3px solid #6eaac6',
        backgroundColor: '#a1ddf9',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        '-webkit-box-shadow': '1px 8px 41px 3px rgba(110,170,198,1)'
      }
    };

    const currentCategoryName = this.props.categories.filter(x => x.id === this.state.currentCategory)[0].body;
    const currentCategoryLength = this.props.questions.filter(x => x.id === this.state.currentCategory).length;

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
                  suffix="questions" />

          <Select arrowClass="right-arrow"
                  changeEvent={this.props.changeQuestion}
                  complex={true}
                  customClass="select-right select-half"
                  house={this.props.house}
                  innerClass="select-right select-half-parent"
                  options={this.props.questions.filter(x => x.categoryId === this.state.currentCategory)}
                  placeholder="Choose a question..." />
        </div>

        <EditableText finishFunction={this.editQuestion}
                      house={this.props.house}
                      icon="pencil"
                      iconClass="question-pencil"
                      inputClass="question-input"
                      text={this.props.currentQuestion.body}
                      textType="h2" />

        <h3 className={`h3-${this.props.house}`}>
          {`Question 1 out of ${currentCategoryLength} in the ${currentCategoryName} category
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

        <div className="button-group">
          <Button clickEvent={this.props.addQuestion.bind(this, this.state.currentCategory)}
                  customClass="create-quiz-button"
                  text="Add a question"
                  house={this.props.house} />

          <Button clickEvent={this.props.deleteQuestion}
                  customClass="create-quiz-button"
                  text="Delete a question"
                  house={this.props.house} />

          <Button clickEvent={this.openSettings}
                  customClass="create-quiz-button"
                  text="Quiz settings"
                  icon="cog"
                  house={this.props.house} />

          <Button clickEvent={this.props.finishQuiz}
                  customClass="create-quiz-button"
                  text="Finish quiz"
                  icon="graduation-cap"
                  house={this.props.house} />
        </div>


      </div>
    );
  }
}

export default CreateQuiz;
// <Modal isOpen={this.state.settingsAreOpen}
//                onRequestClose={this.closeSettings}
//                style={customStyles}>

//                <h2>Quiz Settings</h2>
//                <p>Modify the quiz's settings in this panel.</p>

//                <input type="text" placeholder="Quiz title" />
//         </Modal>
