import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LoginForm from 'components/Login/LoginForm';
import colourScheme from 'libs/colourScheme';
import { changeColours, changeHouse, changeYear } from 'actions/login';

import 'styles/main.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.changeHouse = this.changeHouse.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeColours = this.changeColours.bind(this);

    // Generate an initial set of colours.
    this.changeColours();
  }

  changeYear(e) {
    const year = e.value;
    this.props.dispatch(changeYear(year));
  }

  changeHouse(e) {
    const house = e.target.value;
    this.props.dispatch(changeHouse(house));
    this.changeColours();
  }

  changeColours() {
    // Maps each house to it's colour.
    const colourMappings = {
      acton: 'blue',
      baxter: 'orange',
      clive: 'turquoise',
      darwin: 'purple',
      houseman: 'red',
      webb: 'yellow'
    };

    console.log(this.props.user.house);

    console.log(colourScheme(
        'light',
        colourMappings[this.props.user.house]
      ))

    // Generate a new colour scheme and dispatch
    // it to the state tree.
    this.props.dispatch(changeColours(
      colourScheme(
        'light',
        colourMappings[this.props.user.house]
      )
    ));
  }

  render() {
    const houses = ['Acton', 'Baxter', 'Clive', 'Darwin', 'Houseman', 'Webb'];
    const years = [7, 8, 9, 10, 11];

    return (
      <LoginForm changeHouse={this.changeHouse}
                 changeYear={this.changeYear}
                 colours={this.props.colours}
                 houses={houses}
                 years={years} />
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
    colours: state.colours,
    house: state.house,
    user: state.user
  };
}

export default connect(
  mapStateToProps
)(Login);
