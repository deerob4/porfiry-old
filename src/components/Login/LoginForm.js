import React, { Component, PropTypes } from 'react';
import HouseSelector from './HouseSelector';
import YearSelector from './YearSelector';
import Button from './Button';

class LoginForm extends Component {
  static propTypes = {
    changeHouse: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired,
    houses: PropTypes.array.isRequired,
    isQuizReady: PropTypes.func.isRequired,
    loadCreator: PropTypes.func.isRequired,
    years: PropTypes.array.isRequired,
    houseValidation: PropTypes.string.isRequired,
    yearValidation: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const primary = { color: this.props.colours.text.primary };
    const secondary = { color: this.props.colours.text.secondary };

    return (
      <div className="loginForm">
        <div className="animated bounceInDown">
          <h1 style={secondary}>Priory School Quiz</h1>
          <p style={secondary}>Hello! Choose your house and year to get started!</p>
        </div>
        <p>{this.props.validationClass}</p>
        <form className="animated bounceInUp">
          <HouseSelector colours={this.props.colours.select}
                         validation={this.props.houseValidation}
                         changeHouse={this.props.changeHouse}
                         houses={this.props.houses} />
          <br />
          <YearSelector colours={this.props.colours.select}
                        validation={this.props.yearValidation}
                        changeYear={this.props.changeYear}
                        years={this.props.years} />
          <br />
          {this.props.isQuizReady() ?
            // If there is a quiz scheduled in the next 30 minutes, display a
            // button to join the room. Otherwise show button to create a quiz.
            <Button colours={this.props.colours.button} text="Join the quiz!" /> :
            <Button colours={this.props.colours.button}
                    buttonFunction={this.props.loadCreator}
                    text="Create a quiz!"/>
          }
        </form>
      </div>
    );
  }
}

export default LoginForm;
