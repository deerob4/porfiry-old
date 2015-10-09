import React, { Component, PropTypes } from 'react';
import capitalise from 'lodash/string/capitalize';

class HouseSelector extends Component {
  static propTypes = {
    changeHouse: PropTypes.func.isRequired,
    houseValidation: PropTypes.string.isRequired,
    houses: PropTypes.array.isRequired
  }

  render() {
    const selectStyle = this.props.colours;

    return (
      <select style={selectStyle}
              className={this.props.houseValidation}
              onChange={this.props.changeHouse}>

        <option value="" disabled selected>I belong to...</option>

        {this.props.houses.map(house =>
          <option key={house} value={house}>{capitalise(house)}</option>
        )}

      </select>
    );
  }
}

export default HouseSelector;

// <Placeholder>And I belong to...</Placeholder>
