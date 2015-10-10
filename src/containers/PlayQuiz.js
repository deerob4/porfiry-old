import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Play Quiz</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    colours: state.colours,
    user: state.user
  };
}

export default connect(
  mapStateToProps
)(PlayQuiz);
