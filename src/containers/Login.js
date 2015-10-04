import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);

    this.getLength = this.getLength.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.state = { name: '' };
  }

  handleInput(e) {
    this.setState({ name: e.target.value });
  }

  getLength() {
    alert(this.state.name.length);
  }

  render() {
    return (
      <div>
        <h1>How long is your name?</h1>
        <input onChange={this.handleInput} placeholder="My name is..." />
        <button onClick={this.getLength}>Name length</button>
        <Link to="/play">Take me to your leader</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz
  };
}

export default connect(
  mapStateToProps
)(App);
