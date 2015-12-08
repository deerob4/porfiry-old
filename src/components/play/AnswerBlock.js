import React, { Component, PropTypes } from 'react';

class AnswerBlock extends Component {
  static propTypes = {
    chooseAnswer: PropTypes.func.isRequired,
    colours: PropTypes.object.isRequired,

  }

  constructor(props) {
    super(props);

    this.state = {
      timeLeft: this.props.duration
    };
  }

  render() {
    return (
      <div>
        <h1 style={this.props.colours}>
          {this.props.title}
        </h1>
      </div>
    );
  }
}

export default AnswerBlock;
