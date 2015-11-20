import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from 'components/LoginForm';
import backgroundStyle from 'utils/backgroundStyle';
import { changeHouse, changeYear, fetchQuizzes, deleteQuiz } from 'actions/LoginActions';
import request from 'superagent';
import first from 'lodash/array/first';
import moment from 'moment';
import QuizSelectPanel from 'components/QuizSelectPanel';

const houses = ['acton', 'baxter', 'clive', 'darwin', 'houseman', 'webb'];
const years = [7, 8, 9, 10, 11];

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.loadQuiz = this.loadQuiz.bind(this);
    this.deleteQuiz = this.deleteQuiz.bind(this);

    this.changeHouse = this.changeHouse.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.isQuizReady = this.isQuizReady.bind(this);
    this.newQuiz = this.newQuiz.bind(this);
    this.openQuizSelect = this.openQuizSelect.bind(this);
    this.closeQuizSelect = this.closeQuizSelect.bind(this);

    this.state = {
      isQuizReady: false,
      panelIsOpen: false
    };

    this.isQuizReady();
  }

  changeYear(e) {
    this.props.dispatch(changeYear(e.target.value));
  }

  changeHouse(e) {
    this.props.dispatch(changeHouse(e.target.value));
  }

  newQuiz() {
    this.props.history.pushState('create', '/create');
  }

  deleteQuiz(quizId) {
    this.props.dispatch(deleteQuiz(quizId));
  }

  loadQuiz(quizId) {
    console.log(quizId);
  }

  openQuizSelect() {
    this.props.dispatch(fetchQuizzes());

    this.setState({
      panelIsOpen: true
    });
  }

  closeQuizSelect() {
    this.setState({
      panelIsOpen: false
    });
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
                     colours={this.props.colours}
                     house={this.props.user.house}
                     isQuizReady={this.state.isQuizReady}
                     newQuiz={this.newQuiz}
                     openQuizSelect={this.openQuizSelect}
                     houses={houses}
                     years={years} />

          <QuizSelectPanel house={this.props.user.house}
                           panelIsOpen={this.state.panelIsOpen}
                           loadQuiz={this.loadQuiz}
                           deleteQuiz={this.deleteQuiz}
                           closePanel={this.closeQuizSelect}
                           quizzes={this.props.user.quizzes} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    colours: state.colours
  };
}

export default connect(
  mapStateToProps
)(LoginContainer);
