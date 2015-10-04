import React, { Component, PropTypes } from 'react';
import { Select, Option, Placeholder } from 'belle';

class HouseSelector extends Component {
  static propTypes = {
    changeHouse: PropTypes.func.isRequired,
    houses: PropTypes.array.isRequired
  }

  render() {
    const labelStyle = { color: this.props.colours.text.secondary };
    const selectStyle = this.props.colours.select;

    return (
      <div>
        <label style={labelStyle}>And I belong to...</label>
        <br />
        <select style={selectStyle} onChange={this.props.changeHouse}>
          {this.props.houses.map(house =>
            <option key={house} value={house.toLowerCase()}>{house}</option>
          )}
        </select>
      </div>
    );
  }
}

export default HouseSelector;

// <Placeholder>And I belong to...</Placeholder>
