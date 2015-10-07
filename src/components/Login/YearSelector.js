import React, { Component, PropTypes } from 'react';

class HouseSelector extends Component {
  static propTypes = {
    changeYear: PropTypes.func.isRequired,
    yearValidation: PropTypes.string.isRequired,
    years: PropTypes.array.isRequired
  }

  render() {
    return (
      <select style={this.props.colours}
              className={this.props.yearValidation}
              onChange={this.props.changeYear}>
        <option value="" disabled selected>And I'm in year...</option>
        {this.props.years.map(year =>
          <option key={year} value={year}>Year {year}</option>
        )}
      </select>
    );
  }
}

export default HouseSelector;

