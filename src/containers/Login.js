import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LoginForm from 'components/Login/LoginForm';
import colourScheme from 'libs/colourScheme';
import { changeColours, changeHouse, changeYear } from 'actions/login';
import sample from 'lodash/collection/sample';

import 'styles/main.css';

const houses = ['acton', 'baxter', 'clive', 'darwin', 'houseman', 'webb'];

class Login extends Component {
  constructor(props) {
    super(props);

    this.changeHouse = this.changeHouse.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeColours = this.changeColours.bind(this);
    this.isQuizReady = this.isQuizReady.bind(this);

    // Choose a random house and generate
    // an initial set of colours.
    let house = sample(houses);
    this.props.dispatch(changeHouse(house));
    this.changeColours(house);
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
    // Maps each house to it's colour.
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
      colourScheme(
        'light',
        colourMappings[house]
      )
    ));
  }

  isQuizReady() {
    return false;
  }

  render() {
    const years = [7, 8, 9, 10, 11];

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
                     colours={this.props.colours}
                     isQuizReady={this.isQuizReady}
                     houses={houses}
                     years={years}
          />
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
)(Login);
