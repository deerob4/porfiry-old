import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from 'components/Login/LoginForm';
import colourScheme from 'libs/colourScheme';
import { changeColours, changeHouse, changeYear } from 'actions/login';
import sample from 'lodash/collection/sample';

import 'styles/main.css';

const houses = ['acton', 'baxter', 'clive', 'darwin', 'houseman', 'webb'];
const years = [7, 8, 9, 10, 11];

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      houseValidation: '',
      yearValidation: ''
    };

    this.changeHouse = this.changeHouse.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeColours = this.changeColours.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.isQuizReady = this.isQuizReady.bind(this);

    // Generate an initial set of colours.
    this.changeColours(sample(houses));
  }

  changeYear(e) {
    const year = e.target.value;
    this.props.dispatch(changeYear(year));
  }

  changeHouse(e) {
    const house = e.target.value;
    this.props.dispatch(changeHouse(house));
    this.changeColours(house);
  }

  changeColours(house) {
    const colourMappings = {
      acton: 'blue',
      baxter: 'orange',
      clive: 'green',
      darwin: 'purple',
      houseman: 'red',
      webb: 'yellow'
    };

    // Generate a new colour scheme and dispatch
    // it to the state tree.
    this.props.dispatch(changeColours(
      colourScheme('light', colourMappings[house])
    ));
  }

  validateLogin() {
    if (!this.props.user.house) {
      // Set the animation class to pass to component.
      this.setState({ houseValidation: 'animated shake' });
      // Remove the class so the animation can be replayed.
      setTimeout(() => this.setState({ houseValidation: '' }), 850);
    }

    if (!this.props.user.year) {
      // Set the animation class to pass to component.
      this.setState({ yearValidation: 'animated shake'});
      // Remove the class so the animation can be replayed.
      setTimeout(() => this.setState({ yearValidation: '' }), 850);
    }

    if (this.props.user.year && this.props.user.house) {
      // Transition to the quiz create section
      this.props.history.pushState('create', '/create');
    }
  }

  isQuizReady() {
    return false;
  }

  render() {
    const style = {
      height: window.innerHeight + 'px',
      width: '100%',
      backgroundColor: this.props.colours.button.backgroundColor
    };



    return (
      <div style={style}>
        <div className="container">
          <LoginForm changeHouse={this.changeHouse}
                     changeYear={this.changeYear}
                     validateLogin={this.validateLogin}
                     houseValidation={this.state.houseValidation}
                     yearValidation={this.state.yearValidation}
                     colours={this.props.colours}
                     validationClass={this.state.validationClass}
                     loadCreator={this.loadCreator}
                     isQuizReady={this.isQuizReady}
                     houses={houses}
                     years={years} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    colours: state.colours,
    user: state.user
  };
}

export default connect(
  mapStateToProps
)(LoginContainer);
