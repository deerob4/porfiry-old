import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LoginForm from 'components/Login/LoginForm';

class Login extends Component {
  changeColours(e) {
    alert(e.value);
  }

  render() {
    const houses = ['Acton', 'Baxter', 'Clive', 'Darwin', 'Houseman', 'Webb'];
    const years = [7, 8, 9, 10, 11];

    return (
      <LoginForm changeColours={this.changeColours}
          houses={houses}
          years={years}
      />
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
)(Login);
