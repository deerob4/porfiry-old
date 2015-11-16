import React, { Component, PropTypes } from 'react';
import Button from 'components/Button';
import Select from 'components/Select';

class LoginForm extends Component {
  static propTypes = {
    changeHouse: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired,
    houses: PropTypes.array.isRequired,
    isQuizReady: PropTypes.bool.isRequired,
    loadQuiz: PropTypes.func.isRequired,
    newQuiz: PropTypes.func.isRequired,
    years: PropTypes.array.isRequired,
    quizzes: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);

    this.loadQuiz = this.loadQuiz.bind(this);

    this.state = {
      loginAnimation: '',
      loadQuizAnimation: '',
      showLoad: 'none'
    };
  }

  loadQuiz() {
    this.setState({ loginAnimation: 'animated bounceOutLeft' });
    this.setState({ showLoad: 'block' });
    this.setState({ loadQuizAnimation: 'animated bounceInRight' });
    this.props.loadQuiz();
  }

  deleteQuiz(id) {
    this.props.deleteQuiz(id);
  }

  render() {
    return (
      <div>
        <div className={`loginForm ${this.state.loginAnimation}`}>
          <div className="animated bounceInDown">
            <h1 className={`centre h1-${this.props.house}`}>
              Priory School Quiz
            </h1>
            <p className={`centre h1-${this.props.house}`}>
              Hello! Choose your house and year to get started!
            </p>
          </div>

          <form className="animated bounceInUp">
            <Select changeEvent={this.props.changeHouse}
                    customClass="hover"
                    house={this.props.house}
                    options={this.props.houses}
                    placeholder="I belong to..." />

            <Select changeEvent={this.props.changeYear}
                    customClass="hover"
                    house={this.props.house}
                    options={this.props.years}
                    placeholder="And I'm in year..."
                    prefix="Year" />

            {this.props.isQuizReady ?
              // If there is a quiz scheduled in the next 30 minutes, display a
              // button to join the room. Otherwise show button to create a quiz.
              <Button customClass="login-button"
                      text="Join the quiz!" /> :

              <ul>
                <Button customClass="login-button"
                        text="Create a new quiz!"
                        house={this.props.house}
                        clickEvent={this.props.newQuiz} />

                <Button customClass="login-button"
                        text="Load a quiz!"
                        house={this.props.house}
                        clickEvent={this.loadQuiz} />
              </ul>
            }
          </form>
        </div>

        <div style={{display: `${this.state.showLoad}`}} className={`loginForm ${this.state.loadQuizAnimation}`}>
          <h2 className={`centre h2-${this.props.house}`}>
              Choose a quiz to edit!
          </h2>
          <ul>
            {this.props.quizzes.map((quiz, i) => (
              <li onClick={this.deleteQuiz(quiz.id)} className={`quiz-title p-${this.props.house}`} key={i}>{quiz.title}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default LoginForm;
