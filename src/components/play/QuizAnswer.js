import React, { Component, PropTypes } from 'react';
import Button from 'components/Button';

class QuizAnswer extends Component {
  static propTypes = {
    body: PropTypes.string.isRequired,
    colours: PropTypes.object.isRequired,
    correct: PropTypes.bool.isRequired,
    selectAnswer: PropTypes.func.isRequired,
    showIfCorrect: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = { selected: false };
  }

  selectAnswer = () => {
    this.setState({ selected: true });
    this.props.selectAnswer();
  };

  render() {
    let x;

    if (this.state.selected && this.props.correct) {
      x = 'Yes, congratulations!';
    } else if (this.state.selected && !this.props.correct) {
      x = 'Nej, undskyld.';
    }

    return (
      <li style={this.props.colours}
          className="answer-block"
          onClick={this.selectAnswer}>
        {this.props.body}
      </li>
    );
          // A. What's the story in Balamory?
  }
}

export default QuizAnswer;
