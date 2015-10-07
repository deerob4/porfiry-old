import React, { Component, PropTypes } from 'react';
import HouseSelector from './HouseSelector';
import YearSelector from './YearSelector';
import Button from './Button';

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
    const style = { color: this.props.colours.text.secondary };

    return (
      <div className="loginForm">
        <div className="animated bounceInDown">
          <h1 style={style}>Priory School Quiz</h1>
          <p style={style}>Hello! Choose your house and year to get started!</p>
        </div>

        <form className="animated bounceInUp">
          <HouseSelector colours={this.props.colours.select}
                         changeHouse={this.props.changeHouse}
                         houseValidation={this.props.houseValidation}
                         houses={this.props.houses} />

          <br />

          <YearSelector colours={this.props.colours.select}
                        changeYear={this.props.changeYear}
                        yearValidation={this.props.yearValidation}
                        years={this.props.years} />
          <br />

          {this.props.isQuizReady() ?
            // If there is a quiz scheduled in the next 30 minutes, display a
            // button to join the room. Otherwise show button to create a quiz.
            <Button text="Join the quiz!"
                    colours={this.props.colours.button}  /> :

            <Button text="Create a quiz!"
                    colours={this.props.colours.button}
                    clickEvent={this.props.validateLogin} />
          }
        </form>
      </div>
    );
  }
}

export default LoginForm;
