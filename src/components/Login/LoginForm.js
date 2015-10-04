import React, { Component, PropTypes } from 'react';
import HouseSelector from './HouseSelector';
import YearSelector from './YearSelector';

class LoginForm extends Component {
  static propTypes = {
    changeColours: PropTypes.func.isRequired,
    houses: PropTypes.array.isRequired,
    years: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Priory School House Quiz</h1>
        <form>
          <YearSelector years={this.props.years} />
          <HouseSelector changeColours={this.props.changeColours}
              houses={this.props.houses}
          />
        </form>
      </div>
    );
  }
}

export default LoginForm;
