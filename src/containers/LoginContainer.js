import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from 'components/LoginForm';
import backgroundStyle from 'utils/backgroundStyle';
import { changeHouse, changeYear } from 'actions/login';
import request from 'superagent';
import moment from 'moment';

const houses = ['acton', 'baxter', 'clive', 'darwin', 'houseman', 'webb'];
const years = [7, 8, 9, 10, 11];

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.changeHouse = this.changeHouse.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.isQuizReady = this.isQuizReady.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      isQuizReady: false
    };

    this.isQuizReady();
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
    request
      .get('/api/quizzes')
      .end((err, res) => {
        if (err) return err;
        // Select the first quiz.
        let quiz = JSON.parse(res.text)['quizzes'][0];
        // Create a moment object of the quizz's start date.
        let startDate = moment(quiz.startDate);
        // Work out the number of minutes till quiz is due to start.
        let minutesToStart = startDate.diff(moment(), 'minutes');
        // Check if quiz is within the next 35 minutes.
        let isQuizReady = minutesToStart >= -5 && minutesToStart < 30;

        this.setState({ isQuizReady });
      });
  }

  render() {
    request
      .get('/api/quizzes')
      .end((err, res) => {
        console.log(JSON.parse(res.text)['quizzes']);
      });

    return (
      <div style={backgroundStyle(this.props.user.house)}>
        <div className="container">
          <LoginForm changeHouse={this.changeHouse}
                     changeYear={this.changeYear}
                     house={this.props.user.house}
                     isQuizReady={this.state.isQuizReady}
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
