import React, { Component, PropTypes } from 'react';
import Button from 'components/Button';
import Select from 'components/Select';

class LoginForm extends Component {
  static propTypes = {
    changeHouse: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired,
    houses: PropTypes.array.isRequired,
    isQuizReady: PropTypes.bool.isRequired,
    newQuiz: PropTypes.func.isRequired,
    years: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="loginForm">
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
                  colours={this.props.colours.select}
                  house={this.props.house}
                  options={this.props.houses}
                  placeholder="I belong to..." />

          <Select changeEvent={this.props.changeYear}
                  customClass="hover"
                  colours={this.props.colours.select}
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
                      colours={this.props.colours.button}
                      text="Create a new quiz!"
                      house={this.props.house}
                      clickEvent={this.props.newQuiz} />

              <Button customClass="login-button"
                      colours={this.props.colours.button}
                      text="Load a quiz!"
                      house={this.props.house}
                      clickEvent={this.props.openQuizSelect} />
            </ul>
          }
        </form>
      </div>
    );
  }
}

export default LoginForm;
