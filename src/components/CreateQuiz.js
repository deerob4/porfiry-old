import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/lang/isEmpty';
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
    questions: PropTypes.array.isRequired
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

        <Heading house={this.props.house}
                 level="h2"
                 text={this.props.currentQuestion.body} />

        <div className="answer-group">
          {!isEmpty(this.props.currentQuestion) ?
            this.props.currentQuestion.answers.map((answer, i) =>
              <Answer answer={answer.body}
                      correct={answer.correct}
                      house={this.props.house}
                      letter={letters[i]}
                      key={answer.id} />
            ) : null
          }
        </div>

        <div className="button-group">
          <Button customClass="create-quiz-button"
                  text="Add a category"
                  house={this.props.house} />,

          <Button customClass="create-quiz-button"
                  text="Delete a category"
                  house={this.props.house} />,

          <Button customClass="create-quiz-button"
                  text="Add a question"
                  house={this.props.house} />,

          <Button customClass="create-quiz-button"
                  text="Delete a question"
                  house={this.props.house} />
        </div>
      </div>
    );
  }
}

export default CreateQuiz;
