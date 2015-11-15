import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from 'components/LoginForm';
import backgroundStyle from 'utils/backgroundStyle';
import { changeHouse, changeYear, fetchQuizzes } from 'actions/LoginActions';
import request from 'superagent';
import first from 'lodash/array/first';
import moment from 'moment';

const houses = ['acton', 'baxter', 'clive', 'darwin', 'houseman', 'webb'];
const years = [7, 8, 9, 10, 11];

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.changeHouse = this.changeHouse.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.isQuizReady = this.isQuizReady.bind(this);
    this.newQuiz = this.newQuiz.bind(this);
    this.loadQuiz = this.loadQuiz.bind(this);

    this.state = {
      isQuizReady: false,
      animating: ''
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

  newQuiz() {
    this.props.history.pushState('create', '/create');
  }

  loadQuiz() {
    this.props.dispatch(fetchQuizzes());
    // this.setState({ animating: 'animated bounceOutLeft' });
  }

  isQuizReady() {
    request
      .get('/api/quizzes')
      .end((err, res) => {
        if (err) return err;
        // Select the first quiz.
        let quiz = first(JSON.parse(res.text)['quizzes']);
        // Create a moment object of the quizz's start date.
        let startDate = moment(quiz.startDate);
        // Work out the number of minutes till quiz is due to start.
        let minutesToStart = startDate.diff(moment(), 'minutes');
        // Check if quiz is within the next 35 minutes.
        let isQuizReady = minutesToStart >= -5 && minutesToStart < 30;

        this.setState({ isQuizReady: false });
      });
  }

  render() {
    return (
      <div style={backgroundStyle(this.props.user.house)}>
        <div className="container">
          <LoginForm changeHouse={this.changeHouse}
                     changeYear={this.changeYear}
                     house={this.props.user.house}
                     isQuizReady={this.state.isQuizReady}
                     loadQuiz={this.loadQuiz}
                     newQuiz={this.newQuiz}
                     houses={houses}
                     quizzes={this.props.user.quizzes}
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
