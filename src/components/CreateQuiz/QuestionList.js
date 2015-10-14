import React, { Component, PropTypes } from 'react';

class QuestionList extends Component {
  static propTypes = {
    changeQuestion: PropTypes.func.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        body: PropTypes.string
      })
    )
  }

  render() {
    return (
      <select style={this.props.colours}
              className="select-create"
              onChange={this.props.changeQuestion}>

      <option value="" disabled selected>Select a question to edit...</option>

        {this.props.questions.map(question =>
          <option key={question.id}
                  value={question.body}>
                  {question.id}. {question.body}
          </option>
        )}

      </select>
    );
  }
}

export default QuestionList;
