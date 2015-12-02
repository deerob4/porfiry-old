import { connect } from 'react-redux';
import React, { Component } from 'react';
import first from 'lodash/array/first';
import defaultQuiz from 'utils/defaultQuiz';
import backgroundStyle from 'utils/backgroundStyle';
import LoginForm from 'components/LoginForm';
import { joinQuiz } from 'actions/PlayQuizActions';
import LoadQuizPanel from 'components/LoadQuizPanel';
import {
  changeHouse,
  changeYear,
  loadQuiz,
  deleteQuiz,
  requestQuizzes,
  isQuizReady
} from 'actions/LoginActions';

const houses = ['acton', 'baxter', 'clive', 'darwin', 'houseman', 'webb'];
const years = [7, 8, 9, 10, 11, 12, 13];

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { panelIsOpen: false };
  }

  componentDidMount() {
    this.props.dispatch(isQuizReady());
    this.props.dispatch(joinQuiz(this.props.user));
  }

  changeYear = (e) => {
    this.props.dispatch(changeYear(e.target.value));
  }

  changeHouse = (e) => {
    this.props.dispatch(changeHouse(e.target.value));
  }

  newQuiz = () => {
    this.props.dispatch(loadQuiz(defaultQuiz, false));
    this.props.history.pushState('create', '/create');
  }

  deleteQuiz = (quizId) => {
    this.props.dispatch(deleteQuiz(quizId));
  }

  loadQuiz = (quizId) => {
    const quiz = this.props.user.quizzes.find(quiz => quiz._id === quizId);
    this.props.dispatch(loadQuiz(quiz));
    this.closeQuizSelect();
    this.props.history.pushState('create', '/create');
  }

  openQuizSelect = () => {
    this.props.dispatch(requestQuizzes());
    this.setState({ panelIsOpen: true });
  }

  closeQuizSelect = () => {
    this.setState({ panelIsOpen: false });
  }

  render() {
    return (
      <div style={backgroundStyle(this.props.user.house)}>
        <div className="container">
          <LoginForm changeHouse={this.changeHouse}
                     changeYear={this.changeYear}
                     colours={this.props.colours}
                     house={this.props.user.house}
                     quizIsReady={this.props.user.quizIsReady}
                     newQuiz={this.newQuiz}
                     openQuizSelect={this.openQuizSelect}
                     houses={houses}
                     years={years} />

          <LoadQuizPanel colours={this.props.colours}
                         panelIsOpen={this.state.panelIsOpen}
                         loadQuiz={this.loadQuiz}
                         deleteQuiz={this.deleteQuiz}
                         closePanel={this.closeQuizSelect}
                         requestingQuizzes={this.props.user.requestingQuizzes}
                         requestingQuizzesFailed={this.props.user.requestingQuizzesFailed}
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
