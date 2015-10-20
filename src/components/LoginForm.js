import React, { Component, PropTypes } from 'react';
import Button from 'components/Button';
import Select from 'components/Select';

class LoginForm extends Component {
  static propTypes = {
    changeHouse: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired,
    houseValidation: PropTypes.string.isRequired,
    houses: PropTypes.array.isRequired,
    isQuizReady: PropTypes.func.isRequired,
    validateLogin: PropTypes.func.isRequired,
    yearValidation: PropTypes.string.isRequired,
    years: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const style = { color: '#000' };

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
                  customClass={`hover ${this.props.houseValidation}`}
                  house={this.props.house}
                  options={this.props.houses}
                  placeholder="I belong to..." />

          <Select changeEvent={this.props.changeYear}
                  customClass={`hover ${this.props.yearValidation}`}
                  house={this.props.house}
                  options={this.props.years}
                  placeholder="And I'm in year..."
                  prefix="Year" />

          {this.props.isQuizReady() ?
            // If there is a quiz scheduled in the next 30 minutes, display a
            // button to join the room. Otherwise show button to create a quiz.
            <Button customClass="login-button"
                    text="Join the quiz!" /> :

            <Button customClass="login-button"
                    text="Create a quiz!"
                    house={this.props.house}
                    clickEvent={this.props.validateLogin} />
          }
        </form>
      </div>
    );
  }
}

export default LoginForm;
