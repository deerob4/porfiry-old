import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/maker';
import backgroundStyle from 'utils/backgroundStyle';
import CreateQuiz from 'components/CreateQuiz';

class CreateQuizContainer extends Component {
  constructor(props) {
    super(props);

    this.constructQuestion = this.constructQuestion.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.markCorrect = this.markCorrect.bind(this);

    this.state = {
      currentQuestion: {}
    };
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

  markCorrect(id, questionId, body, correct) {
    this.props.dispatch(actions.editAnswer(id, questionId, body, correct));
    this.constructQuestion(questionId);
  }

  constructQuestion(id) {
    // Constructs an object containing all the information
    // about a question, making it easier to pass to
    // child components.
    this.setState({
      currentQuestion: {
        id,
        body: this.props.quiz.questions.filter(
          question => question.id === id
        )[0].body,
        answers: this.props.quiz.answers.filter(
          answer => answer.questionId === id
        )
      }
    });
  }

  changeQuestion(e) {
    const id = parseInt(e.target.value);
    this.constructQuestion(id);
  }

  render() {
    return (
      <div style={backgroundStyle(this.props.user.house)}>
        <CreateQuiz addCategory={this.addCategory}
                    changeQuestion={this.changeQuestion}
                    currentQuestion={this.state.currentQuestion}
                    editCategory={this.editCategory}
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
