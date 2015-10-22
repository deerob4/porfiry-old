import React, { Component, PropTypes } from 'react';
import Heading from 'components/Heading';
import Button from 'components/Button';
import Select from 'components/Select';
import Answer from 'components/Answer';

class CreateQuiz extends Component {
  static propTypes = {
    addCategory: PropTypes.func.isRequired,
    changeQuestion: PropTypes.func.isRequired,
    currentQuestion: PropTypes.object.isRequired,
    editCategory: PropTypes.func.isRequired,
    house: PropTypes.string.isRequired,
    markCorrect: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { correctAnswer: undefined };
  }

  render() {
    const letters = ['A', 'B', 'C', 'D'];

    return (
      <div>
        <Select changeEvent={this.props.changeQuestion}
                complex={true}
                customClass="select-full"
                house={this.props.house}
                options={this.props.questions}
                placeholder="Choose a question..." />

        <h2 className={`h2-${this.props.house}`}
            onClick={this.props.changeQuestion.bind(this, 0)}>
          {this.props.currentQuestion.body}
          <i className="fa fa-paw"></i>
        </h2>

        <div className="answer-group">
          {this.props.currentQuestion.answers.map((answer, i) =>
            <Answer answer={answer.body}
                    correct={answer.correct}
                    house={this.props.house}
                    id={answer.id}
                    markCorrect={this.props.markCorrect}
                    letter={letters[i]}
                    key={answer.id}
                    questionId={this.props.currentQuestion.id} />
            )
          }
        </div>

        <div className="button-group">
          <Button customClass="create-quiz-button"
                  text="Add a category"
                  house={this.props.house} />

          <Button customClass="create-quiz-button"
                  text="Delete a category"
                  house={this.props.house} />

          <Button customClass="create-quiz-button"
                  text="Add a question"
                  house={this.props.house} />

          <Button customClass="create-quiz-button"
                  text="Delete a question"
                  house={this.props.house} />
        </div>
      </div>
    );
  }
}

export default CreateQuiz;
