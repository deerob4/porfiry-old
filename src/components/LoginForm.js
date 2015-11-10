import React, { Component, PropTypes } from 'react';
import Button from 'components/Button';
import Select from 'components/Select';

class LoginForm extends Component {
  static propTypes = {
    changeHouse: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired,
    houses: PropTypes.array.isRequired,
    isQuizReady: PropTypes.bool.isRequired,
    years: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const style = { color: '#000' };
    console.log(this.props.isQuizReady);
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

            <Button customClass="login-button"
                    text="Create a quiz!"
                    house={this.props.house}
                    clickEvent={this.props.login} />
          }
        </form>
      </div>
    );
  }
}

export default LoginForm;