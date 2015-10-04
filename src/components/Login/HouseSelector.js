import React, { Component, PropTypes } from 'react';
import { Select, Option, Placeholder } from 'belle';

class HouseSelector extends Component {
  static propTypes = {
    changeColours: PropTypes.func.isRequired,
    houses: PropTypes.array.isRequired
  }

  render() {
    return (
      <Select onUpdate={this.props.changeColours}>
        <Placeholder>And I belong to...</Placeholder>
        {this.props.houses.map(house =>
          <Option key={house} value={house.toLowerCase()}>{house}</Option>
        )}
      </Select>
    );
  }
}

export default HouseSelector;

