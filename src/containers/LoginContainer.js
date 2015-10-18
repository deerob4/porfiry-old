import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from 'components/LoginForm';
import backgroundStyle from 'utils/backgroundStyle';
import { changeHouse, changeYear } from 'actions/login';

const houses = ['acton', 'baxter', 'clive', 'darwin', 'houseman', 'webb'];
const years = [7, 8, 9, 10, 11];

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      houseValidation: '',
      yearValidation: ''
    };

    this.changeHouse = this.changeHouse.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.isQuizReady = this.isQuizReady.bind(this);
  }

  changeYear(e) {
    const year = e.target.value;
    this.props.dispatch(changeYear(year));
  }

  changeHouse(e) {
    const house = e.target.value;
    this.props.dispatch(changeHouse(house));
  }

  validateLogin() {
    if (!this.props.user.house) {
      // Set the animation class to pass to component.
      this.setState({ houseValidation: 'animated shake' });
      // Remove the class so the animation can be replayed.
      setTimeout(() => this.setState({ houseValidation: '' }), 850);
    }

    if (!this.props.user.year) {
      // Set the animation class to pass to component.
      this.setState({ yearValidation: 'animated shake'});
      // Remove the class so the animation can be replayed.
      setTimeout(() => this.setState({ yearValidation: '' }), 850);
    }

    if (this.props.user.year && this.props.user.house) {
      // Transition to the quiz create section
      this.props.history.pushState('create', '/create');
    }
  }

  isQuizReady() {
    return false;
  }

  render() {
    return (
      <div style={backgroundStyle(this.props.user.house)}>
        <div className="container">
          <LoginForm changeHouse={this.changeHouse}
                     changeYear={this.changeYear}
                     validateLogin={this.validateLogin}
                     houseValidation={this.state.houseValidation}
                     yearValidation={this.state.yearValidation}
                     house={this.props.user.house}
                     isQuizReady={this.isQuizReady}
                     houses={houses}
                     years={years} />
        </div>
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
)(LoginContainer);
