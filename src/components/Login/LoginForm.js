import React, { Component, PropTypes } from 'react';
import HouseSelector from './HouseSelector';
import YearSelector from './YearSelector';

class LoginForm extends Component {
  static propTypes = {
    changeHouse: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired,
    houses: PropTypes.array.isRequired,
    years: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const style = { color: this.props.colours.text.primary };

    return (
      <div>
        <h1 style={style}>Priory School House Quiz</h1>
        <form>
          <YearSelector colours={this.props.colours}
                        changeYear={this.props.changeYear}
                        years={this.props.years} />
          <br />
          <HouseSelector colours={this.props.colours}
                         changeHouse={this.props.changeHouse}
                         houses={this.props.houses} />
        </form>
      </div>
    );
  }
}

export default LoginForm;
