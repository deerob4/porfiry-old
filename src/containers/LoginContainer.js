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

    this.changeHouse = this.changeHouse.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.isQuizReady = this.isQuizReady.bind(this);
    this.login = this.login.bind(this);
  }

  changeYear(e) {
    const year = e.target.value;
    this.props.dispatch(changeYear(year));
  }

  changeHouse(e) {
    const house = e.target.value;
    this.props.dispatch(changeHouse(house));
  }

  login() {
    this.props.history.pushState('create', '/create');
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
                     house={this.props.user.house}
                     isQuizReady={this.isQuizReady}
                     login={this.login}
                     houses={houses}
                     years={years} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(
  mapStateToProps
)(LoginContainer);
