import React, { Component, PropTypes } from 'react';
import Button from 'components/Button';
import Select from 'components/Select';

class LoginForm extends Component {
  static propTypes = {
    changeHouse: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired,
    houses: PropTypes.array.isRequired,
    newQuiz: PropTypes.func.isRequired,
    playQuiz: PropTypes.func.isRequired,
    quizIsReady: PropTypes.bool.isRequired,
    years: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="loginForm">
        <div className="animated bounceInDown">
          <h1 style={this.props.colours.text.primary} className="centre">
            Priory School Quiz
          </h1>
          <p style={this.props.colours.text.secondary} className="centre">
            Hello! Choose your house and year to get started!
          </p>
        </div>

        <form className="animated bounceInUp">
          <Select changeEvent={this.props.changeHouse}
                  customClass="hover"
                  colours={this.props.colours.select}
                  options={this.props.houses}
                  placeholder="I belong to..."
                  size="full" />

          <Select changeEvent={this.props.changeYear}
                  customClass="hover"
                  colours={this.props.colours.select}
                  options={this.props.years}
                  placeholder="And I'm in year..."
                  prefix="Year"
                  size="full" />

          {this.props.quizIsReady ?
            // If there is a quiz scheduled in the next 30 minutes, display a
            // button to join the room. Otherwise show button to create a quiz.
            <Button colours={this.props.colours.button}
                    customClass="login-button join-quiz-button"
                    text="Join the quiz!"
                    clickEvent={this.props.playQuiz} /> :

            <ul>
              <Button customClass="login-button"
                      colours={this.props.colours.button}
                      text="Create a new quiz!"
                      clickEvent={this.props.newQuiz} />

              <Button customClass="login-button"
                      colours={this.props.colours.button}
                      text="Load a quiz!"
                      clickEvent={this.props.openQuizSelect} />
            </ul>
          }
        </form>
      </div>
    );
  }
}

export default LoginForm;
