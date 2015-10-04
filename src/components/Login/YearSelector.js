import React, { Component, PropTypes } from 'react';
import { Select, Option, Placeholder } from 'belle';

class HouseSelector extends Component {
  static propTypes = {
    changeYear: PropTypes.func.isRequired,
    years: PropTypes.array.isRequired
  }

  render() {
    const labelStyle = { color: this.props.colours.text.secondary };
    const selectStyle = this.props.colours.select;

    return (
      <div>
        <label style={labelStyle}> I'm in year...</label>
        <br />
        <select style={selectStyle} onChange={this.props.changeYear}>
          {this.props.years.map(year =>
            <option key={year} value={year}>{year}</option>
          )}
        </select>
      </div>
    );
  }
}

export default HouseSelector;

